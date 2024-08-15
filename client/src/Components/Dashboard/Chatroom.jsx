import React, { useState, useEffect, useRef } from "react";
import Avatar from "../../../src/assets/avatar.svg";
import { SlCallOut } from "react-icons/sl";
import { BsEmojiSmile } from "react-icons/bs";
import { FiSend } from "react-icons/fi";
import Profile from "../Pages/Profile";
import io from "socket.io-client";
import axios from "axios";
import Header2 from "../Landing_Page/Header2";
import logo from "../../../src/assets/live-chat.png";

const Chatroom = () => {
  const [showEmoji, setEmoji] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem("user:detail")));
  const [user, setUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [converstation, setConversation] = useState(null);
  const [receiverData, setRecieverData] = useState(null);
  const messageRef = useRef(null);
  const socket = useRef(null);
  const userDetails = JSON.parse(localStorage.getItem('user'));
  const [userData, setUserData] = useState(userDetails);
  const [singleSocketMessage, setSocketMessage] = useState('');
  const [typing, setTyping] = useState(false);
  const [typingSenderId, setTypingSenderId] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setUserData(storedUser);
      console.log("User data retrieved from localStorage:", storedUser);
    }
  }, []);

  useEffect(() => {
    socket.current = io('ws://localhost:8080'); // for connection purpose
    return () => {
      socket.current.disconnect(); // Disconnect socket when component unmounts
    };
  }, []);

  useEffect(() => {
    if (userData) {
      socket.current.emit("addUser", userData);
    }
  }, [userData]);

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const fetchConversations = async () => {
      const res = await axios(`http://localhost:8080/chats/${loggedInUser?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setConversations(res.data);
      console.log(res.data)
    };
    fetchConversations();
  }, [user]);

  useEffect(() => {
    if (user) {
      const axiosUsers = async () => {
        const res = await axios(`http://localhost:8080/users/${user.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const resData = await res.json();
        setUsers(resData);
      };
      axiosUsers();
    }
  }, [user]);

  const axiosMessages = async (e, chatId, receiver) => {
    e.preventDefault();
    const res = await axios(
      `http://localhost:8080/message/${chatId}?senderId=${user?.id}&&receiverId=${receiver?.receiverId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setConversation(chatId);
    setMessages(res.data);
    setRecieverData(receiver); // Ensure receiver data is set here
  };

  const sendMessageHandler = (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        sendMessage(e);
        console.log('Emitting stopTyping event');
        socket.current.emit('stopTyping', { receiverId: receiverData?.id });
    } else {
        console.log('Emitting typing event');
        socket.current.emit('typing', { receiverId: receiverData?.id });
    }
};

  const sendMessage = async (e) => {
    e.preventDefault();
    socket.current.emit("sendMessage", {
      senderId: userData?._id,
      receiverId: receiverData.id,
      text: message,
    });
    const data = { chatId: converstation, senderId: userDetails._id, message };
    const res = await axios.post('http://localhost:8080/message', data);
    setMessages((prev) => [...prev, res.data]);
    setMessage("");
  };

  
  useEffect(() => {
    socket.current.on('getMessage', data => {
      setSocketMessage({
        ...data,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    if (singleSocketMessage?.senderId === receiverData?.id) {
      setMessages((prev) => [...prev, singleSocketMessage]);
    }
  }, [singleSocketMessage, converstation]);

  useEffect(() => {
    socket.current.on('typing', ({ senderId }) => {
        console.log("User is typing...");
        setTyping(true);
        setTypingSenderId(senderId);
    });
    socket.current.on('stopTyping', ({ senderId }) => {
        console.log("User stopped typing...");
        setTyping(false);
        setTypingSenderId(senderId);
    });
}, []);

  return (
    <>
      <Header2 />
      <div className="w-full flex flex-col md:flex-row">
        <div className="w-full md:w-[25%] h-screen bg-[#cab1bd]">
          <div className="flex items-center my-6 mx-10 py-8 border-b border-gray-400">
            <div>
              <img
                src={Avatar}
                width={75}
                height={75}
                className="border p-[2px] rounded-full border-gray-600 cursor-pointer"
                onClick={() => setOpenDrawer(!openDrawer)}
              />
            </div>
            <div className="ml-8">
              <h3 className="text-3xl font-semibold">{user?.username}</h3>
              <p className="text-lg font-light">My Account</p>
            </div>
          </div>
          <Profile open={openDrawer} setOpen={setOpenDrawer} />
          <div className="mx-14 mt-10">
            <div className="text-primary text-lg">Messages</div>
            <div>
              {conversations &&
                conversations.map((data, idx) => (
                  <div
                    key={idx}
                    className="flex items-center py-8 border-b border-b-gray-300"
                  >
                    <div
                      className="cursor-pointer flex items-center"
                      onClick={(e) => {
                        setRecieverData(data.user);
                        axiosMessages(e, data.chatId, data.user);
                      }}
                    >
                      <div>
                        <img
                          src={Avatar}
                          className="w-[70px] h-[70px] rounded-full p-[2px] border border-gray-600"
                        />
                      </div>
                      <div className="ml-6">
                        <h3 className="text-lg font-semibold">{data.user.username}</h3>
                        <p className="text-sm font-light text-gray-600">{data.user.email}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="w-full md:w-[50%] h-screen bg-white flex flex-col items-center">
          {converstation && (
            <div className="w-full mt-0 bg-[#be95c4] h-[90px] flex items-center px-14 py-2">
              <div className="cursor-pointer mx-6">
                <img
                  src={Avatar}
                  width={70}
                  height={70}
                  className="rounded-full border border-gray-600"
                />
              </div>
              <div className="ml-5 mr-auto">
                <h3 className="text-2xl font-bold text-gray-900 py-1">{receiverData.username}</h3>
                <p className="text-lg font-light text-gray-700">{receiverData.email}</p>
              </div>
              <div className="cursor-pointer">
                <SlCallOut className="h-[30px] w-[30px]" />
              </div>
            </div>
          )}
          <div className="h-[75%] w-full overflow-y-scroll shadow-sm border-b">
            <div className="p-14">
              {messages?.length > 0 ? (
                messages.map((data, idx) => (
                  <div key={idx}>
                    <div
                      className={`max-w-[40%] rounded-b-xl p-4 mb-6 ${
                        receiverData?.id === data?.senderId
                          ? "bg-[#e5e5e5] rounded-tr-xl"
                          : "bg-[#fbb1bd] text-black rounded-tl-xl ml-auto"
                      }`}
                    >
                      {data.message}
                    </div>
                    <div ref={messageRef}></div>
                  </div>
                ))
              ) : (
                <div className="text-center text-lg font-semibold mt-24">
                  No Messages or No Conversation Selected
                </div>
              )}


             {console.log('Before typing indicator rendering')}
             {console.log('Typing:', typing)}
              {console.log('Sender ID:', typingSenderId)}
              {console.log('Receiver Data ID:', receiverData)}
              {console.log('Is typing sender ID equal to receiver ID:', typingSenderId === receiverData?.id)}
             {typing && (
            <div className="text-gray-600 text-sm h-6 w-4 mt-1 ml-2 p-1 rounded">
              Typing...
            </div>
            )}
           { console.log('After typing indicator rendering')}
            </div>
          </div>
          {converstation && (
            <div className="p-14 w-full flex items-center">
              <input
                type="text"
                value={message}
                onKeyDown={sendMessageHandler}
                onChange={(e) => {
                  setMessage(e.target.value);
                  socket.current.emit('typing', { receiverId: receiverData.id });
                }}
                onBlur={() => socket.current.emit('stopTyping', { receiverId: receiverData.id })}
                className="border w-full"
              />
              <FiSend onClick={sendMessage} className="ml-4 cursor-pointer" size={25} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chatroom;





// import React, { useState, useEffect, useRef } from "react";
// import Avatar from "../../../src/assets/avatar.svg";
// import { SlCallOut } from "react-icons/sl";
// import { BsEmojiSmile } from "react-icons/bs";
// import { FiSend } from "react-icons/fi";
// import Profile from "../Pages/Profile";
// import io from "socket.io-client";
// import axios from "axios";
// import Header2 from "../Landing_Page/Header2";
// import logo from "../../../src/assets/live-chat.png";

// const Chatroom = () => {
//   const [showEmoji, setEmoji] = useState(false);
//   const [openDrawer, setOpenDrawer] = useState(false);
//   const [user, setUser] = useState(null);
//   const [conversations, setConversations] = useState([]);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");
//   const [users, setUsers] = useState([]);
//   const [converstation, setConversation] = useState(null);
//   const [receiverData, setRecieverData] = useState(null);
//   const messageRef = useRef(null);
//   const socket = useRef(null);
//   const [userData, setUserData] = useState(null);
//   const [singleSocketMessage, setSocketMessage] = useState('');
//   const [typing, setTyping] = useState(false);
//   const [typingSenderId, setTypingSenderId] = useState(null);

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//       setUserData(storedUser);
//       console.log("User data retrieved from localStorage:", storedUser);
//     }
//   }, []);

//   useEffect(() => {
//     socket.current = io('ws://localhost:8080'); // for connection purpose
//     return () => {
//       socket.current.disconnect(); // Disconnect socket when component unmounts
//     };
//   }, []);

//   useEffect(() => {
//     if (userData) {
//       socket.current.emit("addUser", userData);
//     }
//   }, [userData]);

//   useEffect(() => {
//     messageRef?.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   useEffect(() => {
//     if (user) {
//       const fetchConversations = async () => {
//         const res = await axios(`http://localhost:8080/chats/${user._id}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         setConversations(res.data);
//       };
//       fetchConversations();
//     }
//   }, [user]);

//   useEffect(() => {
//     if (user) {
//       const axiosUsers = async () => {
//         const res = await axios(`http://localhost:8080/users/${user.id}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         const resData = await res.json();
//         setUsers(resData);
//       };
//       axiosUsers();
//     }
//   }, [user]);

//   const axiosMessages = async (e, chatId, receiver) => {
//     e.preventDefault();
//     const res = await axios(
//       `http://localhost:8080/message/${chatId}?senderId=${user.id}&&receiverId=${receiver.receiverId}`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     setConversation(chatId);
//     setMessages(res.data);
//     setRecieverData(receiver); // Ensure receiver data is set here
//   };

//   const sendMessageHandler = (e) => {
//     if (e.key === 'Enter') {
//         e.preventDefault();
//         sendMessage(e);
//         console.log('Emitting stopTyping event');
//         socket.current.emit('stopTyping', { receiverId: receiverData?.id });
//     } else {
//         console.log('Emitting typing event');
//         socket.current.emit('typing', { receiverId: receiverData?.id });
//     }
//   };

//   const sendMessage = async (e) => {
//     e.preventDefault();
//     socket.current.emit("sendMessage", {
//       senderId: userData?._id,
//       receiverId: receiverData.id,
//       text: message,
//     });
//     const data = { chatId: converstation, senderId: userDetails._id, message };
//     const res = await axios.post('http://localhost:8080/message', data);
//     setMessages((prev) => [...prev, res.data]);
//     setMessage("");
//   };

//   useEffect(() => {
//     socket.current.on('getMessage', data => {
//       setSocketMessage({
//         ...data,
//         createdAt: Date.now(),
//       });
//     });
//   }, []);

//   useEffect(() => {
//     if (singleSocketMessage?.senderId === receiverData?.id) {
//       setMessages((prev) => [...prev, singleSocketMessage]);
//     }
//   }, [singleSocketMessage, converstation]);

//   useEffect(() => {
//     socket.current.on('typing', ({ senderId }) => {
//         console.log("User is typing...");
//         setTyping(true);
//         setTypingSenderId(senderId);
//     });
//     socket.current.on('stopTyping', ({ senderId }) => {
//         console.log("User stopped typing...");
//         setTyping(false);
//         setTypingSenderId(senderId);
//     });
//   }, []);

//   return (
//     <>
//       <Header2 />
//       <div className="w-full flex flex-col md:flex-row">
//         <div className="w-full md:w-[25%] h-screen bg-[#cab1bd]">
//           <div className="flex items-center my-6 mx-10 py-8 border-b border-gray-400">
//             <div>
//               <img
//                 src={Avatar}
//                 width={75}
//                 height={75}
//                 className="border p-[2px] rounded-full border-gray-600 cursor-pointer"
//                 onClick={() => setOpenDrawer(!openDrawer)}
//               />
//             </div>
//             <div className="ml-8">
//               <h3 className="text-3xl font-semibold">{user?.username || "My Account"}</h3>
//               <p className="text-lg font-light">My Account</p>
//             </div>
//           </div>
//           <Profile open={openDrawer} setOpen={setOpenDrawer} />
//           <div className="mx-14 mt-10">
//             <div className="text-primary text-lg">Messages</div>
//             <div>
//               {conversations &&
//                 conversations.map((data, idx) => (
//                   <div
//                     key={idx}
//                     className="flex items-center py-8 border-b border-b-gray-300"
//                   >
//                     <div
//                       className="cursor-pointer flex items-center"
//                       onClick={(e) => {
//                         setRecieverData(data.user);
//                         axiosMessages(e, data.chatId, data.user);
//                       }}
//                     >
//                       <div>
//                         <img
//                           src={Avatar}
//                           className="w-[70px] h-[70px] rounded-full p-[2px] border border-gray-600"
//                         />
//                       </div>
//                       <div className="ml-6">
//                         <h3 className="text-lg font-semibold">{data.user.username}</h3>
//                         <p className="text-sm font-light text-gray-600">{data.user.email}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         </div>
//         <div className="w-full md:w-[50%] h-screen bg-white flex flex-col items-center">
//           {converstation && (
//             <div className="w-full mt-0 bg-[#be95c4] h-[90px] flex items-center px-14 py-2">
//               <div className="cursor-pointer mx-6">
//                 <img
//                   src={Avatar}
//                   width={70}
//                   height={70}
//                   className="rounded-full border border-gray-600"
//                 />
//               </div>
//               <div className="ml-5 mr-auto">
//                 <h3 className="text-2xl font-bold text-gray-900 py-1">{receiverData.username}</h3>
//                 <p className="text-lg font-light text-gray-700">{receiverData.email}</p>
//               </div>
//               <div className="cursor-pointer">
//                 <SlCallOut className="h-[30px] w-[30px]" />
//               </div>
//             </div>
//           )}
//           <div className="h-[75%] w-full overflow-y-scroll shadow-sm border-b">
//             <div className="p-14">
//               {messages?.length > 0 ? (
//                 messages.map((data, idx) => (
//                   <div key={idx}>
//                     <div
//                       className={`max-w-[40%] rounded-b-xl p-4 mb-6 ${
//                         receiverData?.id === data?.senderId
//                           ? "bg-[#e5e5e5] rounded-tr-xl"
//                           : "bg-[#7b5157] rounded-tl-xl text-white ml-auto"
//                       }`}
//                       ref={messageRef}
//                     >
//                       {data.message}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <div className="flex items-center justify-center h-full">
//                   <h3 className="text-gray-500 text-lg">No messages yet.</h3>
//                 </div>
//               )}
//               {typing && receiverData?.id === typingSenderId && (
//                 <div className="ml-2">
//                   <p className="text-gray-500 text-lg">Typing...</p>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="flex items-center w-full relative h-[10%] px-10 mt-auto">
//             <div className="absolute right-[85px] text-primary">
//               <BsEmojiSmile
//                 className="h-[30px] w-[30px]"
//                 onClick={() => setEmoji(!showEmoji)}
//               />
//             </div>
//             <div className="w-full h-[70px] flex items-center shadow-md px-8 rounded-3xl ml-3">
//               <input
//                 className="w-full outline-none"
//                 type="text"
//                 placeholder="Type your message here..."
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyPress={sendMessageHandler}
//               />
//               <div className="cursor-pointer" onClick={sendMessage}>
//                 <FiSend className="h-[30px] w-[30px]" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Chatroom;
