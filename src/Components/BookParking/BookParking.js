import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import "./BookParking.css";
import { useParams } from "react-router-dom";

import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.config";
import { ToastContainer, toast } from "react-toastify";

function BookParking() {
  const { id } = useParams();
  const [user] = useAuthState(auth);
  const { email } = user;
  // console.log(email);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [minStartTime, setMinStartTime] = useState("");
  const [minEndTime, setMinEndTime] = useState("");
  const [maxStartTime, setMaxStartTime] = useState("");
  const [maxEndTime, setMaxEndTime] = useState("");
  const [parkingData, setParkingData] = useState("");

  useEffect(() => {
    const now = moment().startOf("hour").format("YYYY-MM-DDTHH:mm");
    setMinStartTime(now);
    setMinEndTime(now);
    // Set max date to 23 hours from now
    const maxDate = moment().endOf("day").format("YYYY-MM-DDTHH:mm");
    setMaxStartTime(maxDate);
    setMaxEndTime(maxDate);
  }, []);
  useEffect(() => {
    const fetchSingleParkingDetails = async () => {
      await axios
        .get(`/api/v1/parking/view-parking/${id}`)
        .then((data) => setParkingData(data.data));
    };
    fetchSingleParkingDetails();
  }, [id]);
  useEffect(() => {
    const fetchBookingDetails = async () => {
      await axios.get(`/api/v1/booking`).then((data) => console.log(data.data));
    };
    fetchBookingDetails();
  }, []);
  const handleStartTimeChange = (e) => {
    const selectedStartTime = e.target.value;

    // Ensure the selected start time is not in the past
    if (selectedStartTime < minStartTime) {
      setStartTime(minStartTime);
    } else {
      setStartTime(selectedStartTime);
    }

    // Update the min and max attributes for end time
    const minEnd = moment(selectedStartTime)
      .add(1, "hour")
      .format("YYYY-MM-DDTHH:mm");
    const maxEnd = moment(selectedStartTime)
      .add(23, "hours")
      .format("YYYY-MM-DDTHH:mm");

    setMinEndTime(minEnd);
    setMaxEndTime(maxEnd);

    // Ensure end time is at least 1 hour more than start time
    if (endTime < minEnd) {
      setEndTime(minEnd);
    } else if (endTime > maxEnd) {
      setEndTime(maxEnd);
    }
  };
  const slots = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const handleEndTimeChange = (e) => {
    const selectedEndTime = e.target.value;

    // Ensure the selected end time is not in the past and is at least 1 hour more than start time
    if (selectedEndTime < minEndTime || selectedEndTime < startTime) {
      setEndTime(minEndTime);
    } else if (selectedEndTime > maxEndTime) {
      setEndTime(maxEndTime);
    } else if (selectedEndTime > startTime) {
      setEndTime(selectedEndTime);
    }
  };
  const [bookingSlotStatus, setBookingSlotStatus] = useState([]);
  const [selectSlot, setSelectSlot] = useState(false);
  const [slotName, setSlotName] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSlotName(null);
    const isValidDifference =
      moment(endTime).diff(moment(startTime), "minutes") % 60 === 0;

    if (!isValidDifference) {
      console.error("Please select whole hours for both start and end times.");
      toast("select whole hour");
      return;
    }
    try {
      await axios
        .post("api/v1/booking", {
          parkingId: id,
          startTime: startTime,
          endTime: endTime,
          email: email,
          method: "hour",
          slotName: 4,
        })
        .then((data) => {
          setBookingSlotStatus(data.data);
        })
        .catch((err) => console.log(err));
      setSelectSlot(true);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  console.log(bookingSlotStatus);
  const [hour, setHour] = useState(false);
  const [day, setDay] = useState(false);
  const [minute, setMinute] = useState(false);
  const handleParkingTime = (parking) => {
    console.log(parking);
    if (parking === "hours") {
      setHour(true);
      setMinute(false);
      setDay(false);
    }
    if (parking === "days") {
      setDay(true);
      setMinute(false);
      setHour(false);
    }
    if (parking === "minutes") {
      setMinute(true);
      setHour(false);
      setDay(false);
    }
  };
  const [durationMinutes, setDurationMinutes] = useState(1);

  const handleDurationChange = (e) => {
    setDurationMinutes(Number(e.target.value));
  };

  const handleMinuteSubmit = async (e) => {
    e.preventDefault();

    // Your logic to check for overlapping bookings and make the API call
    // (using axios to send a POST request to your Express server)

    try {
      const response = await axios.post("api/v1/booking", {
        parkingId: id,
        durationMinutes: durationMinutes,
        email: email,
        method: "minute",
      });
      if (response.data.message) {
        toast(`booking done`);
      }
      if (response.data.error) {
        toast(`booking already exists by someone`);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  const [formData, setFormData] = useState();

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setFormData({
      parkingId: id,
      email: email,
      method: "day",
      date: e.target.value,
    });
  };

  const handleDaySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("api/v1/booking", formData);
      console.log(response);
      if (response.data.message) {
        toast(`booking done`);
      }
      if (response.data.error) {
        toast(`booking already exists by someone`);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
    // Add your logic to handle the form submission, such as making an API request
  };
  const handleBooking = async () => {
    await axios
      .post("api/v1/booking/create-booking", {
        parkingId: id,
        startTime: startTime,
        endTime: endTime,
        email: email,
        method: "hour",
        slotName: slotName,
      })
      .then(async (data) => {
        if (data.data?.message) {
          setSlotName(null);

          await axios
            .post("api/v1/booking", {
              parkingId: id,
              startTime: startTime,
              endTime: endTime,
              email: email,
              method: "hour",
              slotName: 4,
            })
            .then((data) => {
              setBookingSlotStatus(data.data);
            })
            .catch((err) => console.log(err));
          toast(data.data?.message);
        }
        if (data.data?.error) {
          toast(data.data?.error);
        }
      });
  };
  return (
    <div>
      <h1>Parking System</h1>
      {parkingData?.duration?.map((parking) => (
        <button
          className="bg-blue-500 px-2 my-2 mx-2"
          onClick={() => handleParkingTime(parking)}
        >
          {parking}
        </button>
      ))}
      {hour && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Parking Details</h2>

          <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
            <div className="col-span-1">
              <label
                htmlFor="startTime"
                className="block text-gray-700 font-bold mb-2"
              >
                Start Time:
              </label>
              <input
                type="datetime-local"
                id="startTime"
                value={startTime}
                onChange={handleStartTimeChange}
                min={minStartTime}
                max={maxStartTime}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="endTime"
                className="block text-gray-700 font-bold mb-2"
              >
                End Time:
              </label>
              <input
                type="datetime-local"
                id="endTime"
                value={endTime}
                onChange={handleEndTimeChange}
                min={minEndTime}
                max={maxStartTime}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />

              <button
                className="bg-blue-500 text-white px-4 py-2 rounded font-bold mt-4 hover:bg-blue-700"
                type="submit"
              >
                Check availablity
              </button>
            </div>
          </form>
        </div>
      )}
      {/* minute */}
      {minute && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Parking Details</h2>
          <form
            className="grid grid-cols-2 gap-4"
            onSubmit={handleMinuteSubmit}
          >
            <div className="col-span-1">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="duration"
              >
                Select Duration (minutes):
              </label>
              <input
                type="number"
                id="duration"
                value={durationMinutes}
                onChange={handleDurationChange}
                min="1"
                max="59"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded font-bold mt-4 hover:bg-blue-700"
              type="submit"
            >
              Book Time Slot
            </button>
          </form>
        </div>
      )}
      {day && (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Parking Details</h2>
          <h1>Date Booking</h1>
          <form className="grid grid-cols-2 gap-4" onSubmit={handleDaySubmit}>
            <div className="col-span-1">
              <label
                className="block text-gray-700 font-bold mb-2"
                htmlFor="selectedDate"
              >
                Select Date:
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="date"
                id="selectedDate"
                name="selectedDate"
                onChange={handleInputChange}
                min={new Date().toISOString().split("T")[0]} // Disable previous dates
                required
              />
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded font-bold mt-4 hover:bg-blue-700"
                type="submit"
              >
                Book Date
              </button>
            </div>
          </form>
        </div>
      )}
      {selectSlot && (
        <div className="grid grid-cols-2 my-5 gap-5">
          {slots?.map((slot) => {
            const isBooked = bookingSlotStatus.some(
              (obj) => obj.slotName == slot
            );
            return (
              <div
                onClick={() => {
                  if (!isBooked) {
                    setSlotName(slot);
                  }
                }}
                className={`${
                  isBooked ? "bg-red-600" : "bg-green-600"
                } p-5 text-center slot-selection ${
                  !isBooked && "hover:cursor-pointer"
                } ${slotName == slot && "bg-yellow-600"}`}
              >
                Slot {slot}
              </div>
            );
          })}
        </div>
      )}
      {slotName && (
        <div
          onClick={handleBooking}
          className="text-center p-5 bg-blue-600  hover:cursor-pointer"
        >
          Book Now
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default BookParking;
