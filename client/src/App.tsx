import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Chat from './components/chat/Chat';
import Home from './components/home';

function App() {
  return (
    <div className="App">
      
      <Routes>
     <Route path="/" element={<Home/>} />
      <Route path="/chats" element={<Chat/>}/>
      </Routes>
    </div>
  );
}

export default App;
