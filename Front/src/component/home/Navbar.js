import React, { useEffect, useState } from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Logo from "../../Logo1.png";
import { Link } from "react-router-dom";
import { Avatar, Dropdown } from "flowbite-react";
import axios from "axios";



const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem('isLoggedIn'));
  const [data, setData] = useState([]);

  const logout = async () => {
    await axios.post('/api/auth/signout',{withCredentials: true} );
    window.localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  }


  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get('/api/users/profile',{withCredentials: true} );
      setData(data);
    }
if (isLoggedIn) {
  fetchUser();
}
  }, [isLoggedIn])


  return (
    <div>
      {/* I WANT TO ADD NAVBAR HERE THREE SECTION LOGO, SEARCH, BUTTON1, BUTTON2  */}
      <div className="navbar">
        <div className="navbar_logo">
          <img
            src={Logo}
            alt="logo"
          />
        </div>
        <div className="navbar_search">
          <SearchIcon style={{color: "#717171"}} />
          <input type="text" placeholder="Search" />
        </div>
        <div className="navbar_button">
          <Button style={{color: "#15446d" , border:"1px solid #15446d"}} variant="outlined" startIcon={<AddCircleIcon />}>
            Publier une annonce
          </Button>
          {          isLoggedIn ? <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt="User settings" img="" rounded />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{data[0]?.FirstName} {' '} {data[0]?.LastName} </span>
              <span className="block truncate text-sm font-medium">{data[0]?.Email}</span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
          </Dropdown>
            :           <Link to="/login">
            <Button style={{color:"#717171" , border:"1px solid #717171"}} variant="outlined" startIcon={<AccountCircleIcon />}>
              Ce connecter
            </Button>
            </Link>
}

        </div>
      </div>
    </div>
  );
};

export default Navbar;
