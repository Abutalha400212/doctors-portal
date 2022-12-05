import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../AuthContext/AuthProvider";

const MyAppointment = () => {
  const { user } = useContext(AuthContext);
  const url = `https://doctors-lab-server.vercel.app/bookings?email=${user?.email}`
  const { data: bookings =[] , isLoading} = useQuery({
    queryKey: ["bookings", user?.email],
    queryFn: async () => {
      const res = await fetch(url
        ,
        {
          headers: {
            authorization:`bearer ${localStorage.getItem("accessToken")}`,
          }
        }
      );
      const data = await res.json();
      return data;
    },
  });

  if(isLoading){
    return <progress className="progress w-56"></progress>
  }
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Treatment</th>
            <th>Time</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
         { bookings.map((book, i) => (
            <tr key={book._id}>
              <td>{i + 1}</td>
              <td>{book.name}</td>
              <td>{book.email}</td>
              <td>{book.treatment}</td>
              <td>{book.slot}</td>
              <td>{
                book.price && !book.paid && <Link to={`/dashboard/payment/${book._id}`}><button className="btn btn-sm btn-primary">Pay</button></Link>
                }
{
                book.price && book.paid && <span className="text-primary">Paid</span>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyAppointment;
