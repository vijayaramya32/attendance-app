import { useEffect, useState } from "react";
import API from "../../api/axios";

const AllEmployees = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    API.get("/attendance/all").then((res) => setRecords(res.data));
  }, []);

  return (
    <div>
      <h2>All Employees Attendance</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Check-in</th>
            <th>Check-out</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id}>
              <td>{r.user.name}</td>
              <td>{r.date}</td>
              <td>{r.status}</td>
              <td>{r.checkInTime}</td>
              <td>{r.checkOutTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllEmployees;
