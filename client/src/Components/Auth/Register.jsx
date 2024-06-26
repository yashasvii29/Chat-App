// import React, { useState } from "react";
// import PersonIcon from "@mui/icons-material/Person";
// import LockIcon from "@mui/icons-material/Lock";
// import EmailIcon from "@mui/icons-material/Email";
// import PortraitIcon from '@mui/icons-material/Portrait';
// import ManIcon from '@mui/icons-material/Man';
// import chatimg from "../../assets/chatting.jpg";
// import axios from "axios";
// import { Link,useNavigate} from "react-router-dom";

// const Register = () => {
  
//   let navigate = useNavigate();
//   let [username,setUsername] = useState("");
//   let [password,setPassword] = useState("");
//   let [email,setEmail] = useState("");
//   let [gender,setGender] = useState("");
//   let [profilePic,setProfilePic] = useState("");
  

//   const onSubmitHandler = (e) => {
//     e.preventDefault();
//     console.log({username,password,gender,email,profilePic});
//     registerUser({ username, password, gender, email,profilePic });
//   }

//   async function registerUser(data){
//     try{
//       const res =  await axios.post("http://localhost:8080/register", data);
//       console.log(res);
//       navigate("/chatroom");
//     }
//     catch(e){
//       console.log("Error in registration : ",e.message);
//       navigate("/register");
//     }
//   }
//   return (
//     <div>
//       <div className="h-screen bg-white w-full flex justify-center items-center novalidate">
//       <div className="w-5/6 h-5/6  bg-[#f7cad0] flex justify-center items-center rounded-xl  ">
//           <div className="w-5/6 h-5/6 bg-[#edafb8] rounded-2xl flex items-center">  
//             <div className="w-2/4 my-16 ml-8 bg-white  rounded-3xl">
//               <h1 className="text-center p-2 text-xl font-medium">Register</h1>
//               <form onSubmit={onSubmitHandler} >
//                 <div className="mt-5 flex justify-center items-center ">
//                   <div className=" border-2 border-blue-200 rounded w-70 py-2 px-6 text-gray-700 ">
//                     <PersonIcon className="pr-2" />
//                     <input
//                       className="appearance-none leading-tight focus:outline-none w-72 h-6 hover:cursor-pointer "
//                       id="username"
//                       name="username"
//                       type="text"
//                       placeholder="Username"
//                       value={username} 
//                       onChange={e => setUsername(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>
                
//                 <div className="mt-4 flex justify-center items-center ">
//                   <div className=" border-2 border-blue-200 rounded w-70 py-2 px-6 text-gray-700  ">
//                     <EmailIcon className="pr-2" />
//                     <input
//                       className="appearance-none leading-tight focus:outline-none w-72 h-6 hover:cursor-pointer  "
//                       type="email"
//                       id="email"
//                       name="email"
//                       placeholder="example@gmail.com"
//                       value={email} 
//                       onChange={e => setEmail(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-4 flex justify-center items-center ">
//                   <div className=" border-2 border-blue-200 rounded w-70 py-2 px-6 text-gray-700">
//                     <LockIcon className="pr-2" />
//                     <input
//                       className="appearance-none leading-tight focus:outline-none focus:shadow-outline w-72 h-6 hover:cursor-pointer "
//                       id="password"
//                       name="password"
//                       type="password"
//                       placeholder="Password"
//                       value={password} 
//                       onChange={e => setPassword(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-4 flex justify-center items-center ">
//                   <div className=" border-2 border-blue-200 rounded w-70 py-2 px-6 text-gray-700">
//                     <ManIcon className="pr-2" />
//                     <input
//                       className="appearance-none leading-tight focus:outline-none focus:shadow-outline w-72 h-6 hover:cursor-pointer "
//                       id="gender"
//                       name="gender"
//                       type="gender"
//                       placeholder="gender"
//                       value={gender} 
//                       onChange={e => setGender(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-4 flex justify-center items-center ">
//                   <div className=" border-2 border-blue-200 rounded w-70 py-2 px-6 text-gray-700">
//                     <PortraitIcon className="pr-2" />
//                     <input
//                       className="appearance-none leading-tight focus:outline-none focus:shadow-outline w-72 h-6 hover:cursor-pointer "
//                       id="profilePic"
//                       name="profilePic"
//                       type="file"
//                       placeholder=" choose profilePic"
//                       value={profilePic} 
//                       onChange={e => setProfilePic(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div>
//                 </div>
                  
                
                   
//                 <button
//                   type="submit"
//                   className=" active:scale-95 duration-200 w-3/4 ml-14 mt-4 bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded hover:cursor-pointer "
//                 >
//                   Register
//                 </button>
//                 <div className="mt-2 mb-2">
//                   <span className="flex justify-center items-center">
//                     Already have an account ?{" "}
//                     <span className="text-blue-600 underline underline-offset-4 hover:cursor-pointer">
//                       {" "}
//                       <Link to="/login">Login</Link>
//                     </span>
//                   </span>
//                 </div>

//               </form>
//             </div>
//             <div className="w-2/4 h-3/6 ml-12 mr-8 flex items-center rounded-3xl">
//               <img className="rounded-3xl" src={chatimg} alt=""></img>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import PortraitIcon from "@mui/icons-material/Portrait";
import ManIcon from "@mui/icons-material/Man";
import chatimg from "../../assets/chatting.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [profilePic, setProfilePic] = useState("");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log({ username, password, gender, email, profilePic });
    registerUser({ username, password, gender, email, profilePic });
  };

  async function registerUser(data) {
    try {
      const res = await axios.post("http://localhost:8080/register", data);
      console.log(res);
      navigate("/chatroom");
    } catch (e) {
      console.log("Error in registration: ", e.message);
      navigate("/register");
    }
  }

  return (
    <div className="min-h-screen bg-purple-200  flex justify-center items-center">
      <div className="w-full max-w-4xl h-full md:h-5/6 bg-[#f7cad0] flex flex-col md:flex-row justify-center items-center rounded-xl p-4 md:p-8">
        <div className="w-full md:w-1/2 h-full md:h-5/6 bg-[#edafb8] rounded-2xl flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 md:p-8">
            <h1 className="text-center text-xl font-medium">Register</h1>
            <form onSubmit={onSubmitHandler}>
              <div className="mt-5 flex justify-center items-center">
                <div className="border-2 border-blue-200 rounded w-full py-2 px-4 text-gray-700 flex items-center">
                  <PersonIcon className="pr-2" />
                  <input
                    className="appearance-none leading-tight focus:outline-none w-full h-6"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-center items-center">
                <div className="border-2 border-blue-200 rounded w-full py-2 px-4 text-gray-700 flex items-center">
                  <EmailIcon className="pr-2" />
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
              <div className="mt-4 flex justify-center items-center">
                <div className="border-2 border-blue-200 rounded w-full py-2 px-4 text-gray-700 flex items-center">
                  <LockIcon className="pr-2" />
                  <input
                    className="appearance-none leading-tight focus:outline-none w-full h-6"
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
              <div className="mt-4 flex justify-center items-center">
                <div className="border-2 border-blue-200 rounded w-full py-2 px-4 text-gray-700 flex items-center">
                  <ManIcon className="pr-2" />
                  <input
                    className="appearance-none leading-tight focus:outline-none w-full h-6"
                    id="gender"
                    name="gender"
                    type="text"
                    placeholder="Gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-center items-center">
                <div className="border-2 border-blue-200 rounded w-full py-2 px-4 text-gray-700 flex items-center">
                  <PortraitIcon className="pr-2" />
                  <input
                    className="appearance-none leading-tight focus:outline-none w-full h-6"
                    id="profilePic"
                    name="profilePic"
                    type="file"
                    onChange={(e) => setProfilePic(e.target.value)}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Register
              </button>
              <div className="mt-6 text-center">
                <span>
                  Already have an account?{" "}
                  <span className="text-blue-600 underline">
                    <Link to="/login">Login</Link>
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

export default Register;

