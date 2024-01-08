import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Header from "../components/Header";
import ProfileUserMain from "../components/Users/ProfileUserMain";
import axios from "axios";

const ProfileScreen = ({ match }) => {
  const [user,setUser]=useState({});
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    axios.get("/api/users/profile").then((response)=>{
      setUser(response.data);
setLoading(false)
    });


},[]);
console.log(user);
  return (
    <>
      <Sidebar />
      <main className="main-wrap">
        <Header />
        <ProfileUserMain user={user[0]} loading={loading} />
      </main>
    </>
  );
};

export default ProfileScreen;
