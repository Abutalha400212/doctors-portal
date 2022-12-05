import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import DeleteModal from "../../Shared/DeleteModal/DeleteModal";
const MannageDoctor = () => {
  const [deleteAction, setDeleteAction] = useState(null);
  const { data: doctors = [], refetch } = useQuery({
    queryKey: ["doctors"],
    queryFn: async () => {
      const res = await fetch("https://doctors-lab-server.vercel.app/doctors",{
        headers:{
          authorization: `bearer ${localStorage.getItem('accessToken')}`
        }
      });
      const data = await res.json();
      return data;
    },
  });
  const handleCancelModal = () => {
    setDeleteAction(null);
  };

  const handleSuccessDeleteAction = (doctor) => {
    fetch(`https://doctors-lab-server.vercel.app/doctors/${doctor._id}`, {
      method: "DELETE",
      headers:{
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setDeleteAction(null);
        refetch();
      });
  };
  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th></th>
            <th>Image</th>
            <th>Doctor Name</th>
            <th>Email</th>
            <th>Specialty</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor, i) => (
            <tr key={doctor._id}>
              <th>{i + 1}</th>
              <th>
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src={doctor.photo} alt="" />
                  </div>
                </div>
              </th>
              <td>{doctor.doctor}</td>
              <td>{doctor.email}</td>
              <td>{doctor.specialty}</td>
              <td>
                <label
                  onClick={() => setDeleteAction(doctor)}
                  htmlFor="doctors-modal"
                  className="btn btn-error btn-sm"
                >
                  Delete
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {deleteAction && (
        <DeleteModal
          deleteAction={deleteAction}
          handleSuccessDeleteAction={handleSuccessDeleteAction}
          handleCancelModal={handleCancelModal}
        />
      )}
    </div>
  );
};

export default MannageDoctor;
