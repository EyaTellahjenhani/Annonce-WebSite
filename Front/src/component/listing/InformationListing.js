import { Carousel } from "flowbite-react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import GridViewRoundedIcon from '@mui/icons-material/GridViewRounded';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

function InformationListing() {
  return (
    <div className="flex-col m-10 ">
        <div className="flex items-center justify-center mb-5">
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 w-[600px]">
        <Carousel>
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
            alt="..."
          />
          <img
            src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
            alt="..."
          />
        </Carousel>
      </div>
       </div>

      <div className="text-sky-900 ml-8 mr-8">
        <h1 className="text-4xl font-bold text-center mb-12" >le XM3 coupé-SUV</h1>
        <h3 className="text-2xl font-bold mb-5">100 DNT</h3>
        <p className="mb-7">
          Renault Samsung Motors dévoile en première mondiale au Salon de
          l’Automobile de Séoul XM3 INSPIRE.
        </p>
      </div>

      <div className="rounded-lg bg-slate-50 flex-col p-6" >
        <h5 className="m-1"><PersonIcon/>User1</h5>
        <h5 className="m-1"><LocationOnIcon/> Rue Ali Bel Haj Rhouma </h5>
        <h5 className="m-1"><GridViewRoundedIcon/> Véhicules </h5>
        <h5 className="m-1"><AccessTimeFilledIcon/> Publié le 12/12/2023</h5>
      </div>

    </div>
  );
}

export default InformationListing;
