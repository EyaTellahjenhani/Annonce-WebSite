import React, { useEffect, useState } from "react";
import Navbar from "../component/home/Navbar";
import Footere from "../component/home/Footer";
import { Spinner } from "flowbite-react";
import axios from "axios";
import avatar from "../image/avatar.png";

const MyProfile = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState({});
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [errorUpdate, setErrorUpdate] = useState("");
  const [successUpdate, setSuccessUpdate] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/users/profile");
        setProfile(data[0]);
      } catch (error) {
        setError("Failed to load Data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const updateProfile = async (e) => {
    setLoadingUpdate(true);
    e.preventDefault();
    try {
      const { data } = await axios
        .put("/api/users/profile", formData)
        .then((response) => {
          setSuccessUpdate(response.data);
          setErrorUpdate("");
          setLoadingUpdate(false);
          window.location.reload();
        })
        .catch((error) => {
          setErrorUpdate(error.response.data);
          setLoadingUpdate(false);
        });

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Navbar />
      <main className="flex flex-col md:flex-row justify-center m-20">
        {loading ? (
          <div className="text-center">
            <Spinner aria-label="Center-aligned spinner example" />
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <>
            <div class=" max-w-screen-md border px-4  sm:mx-4 sm:rounded-xl ">
              <div>
                <div class=" flex justify-center shrink-0 sm:py-3">
                  <img src={avatar}></img>
                </div>
              </div>
              <div class="flex justify-center text-center  border-b py-4 sm:flex-row">
                <p class="shrink-0 font-medium text-sky-900">
                  {profile?.FirstName} {profile?.LastName}
                </p>
              </div>
              <div class="flex justify-center text-center flex-col border-b py-4 sm:flex-row">
                <p class="shrink-0  font-medium text-sky-900">
                  {profile?.Email}{" "}
                </p>
              </div>

              <div class="flex justify-center text-center flex-col gap-4 border-b py-4 sm:flex-row">
                <p class="shrink-0 font-medium text-sky-900">
                  {profile?.Phone}
                </p>
              </div>
            </div>
            <div class=" max-w-screen-md border px-4  sm:mx-4 sm:rounded-xl ">
              <div class="flex flex-col border-b py-4 sm:flex-row sm:items-start">
                <div class="shrink-0 mr-auto sm:py-3">
                  <p class="font-medium">Détails du compte</p>
                  <p class="text-sm text-gray-600">
                    Modifier les détails de votre compte
                  </p>
                </div>
              </div>
              <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <p class="shrink-0 w-32 font-medium">Nom et prénom</p>
                <input
                  name="firstName"
                  onChange={handleChange}
                  defaultValue={profile?.FirstName}
                  placeholder="prénom"
                  class="mb-2 w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 sm:mr-4 sm:mb-0 focus:ring-1"
                />
                <input
                  defaultValue={profile?.LastName}
                  placeholder="nom"
                  name="lastName"
                  onChange={handleChange}
                  class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                />
              </div>
              <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <p class="shrink-0 w-32 font-medium">Email</p>
                <input
                  name="email"
                  onChange={handleChange}
                  defaultValue={profile?.Email}
                  placeholder="your.email@domain.com"
                  class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                />
              </div>

              <div class="flex flex-col gap-4 border-b py-4 sm:flex-row">
                <p class="shrink-0 w-32 font-medium">Numéro Téléphone</p>
                <input
                  name="phone"
                  onChange={handleChange}
                  defaultValue={profile?.Phone}
                  placeholder="(+216) 12345678"
                  class="w-full rounded-md border bg-white px-2 py-2 outline-none ring-blue-600 focus:ring-1"
                />
              </div>

              <div class="flex flex-col justify-center py-4">
                {loadingUpdate ? (
                  <div className="text-center">
                    <Spinner aria-label="Center-aligned spinner example" />
                  </div>
                ) : errorUpdate ? (
                  <div className="text-red-600 text-center mb-3">
                    {errorUpdate}
                  </div>
                ) : successUpdate ? (
                  <div className="text-green-600 text-center mb-3">
                    {successUpdate}
                  </div>
                ) : (
                  <div></div>
                )}

                <button
                  onClick={updateProfile}
                  class="rounded-lg border-2 border-transparent bg-sky-900 px-4 py-2 font-medium text-white focus:outline-none focus:ring hover:bg-sky-700"
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      <Footere />
    </div>
  );
};

export default MyProfile;
