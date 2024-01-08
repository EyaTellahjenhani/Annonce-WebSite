import React, { useEffect, useState } from "react";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import Request from "./Request";
import moment from "moment";
import { listRequests } from "../../Redux/Actions/RequestActions";

const RequestMain = () => {
  const requestList = useSelector((state) => state.requestList);
  const { loading, error, requests } = requestList;
  const dispatch = useDispatch();


  //Pagination 
  const [pageNumber, setPageNumber] = useState(0);
  const [RequestPerPage, setRequestPerPage] = useState(10);

  const pagesVisited = pageNumber * RequestPerPage;


    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };
    useEffect(() => {
      dispatch(listRequests())

    }, [ dispatch]);
  
//


const [filteredData, setFilteredData] = useState([]);
const [wordEntered, setWordEntered] = useState("");




const handleFilter = (event) => {
  const searchWord = event.target.value;
  setWordEntered(searchWord);
  const newFilter = requests.filter((value) => {
    console.log(value)
    return  value.FirstName.toLowerCase().includes(searchWord.toLowerCase()) ||
            value.LastName.toLowerCase().includes(searchWord.toLowerCase()) || 
            moment(value.DatePosted).format('DD/MM/YYYYY').toLowerCase().includes(searchWord.toLowerCase()) || 
            value.Statu.toLowerCase().includes(searchWord.toLowerCase())

          });



  if (searchWord === "") {
    setFilteredData([]);
  } else {
    setFilteredData(newFilter);
  }
};


  return (
    <section className="content-main">
      <div className="content-header">
 
    <h2 className="content-title">Liste des annonces</h2>
   
  </div>

      <div className="card mb-4 shadow-sm">
        <header className="card-header bg-white">
          <div className="row gx-3 py-3">
            <div className="col-lg-4 col-md-6 me-auto">
              <input
              onChange={handleFilter}
                type="text"
                placeholder="Recherche..."
                className="form-control p-2"
              />
            </div>
            <div className="col-lg-2 col-6 col-md-3">
            <select onChange={(e) => setRequestPerPage(e.target.value)} className="form-select">
                <option value={10}>Afficher 10</option>
                <option value={20}>Afficher 20</option>
                <option value={30}>Afficher 30</option>
                <option value={requests?.length}>Afficher tout</option>
              </select>
            </div>
            <div className="col-lg-2 col-6 col-md-3">
            <select onChange={handleFilter} className="form-select">
                <option value={""}>Tout</option>
                <option value={"En attend"}>En Attent</option>
                <option value={"Refused"}>Refusée</option>
                <option value={"Accepted"}>Acceptée</option>
              </select>
            </div>
          </div>
        </header>
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <Loading />
            ) : error ? (
              <Message variant="alert-danger">{error}</Message>
            ) : (
              <table className="table">
              <thead>
                <tr>
                  <th scope="col">Date de l'annonce</th>
                  <th scope="col">Annonceur</th>
                  <th scope="col">Title</th>
                  <th>Statut</th>
                  <th scope="col" className="text-end">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
              {wordEntered ==="" ? (<> {requests.slice(pagesVisited, pagesVisited + RequestPerPage).map((r) => (
              <Request request={r} />
              ))}</>): (<> {filteredData.slice(pagesVisited, pagesVisited + RequestPerPage).map((r) => (
                <Request request={r} />
                ))}</>)}
              </tbody>
    </table>
            
            )}
          </div>
        </div>
        <nav className="float-end mt-4" aria-label="Page navigation">
          <div className="float-end mt-4" aria-label="Page navigation">
<ReactPaginate
        previousLabel={"Précédent"}
        nextLabel={"Suivant"}
        pageCount={Math.ceil(requests?.length / RequestPerPage)}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      /> 
    </div>
          </nav>
      </div>
    </section>
  );
};

export default RequestMain;
