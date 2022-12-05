import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { useState } from "react";
import BookingAppointMent from "../BookingAppointment/BookingAppointMent";
import AppointmentOptions from "./AppointmentOptions";
const AvailableAppointment = ({ selectedDate }) => {
  const [treatment, setTreatment] = useState(null);
  const { data: appointmentOptions = [],refetch } = useQuery({
    queryKey: ["appointmentOptions"],
    queryFn: async () => {
      const res = await fetch(`https://doctors-lab-server.vercel.app/appointmentOptions?date=${format(selectedDate,'PP')}`);
      const data = await res.json();
      return data;
    },
  });
// IF you want to use date , you selected date with format function// 
  return (
    <div>
      <h4 className="text-xl text-secondary font-bold text-center">
        Available Appointments on {format(selectedDate, "PP")}
      </h4>
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-3 my-32">
        {appointmentOptions.map((options) => (
          <AppointmentOptions
            key={options._id}
            options={options}
            setTreatment={setTreatment}
          />
        ))}
      </div>
      {treatment && (
        <BookingAppointMent treatment={treatment} refetch={refetch} setTreatment={setTreatment} selectedDate={selectedDate} />
      )}
    </div>
  );
};

export default AvailableAppointment;
