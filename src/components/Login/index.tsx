import React, { useState, FC } from "react";
import { Eye, EyeOff } from "lucide-react";


type Props = {
  username:any;
  password:any;
  setUsername: any;
  setPassword:any
  handleLogin: () => void;
}
const Login:FC<Props> = ({setUsername, setPassword, username, password, handleLogin}) => {
  // STATE
  const [resetPassword, setResetPassword] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div id="__next">
      <div className="flex items-center justify-center h-screen overflow-hidden md:justify-between authlayout">
        <div className="w-full lg:basis-1/2">
          <h1 className="text-3xl font-bold text-center ">
            <a href="/">DAZA TV</a>
          </h1>
          {!resetPassword ? (
            <div className="pt-10">
              <div className="px-10 w-full md:w-[42rem]">
                {errorMsg && (
                  <>
                    <span className="text-red-600 text-sm"> {errorMsg} </span>
                    <br />
                    <span className="text-red-600 text-sm block">
                      Please note that both fields are case sensitive.
                    </span>
                  </>
                )}
                <h2 className="pb-10 font-bold md:text-2xl text-dark">
                  Log In
                </h2>
                <div className="w-full">
                  <div className="space-y-7">
                    <div className="text-left">
                      <div className="space-y-2">
                        <label className="mb-2 text-sm md:text-base text-primary">
                          Username
                        </label>
                        <input
                          onChange={(e) =>
                            setUsername(e.target.value.toLowerCase())
                          }
                          value={username}
                          type="text"
                          placeholder="Enter your username"
                          name="username"
                          className="w-full px-3 py-4 text-sm bg-white border rounded focus:border-orange text-customgray600 focus:outline-none border-primary"
                        />
                      </div>
                    </div>
                    <div className="text-left">
                      <div className="space-y-2 relative">
                        <label className="mb-2 text-sm md:text-base text-primary">
                          Password
                        </label>
                        <input
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          name="password"
                          className="w-full px-3 py-4 text-sm bg-white border rounded focus:border-orange text-customgray600 focus:outline-none border-primary"
                        />
                        {showPassword ? (
                          <EyeOff
                            style={{
                              position: "absolute",
                              top: "40",
                              right: "20",
                              cursor: "pointer",
                            }}
                            size={25}
                            onClick={() => setShowPassword((show) => !show)}
                          />
                        ) : (
                          <Eye
                            style={{
                              position: "absolute",
                              top: "40",
                              right: "20",
                              cursor: "pointer",
                            }}
                            onClick={() => setShowPassword((show) => !show)}
                            size={25}
                          />
                        )}
                      </div>
                    </div>
                    <button
                      className="bg-[#fb7b40] text-white border border-orange w-full rounded-md px-3 sm:px-5 py-3 font-bold  justify-center text-center md:text-sm cursor-pointer text-xs  hover:opacity-80 flex items-center space-x-2"
                      type="submit"
                      onClick={handleLogin}
                    >
                      {loading && !errorMsg ? "Logging you in" : "Log in"}
                    </button>
                  </div>
                  <div className="py-2 text-sm text-red-500"></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-10 w-full md:w-[42rem]">
              {errorMsg && (
                <span className="text-red-600 text-sm"> {errorMsg} </span>
              )}
        
            </div>
          )}
        </div>
        <div className="h-screen overflow-hidden hidden lg:flex md:w-3/6">
          {/* <img
            alt="background"
            src={LoginImg}
            width="5472"
            height="3648"
            decoding="async"
            data-nimg="1"
            className="object-cover"
            loading="lazy"
            style={{ color: "transparent" }}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
