import React, { useState } from "react";
import Navbar from "../component/home/Navbar";
import "./Home.css";
import CategoryCards from "../component/home/CategoryCards";
import Footere from "../component/home/Footer";
import { TvRounded } from "@mui/icons-material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import WeekendIcon from '@mui/icons-material/Weekend';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import "../component/home/Filtre.css";
import CategoryIcon from '@mui/icons-material/Category';


const Home = () => {

  const [category, setCategory] = useState("");
  console.log(category);

  return (
    <div>
      <Navbar />
      <hr className="line" />
      <center>
      <div className='Category'>

      <div className='Category_item' onClick={()=> setCategory("")}>
        <CategoryIcon/>
        <span>Tout les Catégories</span>
        </div>

        <div className='Category_item' onClick={()=> setCategory("Véhicules")}>
        <DirectionsCarIcon/>
        <span>Véhicules</span>
        </div>

        <div className='Category_item' onClick={()=> setCategory("Immobilier")}>
        <WeekendIcon/>
        <span>Immobilier</span>
        </div>

        <div className='Category_item' onClick={()=> setCategory("Informatique et Multimedias")}>
        <TvRounded/>
        <span>Informatique et Multimedias</span>
        </div>

        <div className='Category_item' onClick={()=> setCategory("Maison et Jardin")}>
        <HomeIcon/>
        <span>Maison et Jardin</span>
        </div>

        <div className='Category_item' onClick={()=> setCategory("Vêtements")}>
        <CheckroomIcon/>
        <span>Vêtements</span>
        </div>

    </div>
      </center>
      <p className=" text-sky-900 font-bold ml-20 text-2xl">{category || "Tout les Catégories "}</p>
      <CategoryCards category= {category} />
      <Footere />
    </div>
  );
};

export default Home;
