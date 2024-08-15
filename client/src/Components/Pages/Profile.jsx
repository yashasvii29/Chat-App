import React, { useState } from 'react'
import {Box, Drawer, Typography} from '@mui/material'
import { MdOutlineArrowBack } from "react-icons/md";
import Avatar from '../../../src/assets/avatar.svg';
import { BsCheck2, BsPencil } from 'react-icons/bs';

const Profile = ({open,setOpen}) => {
    const initialData = JSON.parse(localStorage.getItem('user'))
    
    const [userData, setUserData] = useState(initialData)
    const drawerstyle={
        left:20,
        top:17,
        height:'95%',
        width:'35%'
    }
    const handleClose=()=>{
        setOpen(false);
    }

    const [flag,setflag]=useState(false);
    const[username,setusername]=useState(null);
    const [aboutflag,setaboutflag]=useState(false);
    const[about,setabout]=useState(null);

    const handleflag=()=>{
        setusername(userData.username);
        setflag(true);
    }
    const handlecheck=(e)=>{
        setflag(false);
        setUserData(prevState => ({
            ...prevState,
            username: username
        }))
        
    }
    const handleaboutflag=()=>{
        setaboutflag(true);
    }
    const handleaboutcheck=()=>{
    setaboutflag(false);
    }
    const handlechange=(e)=>{
        
        setusername(e.target.value);
    }
6
    const handleaboutchange=(e)=>{
        setabout(e.target.value);
    }
  return (
    
            <Drawer open={open} onClose={handleClose} PaperProps={{sx:drawerstyle}} className='z-[1500]' >
            {/* upperportion */}
                <Box className='bg-[#e0b1cb] h-[107px] flex text-[#fefae0] '>
                    <div className='mt-auto p-[14px] flex items-center '>
                    <MdOutlineArrowBack  onClick={()=>setOpen(false)} className='cursor-pointer h-[30px] w-[30px] ml-4 my-1'/>
                    <h2 className='text-2xl  font-bold ml-6 '>Profile</h2>
                    </div>
                    
                </Box>

                {/* next portion */}
                
                <Box className='bg-[#ededed] h-[85%]'>
                    <Box className='flex justify-center'>
                        <img src={Avatar} alt='dp' className='w-[200px] h-[200px] border-[50%] rounded-full pt-[25px] pl-0 pr-0'></img>
                    </Box>
                   
                    <Box className='bg-white pt-[12px]  pr-[30px] pl-[30px] pb-[2px] shadow-2xl mt-8 '>
                    <h3 className='text-xl text-[#d1495b] font-light py-3'>Your Name</h3>
                    {
                        !flag && <div className='flex justify-between items-center'>
                        
                        <h2 className='mt-[14px] mb-[14px] text-[#4A4A4A]'>{userData.username || "Your name"}</h2>
                        <BsPencil onClick={handleflag} className='cursor-pointer text-2xl' />
                        </div>
                    }
                        {
                            flag && <div className='w-full flex justify-between items-center py-2'>
                                <input value={username} onChange={handlechange} className='w-[80%] outline-none border-b-2 border-blue-700 p-2' type='text' placeholder='Enter your name'/>
                                <BsCheck2 className='cursor-pointer text-2xl' onClick={handlecheck} />
                            </div>
                        }
                        
                    </Box>
                    <Box className='pt-[15px] pr-[20px] pb-[20px] pl-[30x] mt-4 mx-4'>
                        <h2 className='text-[#8696a0] text-lg'>This is not your username. This name will be visible to your connected people.</h2>
                    </Box>
                    <Box className='bg-white pt-[12px]  pr-[30px] pl-[30px] pb-[2px] shadow-2xl mt-6'>
                        <h3 className='text-xl text-[#d1495b] font-light'>About</h3>

                        {
                            !aboutflag && <div className='flex justify-between items-center'>
                                <h2 className='mt-[14px] mb-[14px] text-[#4A4A4A]'>{about || "About"}</h2>
                            <BsPencil onClick={handleaboutflag} className='cursor-pointer text-2xl' />
                            </div>

                        }
                         {
                            aboutflag && <div className='w-full flex justify-between items-center py-2'>
                                <input onChange={handleaboutchange} className='w-[80%] outline-none border-b-2 border-blue-700 p-2' type='text' placeholder='About yourself'/>
                                <BsCheck2 className='cursor-pointer text-2xl' onClick={handleaboutcheck} />
                            </div>
                        }
                    </Box>

                </Box>
    </Drawer>  
  )
}
export default Profile
//-----------------------------------------------------------------------------

// import React, { Fragment,useState } from 'react';
// import Modal from './Model';

// const Profile=()=>{
//        // Initialize state for user details
//    const [userDetails, setUserDetails] = useState({
//     name:'',
//     username: '',
//     dob:'',
//     bio: '',
//     gender:''
//   });

  
//   // handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setUserDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };


//   // handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
   
//   };

//   const [selectedImage, setSelectedImage] = useState(null);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onload = (e) => {
//         setSelectedImage(e.target.result);
//       };

//       reader.readAsDataURL(file);
//     }
//   };
//     const [showModal,setShowModal]=useState(false);
//     return(
//         <Fragment>
//         <div className="p-10 text-center ">
//             <button className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium text-sm rounded-lg px-5 py-2.5 text-center mr-5 'onClick={()=>setShowModal(true)}>
//                 Edit-profile
//             </button>

//         </div>
//         <Modal isVisible={showModal} onClose={()=>
//             setShowModal(false)
//         } >
//             <div className='font-abc py-6 px-6 lg:px-8 text-left'>
                
//                 {/* <h2 className='mb-4 text-xl font-medium text-gray-600 bg-gray-300'>Edit profile</h2> */}
             
//                 <div>
//             <h2 className='text-3xl font-abc text-gray-600 mb-4 p-0'>Edit Profile</h2>
//           </div>    
//                 <form onSubmit={handleSubmit} className='border-radius-2px'>
//                     <div className="flex flex-col items-left">
//                     <label htmlFor="imageInput" className="rounded-full h-20 w-20 border border-gray-300 overflow-hidden flex items-center justify-center">
//         {selectedImage ? (
//           <img
//             src={selectedImage}
//             alt="Profile"
//             className="h-full w-full object-cover "
//           />
//         ) : (
//           <div className="h-full w-full flex items-center justify-center bg-gray-100 text-gray-300 shadow-md" >
//             <span className="text-2xl flex items-center justify-center">+</span>
//           </div>
//         )}
//       </label>
//       <input
//         type="file"
//         id="imageInput"
//         accept="image/*"
//         onChange={handleImageChange}
//         className="hidden"
//       />
//     </div>
//     <div className="mb-4">
//           <label className="block text-gray-600 font-medium mb-2 text-sm ">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={userDetails.name}
//             onChange={handleInputChange}
//             className="w-full border rounded-md p-2 text-sm text-gray-700 border-none bottom-1 border-black background-none boxShadow-none focus-outline-none focus:ring focus:border-blue-500 items-left shadow-md "
//           />
//         </div>  
//         <div className="mb-4">
//           <label className="block text-gray-600 font-medium mb-2  text-sm">Username</label>
//           <input
//             type="text"
//             name="username"
//             value={userDetails.username}
//             onChange={handleInputChange}
//             className="w-full border rounded-md p-2 text-sm text-gray-700  focus:outline-none focus:ring  border-none borderBottom-1px solid #000 background-none boxShadow-none  focus:border-blue-500 items-left shadow-md "
//           />
//         </div>   
//         <div className="mb-4">
//           <label className="block text-gray-600 font-medium mb-2  text-sm">Date of Birth</label>
//           <input
//             type="date"
//             name="dob"
//             value={userDetails.dob}
//             onChange={handleInputChange}
//             className="w-full border rounded-md p-2 text-sm text-gray-700  focus:outline-none focus:ring  border-none borderBottom-1px solid #000 background-none boxShadow-none  focus:border-blue-500 shadow-md"
//             />
//             </div>
//             {/* <div className="mb-4">
//           <label className="block text-gray-600 font-medium mb-2 text-sm">Gender</label>
//           <input
//             type="text"
//             name="gender"
//             value={userDetails.gender}
//             onChange={handleInputChange}
//             className="w-full border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500 items-left shadow-md"
//           />
//         </div> */}
//         <div className="mb-4">
//               <label className="block text-gray-600 font-medium mb-2  text-sm">Bio</label>
//               <textarea
//                 name="bio"
//                 value={userDetails.bio}
//                 onChange={handleInputChange}
//                 className="w-full border rounded-md p-2 text-sm text-gray-700 focus:outline-none  border-none borderBottom-1px solid #000 background-none boxShadow-none  focus:ring focus:border-blue-500 shadow-md"
//               />
//             </div>
//             <button
              
//               type="submit"
//               className="w-full  bg-blue-700  text-white  hover:bg-blue-800 focus:ring-4  border-none borderBottom-1px solid #000 background-none boxShadow-none  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
//               Save
//             </button>  
        

//                 </form>
//          </div>
        
//         </Modal>
//         </Fragment>
        
//     );
    
// }
// export default Profile;