import proilePic from './resize.jpg'
import './homePage.css'
import io from "socket.io-client"
import { useEffect, useState } from 'react';

const socket = io('http://localhost:5000');

function homeScreen(){
  const [message, setMessage] = useState('');
  const [to, setTo] = useState('');
  const [chat, setChat] = useState([]);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Connect and login when component mounts
    socket.emit('login', userId);

    // Listen for incoming messages
    socket.on('receiveMessage', ({ from, message }) => {
      setChat(prev => [...prev, { from, message }]);
    });

    // Cleanup on unmount
    return () => {
      socket.off('receiveMessage');
    };
  }, [userId]);

  const sendMessage = () => {
    if (message && to) {
      socket.emit('sendMessage', { from: userId, to, message });
      setChat(prev => [...prev, { from: 'You', message }]);
      setMessage('');
    }
  };

  return (
    <>
    <div className="navbar">
        {/* <img src={proilePic} className="profilePic" /> */}
    </div>
    <div className='interface'>
        <div className='messagesBoard'>
            <div className='messageText'>
                Messages
            </div>
            <div className='buttonsBoard'>
                buttons here
            </div>
            <div className='messagesBox'>
                {/* Messages placeholder */}
                <div className='message'>
                    <div className='pfp'>
                        <img src={proilePic} className="profilePic" />
                    </div>
                    <div className='content'>
                        <div className='titleContainer'>
                            <span className='name'>Lina ben said</span>
                            <span className='time'>11:55 AM</span>  
                        </div>
                        
                        <span className='message'>Here is your last message</span>
                    </div>

                </div>
            </div>
        </div>

    </div>
    </>
    // <div style={{ padding: '1rem' }}>
    //   <h2>Chat</h2>
    //   <div>
    //     <input
    //       placeholder="Send to user ID"
    //       value={to}
    //       onChange={(e) => setTo(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     <input
    //       placeholder="Your message"
    //       value={message}
    //       onChange={(e) => setMessage(e.target.value)}
    //     />
    //     <button onClick={sendMessage}>Send</button>
    //   </div>

    //   <div style={{ marginTop: '1rem' }}>
    //     <h4>Messages:</h4>
    //     <ul>
    //       {chat.map((msg, idx) => (
    //         <li key={idx}><strong>{msg.from}:</strong> {msg.message}</li>
    //       ))}
    //     </ul>
    //   </div>
    // </div>
  );
};
export default homeScreen