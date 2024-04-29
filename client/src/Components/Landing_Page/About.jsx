import React from 'react'
import Header from './Header'

function About() {
  return (
    <>
    <Header />
    <div className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="w-full md:max-w-4xl bg-purple-200 rounded-lg shadow-lg p-8 mx-4 md:mx-auto">
        <h2 className="text-3xl font-semibold mb-4">About Our Chat App</h2>
        <p className="text-lg text-gray-800 mb-6">
          Welcome to our chat application! We are dedicated to providing a seamless and enjoyable communication experience for users worldwide.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Our chat app is designed with modern features to meet the diverse needs of our users. Whether you're chatting one-on-one or in a group, sharing photos, videos, or documents, our app ensures smooth and reliable communication.
        </p>
        <h3 className="text-xl font-semibold mb-2">Key Features:</h3>
        <ul className="list-disc ml-6 mb-6">
          <li>Real-time messaging</li>
          <li>Group chats</li>
          <li>End-to-end encryption for privacy</li>
          <li>Customizable user profiles</li>
          <li>Emoji and sticker support</li>
          {/* <li>Message search and archiving</li>
          <li>Dark mode for comfortable viewing at night</li> */}
          {/* Add more features */}
        </ul>
        <p className="text-lg text-gray-700 mb-6">
          Our dedicated team is continuously working to improve the app and bring new features to enhance your chatting experience.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          Version: 1.1.1
        </p>
        <p className="text-lg text-gray-700">
          For any questions, feedback, or support inquiries, please contact us at support@chatapp.com.
        </p>
      </div>
    </div>
    </>
  )
}

export default About
