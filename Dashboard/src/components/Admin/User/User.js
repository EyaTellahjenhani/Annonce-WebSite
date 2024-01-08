import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser, listUser } from "../../../Redux/Actions/AdminAction";
import Logo from "../../../images/user.png";

import moment from "moment";
import { Link } from "react-router-dom";

const User = ({ user }) => {
  const dispatch = useDispatch();

  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
      dispatch(deleteUser(id));
      dispatch(listUser());
    }
  };

  return (
    <>
      <tr>
        <td></td>
        <td>
          <a href="#">
            <img src={user.avatar || Logo} className="avatar" alt="Avatar" />{" "}
            {user.FirstName} {user.LastName}
          </a>
        </td>
        <td>{moment(user.RegistrationDate).format("DD/MM/YYYY")}</td>
        <td>{user.IsAdmin ? <>Admin</> : <>Utilisateur</>}</td>

        <td className="d-flex">
          <Link
            to="#"
            onClick={() => deletehandler(user.UserID)}
            className=""
            title=""
            data-toggle="tooltip"
            data-original-title=""
          >
        <i class="fa fa-trash" aria-hidden="true"></i>
          </Link>
        </td>
      </tr>
    </>
  );
};

export default User;
