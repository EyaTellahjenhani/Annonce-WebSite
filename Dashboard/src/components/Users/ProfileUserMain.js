import React, { useState } from "react";
import Loading from "../LoadingError/Loading";
import Logo from "../../images/user.png";
import axios from "axios";
import { toast } from "react-toastify";
import Toast from "../LoadingError/Toast";

const ProfileUserMain = ({ user, loading }) => {
  const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
  };


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
          toast.success(response.data, ToastObjects);

        })
        .catch((error) => {
          setErrorUpdate(error.response.data);
          setLoadingUpdate(false);
          toast.error(error.response.data, ToastObjects);
        });

      console.log(data);
    } catch (error) {

      console.log(error);
    }
  };




  return (
    <>
      <Toast />
      {loading ? (
        <Loading />
      ) : (
        <section className="content-main" style={{ maxWidth: "1200px" }}>
          <div className="content-header">
            <h2 className="content-title">Paramètre d'utilisateur</h2>
          </div>

          <div className="card mb-4 shadow-sm">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <section className="content-body">
                    <form>
                      <div className="row">
                        <div className="col-lg-8">
                          <div className="row gx-3">
                            <div className="col-6  mb-3">
                              <label className="form-label">Prénom</label>
                              <input
                                className="form-control"
                                type="text"
                                name="firstName"
                                onChange={handleChange}
                                defaultValue={user?.FirstName}
                              />
                            </div>
                            <div className="col-6  mb-3">
                              <label className="form-label">Nom</label>
                              <input
                                className="form-control"
                                type="text"
                                name="lastName"
                                onChange={handleChange}
                                defaultValue={user?.LastName}
                              />
                            </div>
                            <div className="col-lg-6  mb-3">
                              <label className="form-label">Email</label>
                              <input
                                className="form-control"
                                type="email"
                                name="email"
                                onChange={handleChange}
                                defaultValue={user?.Email}
                              />
                            </div>
                            <div className="col-lg-6  mb-3">
                              <label className="form-label">
                                Numéro de téléphone
                              </label>
                              <input
                                className="form-control"
                                type="tel"
                                name="phone"
                                onChange={handleChange}
                                defaultValue={user?.Phone}
                              />
                            </div>

                            <div className="col-6  mb-3">
                              <label className="form-label">
                                Nouveau Mot de passe
                              </label>
                              <input
                                className="form-control"
                                type="password"
                                name="password"
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <aside className="col-lg-4">
                          <figure className="text-lg-center">
                            <img
                              className="img-lg mb-3 img-avatar"
                              src={Logo}
                              alt="User"
                            />
                          </figure>
                        </aside>
                      </div>
                      <br />
                      {loadingUpdate && <Loading />}
                      <button
                        className="btn btn-primary"
                        onClick={
                          updateProfile
                        }
                      >
                        Changer le Profile
                      </button>
                    </form>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProfileUserMain;
