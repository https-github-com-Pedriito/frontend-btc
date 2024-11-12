import { useState, useEffect } from "react";
import PropTypes from 'prop-types';

const ScheduleSelect = ({ value, onChange }) => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 60000); // Mise à jour toutes les minutes
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setAvailableTimeSlots(generateTimeSlots(currentDateTime));
  }, [currentDateTime]);

  const generateTimeSlots = (currentDateTime) => {
    const slots = [];
    const today = currentDateTime.getDay();

    if (today !== 1) { // Fermé le lundi
      const currentTime = currentDateTime.getTime();

      let startLunch = new Date(currentDateTime);
      startLunch.setHours(12, 0, 0, 0);
      const endLunch = new Date(currentDateTime);
      endLunch.setHours(14, 30, 0, 0);

      while (startLunch <= endLunch) {
        if (startLunch.getTime() > currentTime) {
          slots.push(startLunch.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        }
        startLunch.setMinutes(startLunch.getMinutes() + 30);
      }

      let startDinner = new Date(currentDateTime);
      startDinner.setHours(19, 0, 0, 0);
      const endDinner = new Date(currentDateTime);
      endDinner.setHours(22, 30, 0, 0);

      while (startDinner <= endDinner) {
        if (startDinner.getTime() > currentTime) {
          slots.push(startDinner.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
        }
        startDinner.setMinutes(startDinner.getMinutes() + 30);
      }
    }
    return slots;
  };

  const handleChange = (event) => {
    const selectedSlot = event.target.value;
    const currentDate = currentDateTime.toLocaleDateString('fr-FR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, ''); // Format JJMMAA
    onChange(`${currentDate} ${selectedSlot}`); // Combine date and time
  };

  return (
    <div>
      <label className="block font-semibold text-gray-700">Créneau horaire :</label>
      <select
        name="timeSlot"
        value={value}
        onChange={handleChange}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600"
        disabled={!availableTimeSlots.length}
      >
        <option value="" disabled>
          {availableTimeSlots.length > 0 ? "Sélectionnez un créneau" : "Aucun créneau disponible"}
        </option>
        {availableTimeSlots.map((slot) => (
          <option key={slot} value={slot}>
            {slot}
          </option>
        ))}
      </select>
    </div>
  );
};

ScheduleSelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ScheduleSelect;