import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import Toast from "../LoadingError/Toast";
import axios from "axios";




const CreateCategory = () => {

    const ToastObjects = {
        pauseOnFocusLoss: false,
        draggable: false,
        pauseOnHover: false,
        autoClose: 2000,
      };



    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
  const [categoryName, setCategoryName] = useState("");


  const submitHandler = (e) => {
    e.preventDefault();
if(categoryName ==="")
{
  toast.error("Le nom est requis", ToastObjects);

}
    else
    {
setLoading(true);
        axios.post("/api/categories", { categoryName }).then((response) => {
            console.log(response.data);
            toast.success(response.data, ToastObjects);
            setLoading(false);
            }).catch((err) => {
                toast.error(err.response.data, ToastObjects);
                setError(err.message);
                setLoading(false);
                }
                );

    }
    
  };

  return (
    <div className="col-md-12 col-lg-4">
        <Toast/>
      <form onSubmit={submitHandler}>
        <div className="mb-4">
       
                  {loading && <Loading />}
          <label htmlFor="product_name" className="form-label">
          Nom de catégorie
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            required
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>
      
        <div className="d-grid">
          <button className="btn btn-primary py-2">Créer une catégorie</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;