import React,{useState,useEffect} from 'react'
import { Link, useParams } from 'react-router-dom'
import ErrorIcon from '@mui/icons-material/Error';
import axios from 'axios';
import { Spinner } from 'flowbite-react';
import done from '../image/verified.png'
import echec from '../image/close.png'



function ConfirmedPage() {

    const params = useParams();
   const [data, setData] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
              setLoading(true);
                const { data } = await axios.get("/api/auth/emailconfirmation/"+params.token, {
                  withCredentials: true});
                console.log(data);
                setData(data.message);
            } catch (error) {
              setError(error.response.data.message);
             
            } finally {
              setLoading(false);
            }
          };
  
          fetchData();
      }, []);  
    

  return (
    <div
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >

{
    isLoading ? <div className='text-center'> <Spinner/> </div> :

    data ? < >
    <img src={done} className='w-32 mb-8'  /> 

    <p className='mt3'>
    {data}
    </p>
    <Link to="/login">
        <button className='p-3 mt-10 bg-sky-800  rounded-xl text-white'>
            Go to Login page
            </button></Link>

    </>
    :   error && <> <img src= {echec} className='w-32 mb-8' />
    <p className='mt-3'>{error}</p>
<Link to="/login">
    <button className='p-3 mt-10 bg-sky-800  rounded-xl text-white '>Go to Login page</button></Link>
</> 
}

  </div>
  )
}

export default ConfirmedPage