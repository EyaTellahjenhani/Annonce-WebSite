import React, { useEffect, useState } from "react";
import "./Navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Logo from "../../Logo1.png";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Avatar, Dropdown } from "flowbite-react";
import axios from "axios";
import AddListing from "../../pages/AddListing";

const Navbar = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    window.localStorage.getItem("isLoggedIn")
  );
  const [data, setData] = useState([]);

  const logout = async () => {
    await axios.post("/api/auth/signout", { withCredentials: true });
    window.localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const fetchUser = async () => {
      await axios.get("/api/users/profile", {
        withCredentials: true,
      }).then((res) => {
        
        setData(res.data);

    }).catch((err) => {
      if (err.response.status === 401) {
        logout();
      }
    });
    };
    if (isLoggedIn) {
      fetchUser();
    }
  }, [isLoggedIn]);

  const [searchParams] = useSearchParams();

  const [title, setTitle] = useState("");

  const handelSearch = (e) => {
    setTitle(e.target.value);
    searchParams.set("title", title);
    searchParams.toString();
    window.history.replaceState(null, null, "?" + searchParams);
  };

  const [openModal, setOpenModal] = useState(false);


  return (
    <div>
      {/* I WANT TO ADD NAVBAR HERE THREE SECTION LOGO, SEARCH, BUTTON1, BUTTON2  */}
      <div className="navbar">
        <Link to="/">
          <div className="navbar_logo">
            <img src={Logo} alt="logo" />
          </div>
        </Link>
        <div className="navbar_search">
          <SearchIcon style={{ color: "#717171" }} />
          <input type="text" placeholder="Search" onChange={handelSearch} />
        </div>
        <div className="navbar_button">
          <Button
            style={{ color: "#15446d", border: "1px solid #15446d" }}
            variant="outlined"
            startIcon={<AddCircleIcon />}
            onClick={() =>
              isLoggedIn ? setOpenModal(true) : navigate("/login")
            }
          >
            Publier une annonce
          </Button>
          {isLoggedIn ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={<Avatar alt="User settings" img="" rounded />}
            >
              <Dropdown.Header>
                <span className="block text-sm">
                  {data[0]?.FirstName} {data[0]?.LastName}{" "}
                </span>
                <span className="block truncate text-sm font-medium">
                  {data[0]?.Email}
                </span>
              </Dropdown.Header>

              <Link to="/MyProfile">
                <Dropdown.Item>Mon profil</Dropdown.Item>
              </Link>

              <Link to="/MyListing">
                <Dropdown.Item>Mes annonces </Dropdown.Item>
              </Link>

              <Dropdown.Divider />
              <Dropdown.Item onClick={logout}>Sign out</Dropdown.Item>
            </Dropdown>
          ) : (
            <Link to="/login">
              <Button
                style={{ color: "#717171", border: "1px solid #717171" }}
                variant="outlined"
                startIcon={<AccountCircleIcon />}
              >
                Ce connecter
              </Button>
            </Link>
          )}
        </div>
      </div>
      <AddListing openModal={openModal} setOpenModal={setOpenModal} />
    </div>
  );
};

export default Navbar;
