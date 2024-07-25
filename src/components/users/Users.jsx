import React from "react";
import "./Users.css";
import { Link } from "react-router-dom";
const Users = () => {
  return (
    <div>
      {" "}
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/users/me">Me</Link>
          </li>
          <li>
            <Link to="/users/all-users">All Users</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Users;
