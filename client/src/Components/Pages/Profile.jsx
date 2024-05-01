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