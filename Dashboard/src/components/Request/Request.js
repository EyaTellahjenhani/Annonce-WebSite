import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  AcceptRequest,
  deleteRequest,
  listRequests,
} from "../../Redux/Actions/RequestActions";
import Toast from "../LoadingError/Toast";

const Request = (props) => {
  const { request } = props;

  const [open, setOpen] = useState(false);

  const requestDeliver = useSelector((state) => state.requestDeliver);
  const { loading, success, error } = requestDeliver;

  const requestDelete = useSelector((state) => state.requestDelete);
  const { loading: dLoading, success: dsuccess, error: derror } = requestDelete;

  const dispatch = useDispatch();

  const Accepthandler = (id) => {
    if (window.confirm("Êtes-vous sûr ?")) {
      dispatch(AcceptRequest(id));
    }
  };

  const deletehandler = (id) => {
    console.log(id);
    if (window.confirm("Êtes-vous sûr ?")) {
      dispatch(deleteRequest(id));
    }
  };

  useEffect(() => {
    if (success) {
      setOpen(false);
      dispatch({ type: "REQUEST_DELIVERED_RESET" });
      dispatch(listRequests());
    }
  }, [dsuccess, success, dispatch]);

  return (
    <>
      <Toast />

      <tr key={request.ListingID}>
        <td>
          <b style={{ color: "#15446D" }}>
            {moment(request.DatePosted).format("DD/MM/YYYY")}
          </b>
        </td>
        <td>
          {request.FirstName} {request.LastName}
        </td>
        <td>{request.Title}</td>
        <td>
          {request.Statu === "Accepted" ? (
            <span className="badge btn-success">Accepté</span>
          ) : request.Statu === "Refused" ? (
            <span className="badge btn-danger">Refusé </span>
          ) : (
            <span className="badge btn-warning">En attent</span>
          )}
        </td>

        <td className="d-flex flex p-2 justify-content-between align-item-center">
          <Link to="#">
            {" "}
            <i
              className="fa fa-times"
              style={{ color: "#DC3545" }}
              onClick={() => deletehandler(request.ListingID)}
            ></i>
          </Link>

          <Link>
            {" "}
            <i
              className="fa fa-check"
              style={{ color: "#198754" }}
              onClick={() => Accepthandler(request.ListingID)}
            ></i>
          </Link>

          <a href={`http://localhost:3000/Listing/${request.ListingID}`}>
            {" "}
            <i className="fas fa-eye" style={{ color: "#15446D" }}></i>
          </a>
        </td>
      </tr>
    </>
  );
};

export default Request;
