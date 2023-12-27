import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import axios from 'axios'


const CategoryCards = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [Annonce, setAnnonce] = useState([]);

  
    useEffect(() => {
      const fetchData = async () => {
          try {
            setLoading(true);
              const { data } = await axios.get("/api/listings");
              setAnnonce(data);
          } catch (error) {
            setError("Failed to load Data");
           
          } finally {
            setLoading(false);
          }
        };

        fetchData();
    }, []);

  return (
    <div >
      
      {loading ? <div>Loading...</div>: error ? <div>{error}</div>: <div className='Card'>{Annonce.map((item,i)=><Cards titre={item.Title} description={item.Description} image={item.ImageURL} price={item.Price} id={item.ListingID}/>)}</div>}
      
    </div>
  )
}

export default CategoryCards