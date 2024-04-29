// import React, { useState,useEffect,useRef } from 'react'
// import Avatar from '../../../src/assets/avatar.svg';
// import { SlCallOut } from "react-icons/sl";
// import { BsEmojiSmile } from "react-icons/bs";
// import { FiMail, FiSend } from "react-icons/fi";
// import data from '@emoji-mart/data'
// import Picker from '@emoji-mart/react'
// import Profile from '../Pages/Profile';
// import io from 'socket.io-client';
// import axios from 'axios';


// const Chatroom = () => {
// 	// const [text,setText]=useState('');
// 	const [showEmoji,setEmoji]=useState(false);
// 	const [openDrawer, setOpenDrawer] = useState(false);
	
// 	const addEmoji=(e)=>{
// 		const symemo=e.unified.split("_");
// 		const newarr=[];
// 		symemo.forEach((ele)=>newarr.push("0x"+ele));
// 		const emoji=String.fromCodePoint(...newarr);
// 		setMessage(message+emoji);
// 	}
	
// 	//profile open functionn
// 	const handleDrawer = () => {
// 		setOpenDrawer(!openDrawer);
// 	};
// 	// const contacts=[
// 	// 	{
// 	// 		name:'Diya',
// 	// 		status:'Online',
// 	// 		img:Avatar
// 	// 	},
// 	// 	{
// 	// 		name:'Narendra',
// 	// 		status:'Online',
// 	// 		img:Avatar
// 	// 	},
// 	// 	{
// 	// 		name:'Tanya',
// 	// 		status:'Online',
// 	// 		img:Avatar
// 	// 	},
// 	// 	{
// 	// 		name:'Yashasvi',
// 	// 		status:'Online',
// 	// 		img:Avatar
// 	// 	},
// 	// 	{
// 	// 		name:'Sam',
// 	// 		status:'Online',
// 	// 		img:Avatar
// 	// 	},

// 	// ]
// 	const [user, setUser] = useState(JSON.parse(localStorage.getItem('user:detail')))
// 	const [conversations, setConversations] = useState([])
// 	const [messages, setMessages] = useState({})
// 	const [message, setMessage] = useState('')
// 	const [users, setUsers] = useState([])
// 	const [socket, setSocket] = useState(null)
// 	const messageRef = useRef(null)
// 	useEffect(() => {
// 		setSocket(io('http://localhost:8080'))
// 	}, [])

// 	useEffect(() => {
// 		socket?.emit('addUser', user?.id);
// 		socket?.on('getUsers', users => {
// 			console.log('activeUsers :>> ', users);
// 		})
// 		socket?.on('getMessage', data => {
// 			setMessages(prev => ({
// 				...prev,
// 				messages: [...prev.messages, { user: data.user, message: data.message }]
// 			}))
// 		})
// 	}, [socket])

// 	useEffect(() => {
// 		messageRef?.current?.scrollIntoView({ behavior: 'smooth' })
// 	}, [messages?.messages])

// 	useEffect(() => {
// 		const loggedInUser = JSON.parse(localStorage.getItem('user:detail'))
// 		const fetchConversations = async () => {
// 			const res = await axios(`http://localhost:8080/api/conversations/${loggedInUser?.id}`, {
// 				method: 'GET',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				}
// 			});
// 			const resData = await res.json()
// 			setConversations(resData)
// 		}
// 		fetchConversations()
// 	}, [])

// 	useEffect(() => {
// 		const axiosUsers = async () => {
// 			const res = await axios(`http://localhost:8080/api/users/${user?.id}`, {
// 				method: 'GET',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				}
// 			});
// 			const resData = await res.json()
// 			setUsers(resData)
// 		}
// 		axiosUsers()
// 	}, [])

// 	const axiosMessages = async (conversationId, receiver) => {
// 		const res = await axios(`http://localhost:8080/api/message/${conversationId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`, {
// 			method: 'GET',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			}
// 		});
// 		const resData = await res.json()
// 		setMessages({ messages: resData, receiver, conversationId })
// 	}

// 	const sendMessage = async (e) => {
// 		setMessage('')
// 		socket?.emit('sendMessage', {
// 			senderId: user?.id,
// 			receiverId: messages?.receiver?.receiverId,
// 			message,
// 			conversationId: messages?.conversationId
// 		});
// 		const res = await axios(`http://localhost:8080/api/message`, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify({
// 				conversationId: messages?.conversationId,
// 				senderId: user?.id,
// 				message,
// 				receiverId: messages?.receiver?.receiverId
// 			})
// 		});
// 	}

// 	return (

// 		// left side content with dummy data profile part
// 		<div className='w-screen flex'>
// 			<div className='w-[25%] h-screen bg-[#cab1bd] overflow-scroll'>
// 				<div className='flex items-center my-6 mx-10 py-8 border-b border-gray-400'>
// 					<div><img src={Avatar} width={75} height={75} className='border p-[2px] rounded-full border-gray-600 cursor-pointer ' onClick={() => handleDrawer()} /></div>
// 					<div className='ml-8'>
// 						<h3 className='text-3xl font-semibold'>{user?.fullName}</h3>
// 						<p className='text-lg font-light'>My Account</p>
// 					</div>
					
// 				</div>
// 				<Profile open={openDrawer} setOpen={setOpenDrawer}/>
				
// 				{/* showing messages 				 */}
// 				<div className='mx-14 mt-10'>
// 					<div className='text-primary text-lg'>Messages</div>
// 					<div>
// 						{
// 							conversations.map(({conversationId,img})=>{
// 								return (
									
// 									<div className='flex items-center py-8 border-b border-b-gray-300'>
// 									<div className='cursor-pointer flex items-center' onClick={() => axiosMessages(conversationId, user)}>
// 										<div><img src={img} className="w-[70px] h-[70px] rounded-full p-[2px] border border-gray-600" /></div>
// 										<div className='ml-6'>
// 											<h3 className='text-lg font-semibold'>{user?.fullName}</h3>
// 											<p className='text-sm font-light text-gray-600'>{user?.email}</p>
// 										</div>
// 									</div>
// 								</div>
							

// 								)
// 							})
// 						}			
// 					</div>
// 				</div>
// 			</div>
// 			{/* center part chat area main */}
// 			<div className='w-[50%] h-screen bg-white flex flex-col items-center'>
// 			{
// 				messages?.receiver?.fullName &&
// 				<div className='w-[100%] mt-0 bg-[#be95c4] h-[90px] my-14  flex items-center px-14 py-2'>
// 						<div className='cursor-pointer  mx-6 p-auto'><img src={Avatar} width={70} height={70} className="rounded-full border border-gray-600" /></div>
// 						<div className='ml-5 mr-auto'>
// 							<h3 className='text-2xl font-bold text-gray-900 py-1 '>Diya</h3>
// 							<p className='text-lg font-light text-gray-700'>Online</p>
// 						</div>
// 						<div className='cursor-pointer '>
// 						<SlCallOut className='h-[30px] w-[30px] '/>
						
// 						</div>
// 					</div>
						
// 			}
				
					
// 				<div className='h-[75%] w-full overflow-y-scroll shadow-sm border-b'>
// 					<div className='p-14'>{
// 						messages?.messages?.length > 0 ?
// 						messages.messages.map(({message,user:{id}={}})=>{
// 							return(
// 								<>
// 								<div className={`max-w-[40%] rounded-b-xl p-4 mb-6 ${id === user?.id ? 'bg-[#fbb1bd]  text-black rounded-tl-xl ml-auto' : 'bg-[#e5e5e5] rounded-tr-xl'} `}>{message}</div>
// 										<div ref={messageRef}></div>
// 								</>
// 							)
// 						}) 
// 						: <div className='text-center text-lg font-semibold mt-24'>No Messages or No Conversation Selected</div>
// 					}
						
// 					</div>
// 				</div>

// 				{
// 					messages?.receiver?.fullName &&
// 					<div className='p-14 w-full flex items-center'>
// 						<input type='text' value={message} onChange={(e)=>setMessage(e.target.value)} placeholder='Type your message...' className='w-[80%] bg-gray-50 border-0 border-gray-300  text-gray-900 text-sm rounded-full focus:ring-0 focus:border-0 outline-none p-4 shadow-md'></input>
						
// 						<div className={`ml-4 p-2 cursor-pointer bg-light rounded-full relative`} >
// 						<BsEmojiSmile className='h-[30px] w-[30px] hover:text-gray-400' onClick={()=>setEmoji(!showEmoji)} />
// 						{
// 							showEmoji &&
// 							<div className='absolute bottom-[100%] right-2'>
// 							<Picker data={data} maxFrequentRows={0}  onEmojiSelect={addEmoji} />
// 						</div>
// 						}
						
// 						</div>
						
// 						<div className={`ml-4 p-2 cursor-pointer bg-light rounded-full `}>
// 						<FiSend className='h-[30px] w-[30px]' />
// 						</div>
// 					</div>

// 				}
				
					
				
// 			</div>

// 			{/* right side content ke liye */}
// 			{/* <div className='w-[25%] h-screen bg-light px-8 py-16 overflow-scroll'>
				
// 			</div> */}
// 		</div>
// 	)
// }

// export default Chatroom


import React, { useState,useEffect } from 'react'
import Avatar from '../../../src/assets/avatar.svg';
import io from 'socket.io-client';
import { SlCallOut } from "react-icons/sl";
import { BsEmojiSmile } from "react-icons/bs";
import { FiMail, FiSend } from "react-icons/fi";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import Profile from '../Pages/Profile';


const Chatroom = () => {
	const [text,setText]=useState('');
	const [showEmoji,setEmoji]=useState(false);
	const [openDrawer, setOpenDrawer] = useState(false);
	const [socket, setSocket] = useState(null);
	
	const addEmoji=(e)=>{
		const symemo=e.unified.split("_");
		const newarr=[];
		symemo.forEach((ele)=>newarr.push("0x"+ele));
		const emoji=String.fromCodePoint(...newarr);
		setText(text+emoji);
	}
	
	//profile open functionn
	const handleDrawer = () => {
		setOpenDrawer(!openDrawer);
	  };
	const contacts=[
		{
			name:'Diya',
			status:'Online',
			img:Avatar
		},
		{
			name:'Narendra',
			status:'Online',
			img:Avatar
		},
		{
			name:'Tanya',
			status:'Online',
			img:Avatar
		},
		{
			name:'Yashasvi',
			status:'Online',
			img:Avatar
		},
		{
			name:'Sam',
			status:'Online',
			img:Avatar
		},

	]
	useEffect(() => {
        setSocket(io('http://localhost:8080')); // Replace with your server URL
    }, []);

	useEffect(() => {
    socket?.on('connect', () => {
        console.log('Connected to server');
    });

    socket?.on('disconnect', () => {
        console.log('Disconnected from server');
    });

    // Add listeners for other events and emit events as needed

    return () => {
        socket?.disconnect();
    };
}, [socket]);

	return (

		// left side content with dummy data profile part
		<div className='w-screen flex'>
			<div className='w-[25%] h-screen bg-[#e0e1dd] overflow-scroll'>
				<div className='flex items-center my-6 mx-10 py-8 border-b border-gray-400'>
					<div><img src={Avatar} width={75} height={75} className='border p-[2px] rounded-full border-gray-600 cursor-pointer ' onClick={() => handleDrawer()} /></div>
					<div className='ml-8'>
						<h3 className='text-3xl font-semibold'>Spark Chat</h3>
						<p className='text-lg font-light'>My Account</p>
					</div>
					
				</div>
				<Profile open={openDrawer} setOpen={setOpenDrawer}/>
				
				{/* showing messages 				 */}
				<div className='mx-14 mt-10'>
					<div className='text-primary text-lg'>Messages</div>
					<div>
						{
							contacts.map(({name,status,img})=>{
								return (
									
									<div className='flex items-center py-8 border-b border-b-gray-300'>
									<div className='cursor-pointer flex items-center' >
										<div><img src={img} className="w-[70px] h-[70px] rounded-full p-[2px] border border-gray-600" /></div>
										<div className='ml-6'>
											<h3 className='text-lg font-semibold'>{name}</h3>
											<p className='text-sm font-light text-gray-600'>{status}</p>
										</div>
									</div>
								</div>
							

								)
							})
						}
								
								
								
						
					</div>
				</div>
			</div>
			{/* center part chat area main */}
			<div className='w-[50%] h-screen bg-white flex flex-col items-center'>
				
					<div className='w-[100%] mt-0 bg-[#a08d9f] h-[90px] my-14  flex items-center px-14 py-2'>
						<div className='cursor-pointer  mx-6 p-auto'><img src={Avatar} width={70} height={70} className="rounded-full border border-gray-600" /></div>
						<div className='ml-5 mr-auto'>
							<h3 className='text-2xl font-bold text-gray-900 py-1 '>Diya</h3>
							<p className='text-lg font-light text-gray-700'>Online</p>
						</div>
						<div className='cursor-pointer '>
						<SlCallOut className='h-[30px] w-[30px] '/>
						
						</div>
					</div>
						{/* chat ka content ke liye */}
				<div className='h-[75%] w-full overflow-y-scroll shadow-sm border-b'>
					<div className='p-14'>
						<div className=' max-w-[40%] bg-[#f5f1ed] rounded-b-xl rounded-tr-xl shadow-lg p-4 mb-6'>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						</div>
						<div className=' max-w-[40%] bg-[#fbb1bd] rounded-b-xl rounded-tr-xl shadow-lg ml-auto p-4  mb-6'>
						Lorem ipsum dolor sit amet.
						</div>

						<div className=' max-w-[40%] bg-[#f5f1ed] rounded-b-xl rounded-tr-xl shadow-lg p-4 mb-6'>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						</div>
						<div className='max-w-[40%] bg-[#fbb1bd] rounded-b-xl rounded-tr-xl shadow-lg ml-auto p-4  mb-6'>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						</div>

						<div className=' max-w-[40%] bg-[#f5f1ed] rounded-b-xl rounded-tr-xl shadow-lg p-4 mb-6'>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						</div>
						<div className='max-w-[40%] bg-[#fbb1bd] rounded-b-xl rounded-tr-xl shadow-lg ml-auto p-4 text-black mb-6'>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						</div>

						<div className=' max-w-[40%] bg-[#f5f1ed] rounded-b-xl rounded-tr-xl shadow-lg p-4 mb-6'>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						</div>
						<div className=' max-w-[40%] bg-[#fbb1bd] rounded-b-xl rounded-tr-xl shadow-lg ml-auto p-4  mb-6'>
						Lorem ipsum dolor sit amet.
						</div>

						<div className=' max-w-[40%] bg-[#f5f1ed] rounded-b-xl rounded-tr-xl shadow-lg p-4 mb-6'>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						</div>
						<div className='max-w-[40%] bg-[#fbb1bd] rounded-b-xl rounded-tr-xl shadow-lg ml-auto p-4  mb-6'>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						</div>

						<div className=' max-w-[40%] bg-[#f5f1ed] rounded-b-xl rounded-tr-xl shadow-lg p-4 mb-6'>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						</div>
						<div className='max-w-[40%] bg-[#fbb1bd] rounded-b-xl rounded-tr-xl shadow-lg ml-auto p-4 text-black mb-6'>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit.
						</div>

						
					</div>
				</div>
				
					<div className='p-14 w-full flex items-center'>
						<input type='text' value={text} onChange={(e)=>setText(e.target.value)} placeholder='Type your message...' className='w-[80%] bg-gray-50 border-0 border-gray-300  text-gray-900 text-sm rounded-full focus:ring-0 focus:border-0 outline-none p-4 shadow-md'></input>
						
						<div className="ml-4 p-2 cursor-pointer bg-light rounded-full relative" >
						<BsEmojiSmile className='h-[30px] w-[30px] hover:text-gray-400' onClick={()=>setEmoji(!showEmoji)} />
						{
							showEmoji &&
							<div className='absolute bottom-[100%] right-2'>
							<Picker data={data} maxFrequentRows={0}  onEmojiSelect={addEmoji} />
						</div>
						}
						
						</div>
						
						<div className={`ml-4 p-2 cursor-pointer bg-light rounded-full `}>
						<FiSend className='h-[30px] w-[30px]' />
						</div>
					</div>
				
			</div>

			{/* right side content ke liye */}
			<div className='w-[25%] h-screen bg-light px-8 py-16 overflow-scroll'>
				
			</div>
		</div>
	)
}

export default Chatroom