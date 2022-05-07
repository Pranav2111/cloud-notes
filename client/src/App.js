
import './App.css';
import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState'
import Login from './components/Login';
import Signup from './components/Signup';
import Footer from './components/Footer';
// import Alert from './components/Alert';

function App() {

  return (
    <div className='body'>
      <NoteState>


        <Navbar />
        {/* <Alert message={"Alert"} /> */}
        <Routes>

          <Route path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />

        </Routes>
        <Footer/>
      </NoteState>
    </div>
  );
}

export default App;
