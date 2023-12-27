import React, { useEffect, useState } from 'react'
import Logo from "../Logo1.png";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";



const Login = () => {
  const isLoggedIn= window.localStorage.getItem('isLoggedIn')
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleClick = async (e) => {
    try {
      e.preventDefault();

       await axios.post("/api/auth/login", {
        email,
        password,
      });
      navigate("/");
      window.localStorage.setItem('isLoggedIn', true);

      setError("");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    if (isLoggedIn)
    {
     navigate('/')
    }
    
   },);

  return (


<div className="flex min-h-screen w-screen  items-center justify-center text-gray-600 bg-gray-50">
  <div className="relative">
    <div className="hidden sm:block h-56 w-56 text-sky-600 absolute a-z-10 -left-20 -top-20">
      <svg
        id="patternId"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="a"
            patternUnits="userSpaceOnUse"
            width={40}
            height={40}
            patternTransform="scale(0.6) rotate(0)"
          >
            <rect x={0} y={0} width="100%" height="100%" fill="none" />
            <path
              d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
              strokeWidth={1}
              stroke="none"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width="800%"
          height="800%"
          transform="translate(0,0)"
          fill="url(#a)"
        />
      </svg>
    </div>
    <div className="hidden sm:block h-28 w-28 text-sky-600 absolute a-z-10 -right-20 -bottom-20">
      <svg
        id="patternId"
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="b"
            patternUnits="userSpaceOnUse"
            width={40}
            height={40}
            patternTransform="scale(0.5) rotate(0)"
          >
            <rect x={0} y={0} width="100%" height="100%" fill="none" />
            <path
              d="M11 6a5 5 0 01-5 5 5 5 0 01-5-5 5 5 0 015-5 5 5 0 015 5"
              strokeWidth={1}
              stroke="none"
              fill="currentColor"
            />
          </pattern>
        </defs>
        <rect
          width="800%"
          height="800%"
          transform="translate(0,0)"
          fill="url(#b)"
        />
      </svg>
    </div>

    {/* Register */}
    <div className="relative flex flex-col sm:w-[30rem] rounded-lg border-gray-400 bg-white shadow-lg px-4">
      <div className="flex-auto p-6">
        {/* Logo */}
        <div className="mb-10 flex flex-shrink-0 flex-grow-0 items-center justify-center overflow-hidden">
    <Link to="/">
            <span className="flex-shrink-0 text-3xl font-black lowercase tracking-tight opacity-100">
              <img className='w-40' src={Logo} alt="logo"/>
            </span>
    </Link>
        </div>
        {/* /Logo */}
        <h4 className="mb-2 font-medium text-sky-900 xl:text-xl">
        Bienvenue chez Azul !
        </h4>
        <p className="mb-6 text-gray-500">
          Connectez-vous à votre compte pour continuer.
        </p>
        <form id="" className="mb-4" action="#" method="POST">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 inline-block text-xs font-medium uppercase text-sky-900"
            >
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              className="block w-full cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
              id="email"
              name="email"
              placeholder="Entrer votre Email"

            />
          </div>
          <div className="mb-8">
            <div className="flex justify-between">
              <label
                className="mb-2 inline-block text-xs font-medium uppercase text-sky-900"
                htmlFor="password"
              >
                Mot de passe
              </label>
                <Link to="/forgotpassword">
                <small className="cursor-pointer text-sky-600 no-underline hover:text-sky-600">Mot de passe oublié?</small>
                </Link>

            </div>
            <div className="relative flex w-full flex-wrap items-stretch">
              
              <input
              onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="relative block flex-auto cursor-text appearance-none rounded-md border border-gray-400 bg--100 py-2 px-3 text-sm outline-none focus:border-indigo-500 focus:bg-white focus:text-gray-600 focus:shadow"
                name="password"
                placeholder="············"
              />
            </div>
          </div>

          {error && <p className="mb-4 text-red-500">{error}</p>}
          <div className="mb-4">
            
            <button
              onClick={handleClick}
              className="grid w-full cursor-pointer select-none rounded-md border border-sky-900 bg-sky-900 py-2 px-5 text-center align-middle text-sm text-white shadow hover:border-sky-600 hover:bg-sky-600 hover:text-white focus:border-indigo-600 focus:bg-indigo-600 focus:text-white focus:shadow-none"
              type="submit"
            >
              Se connecter
            </button>

          </div>
        </form>
        <p className="mb-4 text-center">
        Nouveau sur Azul ?
          <Link to="/signup"
            className="cursor-pointer text-sky-600 no-underline hover:text-sky-600"
          >
            {" "}
            Créer un compte{" "}
          </Link>
        </p>
      </div>
    </div>
    {/* /Register */}
  </div>
</div>

  )
}

export default Login