import React, { useEffect, useState } from "react";
import "./User.scss";
import Loading from "../../LoadingError/Loading";
import moment from "moment";
import ReactPaginate from "react-paginate";
import { createUser, listUser } from "../../../Redux/Actions/AdminAction";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../LoadingError/Error";
import User from "./User";

const ListUser = () => {
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  //Filter

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    console.log(users);
    const newFilter = users.filter((value) => {
      console.log(value);
      return (
        value.FirstName.toLowerCase().includes(searchWord.toLowerCase()) ||
        value.LastName.toLowerCase().includes(searchWord.toLowerCase()) ||
        moment(value.RegistrationDate)
          .format("DD/MM/YYYYY")
          .toLowerCase()
          .includes(searchWord.toLowerCase())
      );
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  //pagination
  const [pageNumber, setPageNumber] = useState(0);
  const [RequestPerPage, setRequestPerPage] = useState(10);

  const pagesVisited = pageNumber * RequestPerPage;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <section className="content-main user">
          <div className="content-header">
            <h2 className="content-title"> List d'utilisateur</h2>
          </div>

          <div className="container-xl">
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
                  <select
                    onChange={(e) => setRequestPerPage(e.target.value)}
                    className="form-select"
                  >
                    <option value={10}>Afficher 10</option>
                    <option value={20}>Afficher 20</option>
                    <option value={30}>Afficher 30</option>
                    <option value={users?.length}>Afficher tout</option>
                  </select>
                </div>
              </div>
            </header>
            <div className="table-responsive">
              <div className="table-wrapper">
                <div className="row"></div>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nom</th>
                      <th>Date de création</th>
                      <th>Role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wordEntered === "" ? (
                      <>
                        {" "}
                        {users
                          .slice(pagesVisited, pagesVisited + RequestPerPage)
                          .map((r) => (
                            <User user={r} />
                          ))}
                      </>
                    ) : (
                      <>
                        {" "}
                        {filteredData
                          .slice(pagesVisited, pagesVisited + RequestPerPage)
                          .map((r) => (
                            <User user={r} />
                          ))}
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <nav className="float-end mt-4" aria-label="Page navigation">
              <div className="float-end mt-4" aria-label="Page navigation">
                <ReactPaginate
                  previousLabel={"Précédent"}
                  nextLabel={"Suivant"}
                  pageCount={Math.ceil(users?.length / RequestPerPage)}
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
      )}
    </>
  );
};

export default ListUser;
