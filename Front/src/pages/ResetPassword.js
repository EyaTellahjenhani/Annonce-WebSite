import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (password !== confirmPassword) {
      setErr("Password Doesn't Match");
      setIsLoading(true);
    } else {
      setIsLoading(true);
      await axios
        .put(
          "/api/auth/resetpassword/" + params.token,
          { password },
          { withCredentials: true }
        )
        .then((res) => {
          setIsLoading(false);
          navigate("/login");
        })
        .catch((err) => {
          setErr(err.response.data.message);
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="mt-40 ">
      <div className="mx-auto max-w-md ">
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="p-4 sm:p-7">
            <div className="text-center">
              <div className="mb-4 inline-block rounded-full bg-blue-200 p-2 text-sky-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
              <h1 className="block text-2xl font-bold text-sky-900">
                Changer le mot de passe
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Ne vous inquiétez pas, nous vous enverrons des instructions de
                réinitialisation.
              </p>
            </div>
            <div className="mt-6">
              {/* Form */}
              <form>
                <div className="grid gap-y-4">
                  {/* Form Group */}
                  <div>
                    <label
                      htmlFor="password"
                      className="mb-2 block text-sm text-gray-600"
                    >
                      Noveau mot de passe
                    </label>
                    <div className="relative">
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        name="password"
                        className="peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-sky-600 focus:bg-white focus:ring-2 focus:ring-sky-600"
                        required=""
                        aria-describedby="password-error"
                      />

                      <div className="pointer-events-none absolute top-3 right-0 hidden items-center px-3 peer-invalid:flex">
                        <svg
                          className="h-5 w-5 text-rose-500"
                          width={16}
                          height={16}
                          fill="currentColor"
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                        >
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="passwordConformation"
                      className="mb-2 block text-sm text-gray-600"
                    >
                      Conformer le mode de passe
                    </label>
                    <div className="relative">
                      <input
onChange={(e) => setConfirmPassword(e.target.value)}
                        type="password"
                        id="passwordConformation"
                        name="passwordConformation"
                        className="peer block w-full rounded-md border border-gray-200 bg-gray-50 py-3 px-4 text-sm outline-none ring-offset-1 focus:border-sky-600 focus:bg-white focus:ring-2 focus:ring-sky-600"
                        required=""
                      />

                    </div>
                  </div>

                  {/* /Form Group */}
                  {isLoading && <div className="text-center">Loading...</div>}
                  {err && <div className="text-center">{err}</div>}
                  <button
                    onClick={handleSubmit}
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-sky-900 py-3 px-4 text-sm font-semibold text-white transition-all hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-600 focus:ring-offset-2"
                  >
                    Réinitialiser le mot de passe
                  </button>
                </div>
              </form>
              {/* /Form */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
