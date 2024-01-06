import React, { useEffect, useState } from "react";
import Navbar from "../component/home/Navbar";
import Footere from "../component/home/Footer";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeIcon from "@mui/icons-material/Mode";
import axios from "axios";
import { format } from "date-fns";
import { Spinner } from "flowbite-react";
import ModifiyListing from "./ModifiyListing";

const MyListing = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [Annonce, setAnnonce] = useState([]);
  const [openModal, setOpenModal] = useState(false)

  const [updatedAnnonce, setupdatedAnnonce] = useState(null)
    useEffect(() => {
      const fetchData = async () => {
          try {
            setLoading(true);
              const { data } = await axios.get("/api/listings/mylistings");
              console.log(data);
              setAnnonce(data);
          } catch (error) {
            setError("Failed to load Data");
           
          } finally {
            setLoading(false);
          }
        };

        fetchData();
    }, []);

    const handelDelete =async (id) =>{
      if (window.confirm("es-tu sûr de vouloir supprimer ceci"))
      {
     await axios.delete("/api/listings/"+id);
     window.location.reload();
      }
    }

    


  return (

    <div>
      <Navbar />
      <hr className="line mb-10" />
      <div className="flex justify-center text-sky-900 text-2xl font-bold m-10">
        <h1>Mes Annonces</h1>
      </div>
     

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  
      {
      loading ? <div className="text-center my-5"> <Spinner/> </div> : error ? <div className="text-red-600"> {error} </div>:
    
        <table className="w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className=" text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Prix
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {Annonce.map((item, i) => ( 
              <>

            <tr className="bg-white border-b hover:bg-gray-50">
              <td className="p-4">
                <img
                  src={item.images[0]?.ImageURL}
                  className="w-16 md:w-32 max-w-full max-h-full"
                  alt="Apple Watch"
                />
              </td>

              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {item.Title}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <p>{format(
                    new Date(item.DatePosted),
                    "dd/MM/yyyy"
                  )}
                  </p>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {item.Price} DT
              </td>
              <td className="px-4 py-4">
                <div className="flex gap-2">
                <div
                onClick={()=> {
                  setOpenModal(true)
                  setupdatedAnnonce(item)
                
            } }
                  className="font-medium text-yellow-400 dark:text-yellow-300 hover:underline cursor-pointer"
                ><ModeIcon />
                  Modifier
                </div>
                <div
                  onClick={() => handelDelete(item.ListingID)}
                  className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                ><DeleteIcon/>
                  Supprimer
                </div>
                </div>
              </td>
            </tr>


</>
            ))}
          </tbody>
        </table>
}
      </div>

      <ModifiyListing setOpenModal={setOpenModal} openModal={openModal} annonce={updatedAnnonce} />


      <Footere />
    </div>
  );
};

export default MyListing;
