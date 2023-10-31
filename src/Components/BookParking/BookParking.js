import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookParking = () => {
  const { id } = useParams();
  const [parkingData, setParkingData] = useState();
  const [hour, setHour] = useState(false);
  const [fromHour, setFromHour] = useState();
  const [toHour, setToHour] = useState();
  const [hourDifference, setHourDifference] = useState();
  const [day, setDay] = useState(false);
  const [minute, setMinute] = useState(false);
  const [error, setError] = useState(false);
  //   const [date, setDate] = useState(new Date());
  var date = new Date();
  //"Thu Jun 10 2021 18:46:00 GMT+0200 (Eastern European Standard Time)"
  const regexDate = date.toString().split(/\+|-/)[0]; // .split(/\+|-/) is a regex for matching + or -
  //"Thu Jun 10 2021 18:46:00 GMT"
  const dateString = new Date(regexDate).toISOString().split("T")[0];

  //date-ends

  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("00:00");
  const minHour = new Date().toTimeString();
  // Calculate the current time and update it every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleTimeChange = (e) => {
    const inputTime = e.target.value;
    setSelectedTime(inputTime);
  };

  // Get the current hour and minute
  const currentHour = currentTime.getHours();
  const currentMinute = currentTime.getMinutes();

  // Calculate the current time as a string
  const currentHourStr = currentHour < 10 ? `0${currentHour}` : currentHour;
  const currentMinuteStr =
    currentMinute < 10 ? `0${currentMinute}` : currentMinute;
  const currentTimeStr = `${currentHourStr}:${currentMinuteStr}`;

  useEffect(() => {
    const fetchSingleParkingDetails = async () => {
      await axios
        .get(`/api/v1/parking/view-parking/${id}`)
        .then((data) => setParkingData(data.data));
    };
    fetchSingleParkingDetails();
  }, [id]);
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
  const handleBooking = async (ev) => {
    ev.preventDefault();

    console.log(fromHour, toHour);
    if (fromHour && toHour) {
      console.log(fromHour, toHour);
      const fromTimeArray = fromHour.split(":");
      const toTimeArray = toHour.split(":");
      console.log(fromTimeArray, toTimeArray);
      const fromHourInt = parseInt(fromTimeArray[0]);
      const toHourInt = parseInt(toTimeArray[0]);
      const fromMinuteInt = parseInt(fromTimeArray[1]);
      const toMinuteInt = parseInt(toTimeArray[1]);
      if (fromMinuteInt === toMinuteInt) {
        let difference;
        if (fromHourInt > toHourInt) {
          difference = 24 - (fromHourInt - toHourInt);
          console.log(difference);
          if (difference <= 0) {
            setError("Must be 1 hour longer");
          }
          if (!isNaN(difference) && difference > 0) {
            const body = {
              bookingDate: dateString,
              fromHourInt: fromHourInt,
              toHourInt: toHourInt,
              parkingId: id,
              fromMinuteInt: fromMinuteInt,
              toMinuteInt: toMinuteInt,
              difference: difference,
            };
            await axios
              .post("/api/v1/booking/", body)
              .then((data) => console.log(data))
              .then(setError("Submitted"));
          }
        } else if (toHourInt > fromHourInt) {
          difference = toHourInt - fromHourInt;
          console.log(difference);
          if (difference <= 0) {
            setError("Must be 1 hour longer");
          }
          if (!isNaN(difference) && difference > 0) {
            const body = {
              bookingDate: dateString,
              parkingId: id,
              fromHourInt: fromHourInt,
              toHourInt: toHourInt,
              fromMinuteInt: fromMinuteInt,
              toMinuteInt: toMinuteInt,
              difference: difference,
            };
            await axios
              .post("/api/v1/booking/", body)
              .then((data) => console.log(data))
              .then(setError("Submitted"));
          }
        }
      } else {
        setError(
          "Minutes will be same for both from and to and hours will be longer than 1 hour"
        );
      }
    } else if (!fromHour || !toHour) {
      setError("Select both from and to time");
    }
  };
  console.log(fromHour);
  return (
    <div>
      <div className="parking-time">
        Select Your Parking Options:
        {parkingData?.duration.map((parking) => (
          <button
            className="bg-blue-500 px-2 my-2 mx-2"
            onClick={() => handleParkingTime(parking)}
          >
            {parking}
          </button>
        ))}
        {hour && (
          <div className="hour-time">
            <form onSubmit={handleBooking}>
              <span>From:</span>
              <input
                onChange={(ev) => {
                  setFromHour(ev.target.value);
                }}
                type="time"
                
              />
              <span>To:</span>
              <input
                onChange={(ev) => setToHour(ev.target.value)}
                type="time"
              />
              {error && <p>{error}</p>}
              <button className="bg-blue-500 px-2">Proceed</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookParking;
