import React from "react";
import Navbar from "../component/home/Navbar";
import Filtre from "../component/home/Filtre";
import "./Home.css";
import CategoryCards from "../component/home/CategoryCards";
import Footere from "../component/home/Footer";


const Home = () => {
  return (
    <div>
      <Navbar />
      <hr className="line" />
      <center><Filtre /></center>
      <CategoryCards />
      <Footere />
    </div>
  );
};

export default Home;
