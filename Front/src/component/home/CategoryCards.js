import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import axios from 'axios'
import { Spinner } from 'flowbite-react';


const CategoryCards = ({category}) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [Annonce, setAnnonce] = useState([]);


  
    useEffect(() => {
      const fetchData = async () => {
          try {
            setLoading(true);
              const { data } = await axios.get("/api/listings?category="+category);
              console.log(data);
              setAnnonce(data);
          } catch (error) {
            setError("Failed to load Data");
           
          } finally {
            setLoading(false);
          }
        };

        fetchData();
    }, [category]);

  return (
    <div >
      
      {loading ? 
      <div className="text-center">
        <Spinner aria-label="Center-aligned spinner example" />
      </div>: error ? <div>{error}</div>: 
      !Annonce ? <div className='text-center'> Pas des Annonce pour cette categorier </div> :
      <div className='Card'>
        {Annonce?.map((item,i)=><Cards titre={item.Title} CategoryName={item.CategoryName} image={item.images} price={item.Price} id={item.ListingID}/>)}</div>}
      
    </div>
  )
}

export default CategoryCards