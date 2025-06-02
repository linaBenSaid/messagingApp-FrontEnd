import { Link } from "react-router-dom"
import io from "socket.io-client"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// const socket = io('http://localhost:5000');

function loginPage(){
    const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (userId.trim()) {
      localStorage.setItem('userId', userId);
      navigate('/');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter your username"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <button onClick={handleLogin} style={{ marginLeft: '1rem' }}>
        Login
      </button>
    </div>
  );
};
//     const [message, setMessage] = useState([]);
//     const userId = 2
//     const recipientId = 1
//     useEffect(() => {
//         socket.emit('login', userId);
//       }, [userId]);

//     useEffect(() => {
//         socket.on('receiveMessage', ({ from, message }) => {
//           console.log(message)
//         });
//       }, []);

//       const handleMessageSend = () => {
//         socket.emit('sendMessage', { from: userId, to: recipientId, message });
//       };

// return(
//     <>
//     <div className="navbar">
//         {/* <img src={proilePic} className="profilePic" /> */}
//     </div>
//     <div className='interface'>
//         <div className='messagesBoard'>
//         <input
//           type="text"
//           placeholder="Message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button onClick={handleMessageSend}>Send</button>
//         </div>

//     </div>
//     </>
//     )

// }
export default loginPage