import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import chatimg from "../Images/chatting.jpg";
// import axios from "axios";
import { Link} from "react-router-dom";

const Register = () => {
  // const [email, setEmail] = useState("");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [errors, setError] = useState({});

  // const validateForm = () => {
  //   const validationErrors = {};
  //   if (username === "") {
  //     validationErrors.username = "username is required";
  //   } else if (username.length <= 5) {
  //     validationErrors.username = "username is not valid";
  //   }
  //   if (email === "") {
  //     validationErrors.email = "email is required";
  //   } else if (
  //     !email.match(
  //       /^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/g
  //     )
  //   ) {
  //     validationErrors.email = "email you've entered is not valid";
  //   }
  //   if (password === "") {
  //     validationErrors.password = "password is required";
  //   } else if (password.length < 8) {
  //     validationErrors.password = "password should be atleast 8 characters";
  //   } else if (
  //     !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm)
  //   ) {
  //     validationErrors.password =
  //       "password must contain at least 8 characters!";
  //   }
  //   return validationErrors;
  // };

  // const navigate = useNavigate("");

  // const userNameChangeHandler = (e) => {
  //   setUsername(e.target.value);
  // };

  // const passwordChangeHandler = (e) => {
  //   setPassword(e.target.value);
  // };

  // const emailChangeHandler = (e) => {
  //   setEmail(e.target.value);
  // };

  // async function registerUser(data) {
  //   try {
  //     const res = await axios.post("http://localhost:5000/user/register", data);
  //     console.log(res);
  //     navigate("/login");
  //   } catch (error) {
  //     console.error("Error registering user:", error);
  //   }
  // }

  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   let errorsObj = validateForm();
  //   setError(errorsObj);
  //   if (Object.keys(errorsObj).length === 0) {
  //     alert("Your account has been created");
  //   }
  //   registerUser({ username, email, password });
  // };
  return (
    <div>
      <div className="h-screen bg-white w-full flex justify-center items-center novalidate">
        <div className="w-5/6 h-5/6 bg-teal-100 flex justify-center items-center rounded-xl  ">
          <div className="w-5/6 h-5/6 bg-cyan-50 rounded-2xl flex items-center">
            <div className="w-2/4 h-5/6 my-16 ml-8 bg-white  rounded-3xl">
              <h1 className="text-center p-2 text-xl font-medium">Register</h1>
              <form noValidate >
                <div className="mt-5 flex justify-center items-center ">
                  <div className=" border-2 border-blue-200 rounded w-70 py-2 px-6 text-gray-700 ">
                    <PersonIcon className="pr-2" />
                    <input
                      className="appearance-none leading-tight focus:outline-none w-72 h-6 hover:cursor-pointer "
                      id="username"
                      name="username"
                      type="text"
                      placeholder="Username"
                      // onChange={userNameChangeHandler}
                    ></input>
                  </div>
                </div>
                {/* {errors.username && (
                  <span className="mt-1 text-sm text-red-500 ml-16">
                    {errors.username}
                  </span>
                )} */}
                <div className="mt-4 flex justify-center items-center ">
                  <div className=" border-2 border-blue-200 rounded w-70 py-2 px-6 text-gray-700  ">
                    <EmailIcon className="pr-2" />
                    <input
                      className="appearance-none leading-tight focus:outline-none w-72 h-6 hover:cursor-pointer  "
                      type="email"
                      id="email"
                      name="email"
                      placeholder="example@gmail.com"
                      // onChange={emailChangeHandler}
                    ></input>
                  </div>
                </div>
                {/* {errors.email && (
                  <span className="mt-1 text-sm text-red-500 ml-16">
                    {errors.email}
                  </span>
                )} */}

                <div className="mt-4 flex justify-center items-center ">
                  <div className=" border-2 rounded w-70 py-2 px-6 text-gray-700">
                    <LockIcon className="pr-2" />
                    <input
                      className="appearance-none leading-tight focus:outline-none focus:shadow-outline w-72 h-6 hover:cursor-pointer "
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      // onChange={passwordChangeHandler}
                    ></input>
                  </div>
                </div>
                {/* {errors.password && (
                  <span className="mt-1 text-sm text-red-500 ml-16">
                    {errors.password}
                  </span>
                )} */}
                <button
                  type="submit"
                  className=" active:scale-95 duration-200 w-3/4 ml-14 mt-4 bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer "
                >
                  Register
                </button>
                <div className="mt-2">
                  <span className="flex justify-center items-center">
                    Already have an account ?{" "}
                    <span className="text-blue-600 underline underline-offset-4 hover:cursor-pointer">
                      {" "}
                      <Link to="/login">Login</Link>
                    </span>
                  </span>
                </div>
                <div className="flex justify-evenly mt-3">
                  <div className="w-10 h-10 border border-gray-600 rounded flex justify-center hover:cursor-pointer">
                    <GoogleIcon className="mt-2" />
                  </div>
                  <div className="w-10 h-10 border border-gray-600 rounded flex justify-center hover:cursor-pointer">
                    <TwitterIcon className="mt-2" />
                  </div>
                  <div className="w-10 h-10 border border-gray-600 rounded flex justify-center hover:cursor-pointer">
                    <FacebookIcon className="mt-2" />
                  </div>
                  <div className="w-10 h-10 border border-gray-600 rounded flex justify-center hover:cursor-pointer">
                    <AppleIcon className="mt-2" />
                  </div>
                </div>
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

export default Register;
