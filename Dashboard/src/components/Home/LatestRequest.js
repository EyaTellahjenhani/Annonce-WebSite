import React from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import moment from "moment";

const LatestRequest = (props) => {
  const { loading, error, requests } = props;


  const newFilter = requests?.filter((value) => {
    return value.Statu==="En attend"
  });

console.log(newFilter)




  return (
    <div className="card-body">
      <h4 className="card-title" style={{color:"#15446D", marginBottom:"30px"}}>Nouvelles Demande:</h4>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="table-responsive">
          <table className="table">
            <tbody>
              {newFilter.slice(0,5).map((request) => (
                <tr key={request.ListingID }>
                  <td>
                   <b style={{color:"#15446D"}}>{request.FirstName} {" "}{request.LastName}</b>
                  </td>
                  <td>{request.Email}</td>
                  <td>{moment(request.DatePosted).format("DD/MM/YYYY")}</td>
                  <td>
              {request.Statu ==="Accepted" ? (
                <span className="badge btn-success">Accepté</span>
              ) : request.Statu ==="Refused" ? (
                <span className="badge btn-danger">Refusé </span>
              ):  <span className="badge btn-warning">Attente </span>
            }
            </td>
                  <td>{request.CategoryName}</td>
                  <td className="d-flex justify-content-end align-item-center">
                  <a href={`http://localhost:3000/Listing/${request.ListingID}`} className="text-success">
                      <i className="fas fa-eye" style={{color:"#15446D"}}></i>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LatestRequest;
