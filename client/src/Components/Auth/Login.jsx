import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
// import GoogleIcon from "@mui/icons-material/Google";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import FacebookIcon from "@mui/icons-material/Facebook";
// import AppleIcon from "@mui/icons-material/Apple";
import chatimg from "../../assets/chatting.jpg";
import axios from "axios";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

const Login = () => {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  const navigate = useNavigate("");

  async function loginUser(data) {
    try {
      const res = await axios.post("http://localhost:8080/login", data);
      console.log(res);
      navigate("/chatroom");
    }
    catch (error) {
      console.error("Error in login user:", error.message);
      navigate("/login");
    }
  }
  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(username,password);
    loginUser({ username, password });
  };

  return (
    <div>
      <div className="h-screen bg-white w-full flex justify-center items-center">
        <div className="w-5/6 h-5/6  bg-[#f7cad0] flex justify-center items-center rounded-xl  ">
          <div className="w-5/6 h-5/6 bg-[#edafb8] rounded-2xl flex items-center">
            <div className="w-2/4 h-5/6 my-16 ml-8 bg-white  rounded-3xl">
              <h1 className="text-center p-2 text-xl font-medium">Login</h1>
              <form onSubmit={ onSubmitHandler}>
                <div className="mt-5 flex justify-center items-center">
                  <div className=" border-2 border-blue-200 rounded w-70 py-2 px-6 text-gray-700 hover:cursor-pointer">
                    <PersonIcon className="pr-2" />
                    <input
                      className="appearance-none leading-tight focus:outline-none w-72 h-6 bg-white "
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Username"
                      value={username} 
                      onChange={e => setUsername(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>
                <div className="mt-5 flex justify-center items-center">
                  <div className=" border-2 rounded w-70 py-2 px-6 text-gray-700 hover:cursor-pointer">
                    <LockIcon className="pr-2" />
                    <input
                      className="appearance-none leading-tight focus:outline-none focus:shadow-outline w-72 h-6 bg-white "
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      value={password} 
                      onChange={e => setPassword(e.target.value)}
                      required
                    ></input>
                  </div>
                </div>
                <div className="ml-16 flex ">
                  <input
                    className="mr-2 leading-tight cursor-pointer"
                    type="checkbox"
                  ></input>
                  <span className="text-sm">Remember Password</span>
                  <span className="ml-20 mr-8 text-blue-600 underline underline-offset-4 cursor-pointer">
                    Forgot Password
                  </span>
                </div>
                <button
                  type="submit"
                  className=" active:scale-95 duration-200  w-3/4 ml-14 mt-8 bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
                >
                  Login
                </button>
                <div className="mt-6">
                  <span className="flex justify-center items-center">
                    No Account yet ?{" "}
                    <span className="text-blue-600 underline underline-offset-4 hover:cursor-pointer">
                      {" "}
                      <Link to="/register">Register</Link>
                    </span>
                  </span>
                </div>
                {/* <div className="flex justify-evenly mt-6">
                  <div className="w-12 h-12 border border-gray-600 rounded flex justify-center">
                    <GoogleIcon className="mt-3 hover:cursor-pointer" />
                  </div>
                  <div className="w-12 h-12 border border-gray-600 rounded flex justify-center hover:cursor-pointer">
                    <TwitterIcon className="mt-3" />
                  </div>
                  <div className="w-12 h-12 border border-gray-600 rounded flex justify-center hover:cursor-pointer">
                    <FacebookIcon className="mt-3" />
                  </div>
                  <div className="w-12 h-12 border border-gray-600 rounded flex justify-center hover:cursor-pointer">
                    <AppleIcon className="mt-3" />
                  </div>
                </div> */}
              </form>
            </div>
              <div className="w-2/4 h-3/6 ml-12 mr-8 flex items-center rounded-3xl">
                  <img className="rounded-3xl" src={chatimg} alt=""></img>
                 </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
