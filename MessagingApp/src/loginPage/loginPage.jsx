import { Link } from "react-router-dom"
import io from "socket.io-client"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// const socket = io('http://localhost:5000');

function loginPage(){
    const [userId, setUserId] = useState('');
    const [password , setPassword] = useState('');
  
    const navigate = useNavigate();

  const handleLogin = async() => {
    
    if(userId.trim()){
      try{
        
        const headers = {
          'Content-Type' : 'application/json'
        }

        const body = {
          username: userId,
          password: password
        }

        const response = await fetch("http://localhost:3000/auth/login" , {
          method: 'Post',
          headers: headers,
          body: JSON.stringify(body)
        })

        if(!response.ok) throw new Error('invalid username')
        else{
          const data = await response.json()

          //stocker userId dans localstorage
          // localStorage.setItem('userId', data.userId);

          const { access_token } = data;
          document.cookie = `token=${access_token}; path=/; secure`;
          navigate('/');
        }     
    } catch (err) 
    {
      alert('Login failed');
    }
    }
    
    
    // old code 
    // if (userId.trim()) {
    //   localStorage.setItem('userId', userId);
    //   navigate('/');
    // }
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
      <input
        type="text"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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