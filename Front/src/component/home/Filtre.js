import React from 'react'
import { TvRounded } from "@mui/icons-material";
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import HomeIcon from '@mui/icons-material/Home';
import WeekendIcon from '@mui/icons-material/Weekend';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import "./Filtre.css";
const Filtre = () => {
  return (
    <div className='Category'>
        <div className='Category_item'>
        <DirectionsCarIcon/>
        <span>Véhicules</span>
        </div>

        <div className='Category_item'>
        <WeekendIcon/>
        <span>Immobilier</span>
        </div>

        <div className='Category_item'>
        <TvRounded/>
        <span>Informatique et Multimedias</span>
        </div>

        <div className='Category_item'>
        <HomeIcon/>
        <span>Maison et Jardin</span>
        </div>

        <div className='Category_item'>
        <CheckroomIcon/>
        <span>Vêtements</span>
        </div>

        

    </div>
  )
}

export default Filtre