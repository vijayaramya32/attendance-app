import { useDispatch } from "react-redux";
import { checkIn, checkOut } from "../../features/attendanceSlice";

const MarkAttendance = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Mark Attendance</h2>
      <button onClick={() => dispatch(checkIn())}>Check In</button>
      <button onClick={() => dispatch(checkOut())}>Check Out</button>
    </div>
  );
};

export default MarkAttendance;
