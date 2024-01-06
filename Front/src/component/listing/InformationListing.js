import LocationOnIcon from "@mui/icons-material/LocationOn";
import PersonIcon from "@mui/icons-material/Person";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Carousel, Spinner } from "flowbite-react";
import CallIcon from '@mui/icons-material/Call';



function InformationListing() {
  const params = useParams();


  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);

  useEffect(() => {
    
    const fetchListing = async () => {
      setLoading(true);
      const { data } = await axios.get("/api/listings/" + params.id);
      setData(data);
      setLoading(false);
      console.log(data);
    };
    fetchListing();
  }, []);

  return (
    <div>
    {loading ?
       <div className="text-center">
       <Spinner aria-label="Center-aligned spinner example" />
     </div>:
      
    <div className="flex-col m-10 ">
      <div className="flex items-center justify-center mb-5">
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 w-[600px]">



        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <Carousel slide={false}>
      {data[0]?.images?.map((item, index) => (
        <img src={item.ImageURL} alt="..." />
      ))}
      </Carousel>
    </div>

        </div>
      </div>

      <div className="text-sky-900 ml-8 mr-8">
        <h1 className="text-4xl font-bold text-center mb-12">
          {data[0]?.Title}
        </h1>
        <h3 className="text-2xl font-bold mb-5">{data[0]?.Price} DNT</h3>
        <p className="mb-7">{data[0]?.Description}</p>
      </div>

      <div className="rounded-lg bg-slate-50 flex-col p-6">
        <h5 className="m-1">
          <PersonIcon />
          {data[0]?.FirstName} {data[0]?.LastName}
        </h5>
        <h5 className="m-1">
          <CallIcon /> {data[0]?.Phone}{" "}
        </h5>
        <h5 className="m-1">
          <LocationOnIcon /> {data[0]?.Location}{" "}
        </h5>
        <h5 className="m-1">
          <GridViewRoundedIcon /> {data[0]?.CategoryName}{" "}
        </h5>
        <h5 className="m-1">
          <AccessTimeFilledIcon /> Publié le {data[0]?.DatePosted}
        </h5>
      </div>
    </div>
    }
    </div>
  );
}

export default InformationListing;
