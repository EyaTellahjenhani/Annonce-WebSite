import React from 'react'
import Navbar from '../component/home/Navbar'
import Footere from '../component/home/Footer'
import InformationListing from '../component/listing/InformationListing'


const Listing = () => {
  return (
    <div>
      <Navbar />
      <hr className="line" />
      <InformationListing />
      <Footere />
    </div>
  )
}

export default Listing