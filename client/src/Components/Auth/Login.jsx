// import React, { useState } from "react";
// import PersonIcon from "@mui/icons-material/Person";
// import LockIcon from "@mui/icons-material/Lock";
// // import GoogleIcon from "@mui/icons-material/Google";
// // import TwitterIcon from "@mui/icons-material/Twitter";
// // import FacebookIcon from "@mui/icons-material/Facebook";
// // import AppleIcon from "@mui/icons-material/Apple";
// import chatimg from "../../assets/chatting.jpg";
// import axios from "axios";
// import { Link } from "react-router-dom";

// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   let [email, setEmail] = useState("");
//   let [password, setPassword] = useState("");

//   const navigate = useNavigate("");

//   async function loginUser(data) {
//     try {
//       const res = await axios.post("http://localhost:8080/login", data);
//       console.log(res.data.data.userDBInfo);
//       localStorage.setItem('username',res.data.data.userDBInfo.username)
//       localStorage.setItem('email',res.data.data.userDBInfo.email)
//       localStorage.setItem('user',JSON.stringify(res.data.data.userDBInfo))
//       navigate("/chatroom");
//     }
//     catch (error) {
//       console.log("Error in login user:", error.message);
//       navigate("/login");
//     }
//   }
//   const onSubmitHandler = (e) => {
//     e.preventDefault();
//     console.log(email,password);
//     loginUser({ email, password });
//   };

//   return (
//     <div>
//       <div className="h-screen bg-white w-full flex justify-center items-center">
//         <div className="w-5/6 h-5/6  bg-[#f7cad0] flex justify-center items-center rounded-xl  ">
//           <div className="w-5/6 h-5/6 bg-[#edafb8] rounded-2xl flex items-center">
//             <div className="w-2/4 h-5/6 my-16 ml-8 bg-white  rounded-3xl">
//               <h1 className="text-center p-2 text-xl font-medium">Login</h1>
//               <form onSubmit={ onSubmitHandler}>
//                 <div className="mt-5 flex justify-center items-center">
//                   <div className=" border-2 border-blue-200 rounded w-70 py-2 px-6 text-gray-700 hover:cursor-pointer">
//                     <PersonIcon className="pr-2" />
//                     <input
//                        className="appearance-none leading-tight focus:outline-none w-72 h-6 hover:cursor-pointer  "
//                       type="email"
//                       id="email"
//                       name="email"
//                       placeholder="example@gmail.com"
//                       value={email} 
//                       onChange={e => setEmail(e.target.value)}
//                       required
//                     ></input>
//                   </div>
//                 </div>
//                 <div className="mt-5 flex justify-center items-center">
//                   <div className=" border-2 rounded w-70 py-2 px-6 text-gray-700 hover:cursor-pointer">
//                     <LockIcon className="pr-2" />
//                     <input
//                       className="appearance-none leading-tight focus:outline-none focus:shadow-outline w-72 h-6 bg-white "
//                       id="password"
//                       name="password"
//                       type="password"
//                       placeholder="Password"
//                       value={password} 
//                       onChange={e => setPassword(e.target.value)}
//                       required
//                     ></input>
//                   </div>
//                 </div>
//                 <div className="ml-16 flex ">
              
                  
//                 </div>
//                 <button
//                   type="submit"
//                   className=" active:scale-95 duration-200  w-3/4 ml-14 mt-8 bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer"
//                 >
//                   Login
//                 </button>
//                 <div className="mt-6">
//                   <span className="flex justify-center items-center">
//                     No Account yet ?{" "}
//                     <span className="text-blue-600 underline underline-offset-4 hover:cursor-pointer">
//                       {" "}
//                       <Link to="/register">Register</Link>
//                     </span>
//                   </span>
//                 </div>
                
//               </form>
//             </div>
//               <div className="w-2/4 h-3/6 ml-12 mr-8 flex items-center rounded-3xl">
//                   <img className="rounded-3xl" src={chatimg} alt=""></img>
//                  </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import chatimg from "../../assets/chatting.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate("");

  async function loginUser(data) {
    try {
      const res = await axios.post("http://localhost:8080/login", data);
      console.log(res.data.data.userDBInfo);
      localStorage.setItem('username', res.data.data.userDBInfo.username);
      localStorage.setItem('email', res.data.data.userDBInfo.email);
      localStorage.setItem('user', JSON.stringify(res.data.data.userDBInfo));
      navigate("/chatroom");
    } catch (error) {
      console.log("Error in login user:", error.message);
      navigate("/login");
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(email, password);
    loginUser({ email, password });
  };

  return (
    <div className="min-h-screen bg-purple-200 flex justify-center items-center">
      <div className="w-full max-w-4xl h-full md:h-5/6 bg-[#f7cad0] flex flex-col md:flex-row justify-center items-center rounded-xl p-4 md:p-8">
        <div className="w-full md:w-1/2 h-full md:h-5/6 bg-[#edafb8] rounded-2xl flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 md:p-8">
            <h1 className="text-center text-xl font-medium">Login</h1>
            <form onSubmit={onSubmitHandler}>
              <div className="mt-5 flex justify-center items-center">
                <div className="border-2 border-blue-200 rounded w-full py-2 px-4 text-gray-700 flex items-center">
                  <PersonIcon className="pr-2" />
                  <input
                    className="appearance-none leading-tight focus:outline-none w-full h-6"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mt-5 flex justify-center items-center">
                <div className="border-2 rounded w-full py-2 px-4 text-gray-700 flex items-center">
                  <LockIcon className="pr-2" />
                  <input
                    className="appearance-none leading-tight focus:outline-none w-full h-6 bg-white"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Login
              </button>
              <div className="mt-6 text-center">
                <span>
                  No Account yet?{" "}
                  <span className="text-blue-600 underline">
                    <Link to="/register">Register</Link>
                  </span>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div className="w-full md:w-1/2 h-full md:h-5/6 flex items-center justify-center p-4 md:p-8">
          <img className="rounded-3xl w-full h-full object-cover" src={chatimg} alt="Chatting" />
        </div>
      </div>
    </div>
  );
};

export default Login;

