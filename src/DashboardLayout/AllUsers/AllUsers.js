import { useQuery } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";

const AllUsers = () => {
  const { data: users = [],refetch} = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("https://doctors-lab-server.vercel.app/users");
      const data = res.json();
      return data;
    },
  });
const handleDelete =(user)=>{
  console.log(user);
  fetch(`https://doctors-lab-server.vercel.app/users/${user._id}`,{
    method:'DELETE',
    headers:{
      authorization: `bearer ${localStorage.getItem('accessToken')}`
    }
  })
  .then(res => res.json())
  .then(data =>{
    refetch()
    console.log(data);
  })

}
  const handleMakeAdmin = (id) => {
    fetch(`https://doctors-lab-server.vercel.app/users/admin/${id}`, {
      method: "PUT",
      headers:{
        authorization: `bearer ${localStorage.getItem('accessToken')}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
          refetch()
        }
      });
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Favorite Color</th>
              <th>Favorite Color</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr key={user._id}>
                <th>{i + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
               {!user.role &&   <button
                    onClick={() => {
                      handleMakeAdmin(user._id);
                    }}
                    className="btn btn-xs btn-primary"
                  >
                    Make Admin
                  </button>}
                </td>
                <td>
                  <button onClick={()=>handleDelete(user)} className="btn btn-xs btn-warning">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
