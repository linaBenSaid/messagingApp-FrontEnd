import proilePic from './resize.jpg'
import './homePage.css'
import io from "socket.io-client"
import { useEffect, useRef, useState } from 'react';

const socket = io('http://localhost:5000');

function homeScreen(){
  const [message, setMessage] = useState('');
  const [to, setTo] = useState('');
  const [chat, setChat] = useState([]);

  const messagesEndRef = useRef(null);

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    socket.emit('login', userId);

    //listen for incoming messages
    socket.on('receiveMessage', ({ from, message, timestamp }) => {
      setChat(prev => [...prev, { from, message, timestamp }]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [userId]);

  const sendMessage = () => {
    if (message && to) {
      const timestamp = new Date().toISOString();

  const msgData = {
    from: userId,
    to,
    message,
    timestamp,
  };

  //send message
  socket.emit('sendMessage', msgData);

  //update UI
  setChat(prev => [...prev, {
    from: userId,
    message,
    timestamp,
  }]);

  //clear message input
  setMessage(''); 
    }
  };

  // runs every time a new message is added
  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });}, [chat]); 

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
                new msg | online friends | friends list
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
                        
                        <span className='messageContaint'>Here is your last message</span>
                    </div>

                </div>
            </div>
        </div>
          <div className='convoContainer' style={{
    
  }}>
            <div className='msgsContainer'>
              {chat.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: msg.from === userId ? 'flex-end' : 'flex-start',
                  marginBottom: '0.5rem'
                }}
              >
                <div style={{
                  background: msg.from === userId ? '#dcf8c6' : '#eee',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  maxWidth: '60%',
                }}>
                  <div>{msg.message}</div>
                  <div style={{ fontSize: '0.7rem', textAlign: 'right' }}>
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
            </div>
            <div className='msgInput'>
              <div>
              <input type="text" name="" value={message} onChange={(e) => setMessage(e.target.value)} id="" placeholder='Enter message...' />
              </div>
              <input type="text" name="" id="" value={to} onChange={(e) => setTo(e.target.value)} placeholder='Enter message...' />
              <button onClick={sendMessage}>Send</button>
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