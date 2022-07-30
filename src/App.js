//import logo from './logo.svg';
import "./App.css";
import React from "react";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
//import { setPusherClient } from 'react-pusher';
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import axios from "./axios";


function App() {
  const [messages, setMessages ] = useState([]);


  useEffect(() => {
    axios.get("/messages/sync").then((response) => {
    setMessages(response.data);
    });
    
  }, []);

  useEffect(() => {
    const pusher = new Pusher('4ecd1ebaf6f4150ab80d', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe("messages");
    channel.bind('inserted', (newMessage) => {
      //alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
      <div className="app__body">
    <Sidebar/>
    <Chat messages={messages} />
    </div>
  </div>
  );
}

export default App;
