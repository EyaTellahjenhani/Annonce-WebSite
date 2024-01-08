import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import axios from "axios";
import Toast from "../LoadingError/Toast";
import { toast } from "react-toastify";






const CategoriesTable = () => {

    const ToastObjects = {
        pauseOnFocusLoss: false,
        draggable: false,
        pauseOnHover: false,
        autoClose: 2000,
      };

    const [categorys, setCategorys] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


  //Pagination 
  const [pageNumber, setPageNumber] = useState(0);
  const [categoryPerPage, setCategoryPerPage] = useState(5);
  const pagesVisited = pageNumber * categoryPerPage;

    const changePage = ({ selected }) => {
      setPageNumber(selected);
    };

//




  useEffect(() => {

    axios.get("/api/categories/").then((response)=>{
        setCategorys(response.data);
        setLoading(false);
        }
        ).catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    
    
  }, [categorys]);


  const deletehandler = (id) => {
    if (window.confirm("Are you sure??")) {
        axios.delete(`/api/categories/${id}`);
        toast.success("La catégorie a été supprimée", ToastObjects);
    }
  };






  return (

    
    <div className="col-md-12 col-lg-8">
                <Toast/>

      {loading ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
      <table className="table">
        <thead>
          <tr>
           
            <th>ID</th>
            <th>Nom</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        {/* Table Data */}
        <tbody>
        {categorys?.slice(pagesVisited, pagesVisited + categoryPerPage)
                    .map((cat) => (
          <tr>
            <td>{cat.CategoryID}</td>
            <td>
              <b>{cat.CategoryName}</b>
            </td>
            <td className="text-end">
              <div className="dropdown">
                <Link
                  to="#"
                  data-bs-toggle="dropdown"
                  className="btn btn-light"
                >
                  <i className="fas fa-ellipsis-h"></i>
                </Link>
                <div className="dropdown-menu">
                  
                  <Link   onClick={() => deletehandler(cat.CategoryID)} className="dropdown-item text-danger" to="#">
                  Supprimer
                  </Link>
                </div>
              </div>
            </td>
          </tr>))}
        </tbody>
      </table>)}
      
<ReactPaginate
        previousLabel={"Précédent"}
        nextLabel={"Suivant"}
        pageCount={Math.ceil(categorys?.length / categoryPerPage)}
        onPageChange={changePage}
        containerClassName={"paginationBttns"}
        previousLinkClassName={"previousBttn"}
        nextLinkClassName={"nextBttn"}
        disabledClassName={"paginationDisabled"}
        activeClassName={"paginationActive"}
      /> 

    </div>
  );
};

export default CategoriesTable;