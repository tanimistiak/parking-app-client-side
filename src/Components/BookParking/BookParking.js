import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { UserLoginRegisterContext } from "../Context/UserLoginRegisterContext";

function BookParking() {
  const { id } = useParams();
  const { email } = useContext(UserLoginRegisterContext);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidDifference =
      moment(endTime).diff(moment(startTime), "minutes") % 60 === 0;

    if (!isValidDifference) {
      console.error("Please select whole hours for both start and end times.");
      return;
    }
    try {
      console.log(startTime, endTime);
      const response = await axios.post("api/v1/booking", {
        parkingId: id,
        startTime: startTime,
        endTime: endTime,
        email: email,
        method: "hour",
      });

      console.log(response.data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
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
      console.log(response);
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
    } catch (error) {
      console.error("Error:", error.message);
    }
    // Add your logic to handle the form submission, such as making an API request
  };
  return (
    <div className="App">
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
        <form onSubmit={handleSubmit}>
          <label htmlFor="startTime">Start Time:</label>
          <input
            type="datetime-local"
            id="startTime"
            value={startTime}
            onChange={handleStartTimeChange}
            min={minStartTime}
            max={maxStartTime}
            required
          />

          <label htmlFor="endTime">End Time:</label>
          <input
            type="datetime-local"
            id="endTime"
            value={endTime}
            onChange={handleEndTimeChange}
            min={minEndTime}
            max={maxStartTime}
            required
          />

          <button type="submit">Book Parking</button>
        </form>
      )}
      {/* minute */}
      {minute && (
        <form onSubmit={handleMinuteSubmit}>
          <label htmlFor="duration">Select Duration (minutes):</label>
          <input
            type="number"
            id="duration"
            value={durationMinutes}
            onChange={handleDurationChange}
            min="1"
            max="59"
            required
          />

          <button type="submit">Book Time Slot</button>
        </form>
      )}
      {day && (
        <div>
          <h1>Date Booking</h1>
          <form onSubmit={handleDaySubmit}>
            <label htmlFor="selectedDate">Select Date:</label>
            <input
              type="date"
              id="selectedDate"
              name="selectedDate"
              onChange={handleInputChange}
              min={new Date().toISOString().split("T")[0]} // Disable previous dates
              required
            />
            <button type="submit">Book Date</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default BookParking;
