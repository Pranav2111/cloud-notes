import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {

   const host = `https://cloudnotes123.herokuapp.com`;
  //const host = 'http://localhost:5000'

  const notestInitial = []

  const [notes, setNotes] = useState(notestInitial);

  
  // Get all notes
  const getnotes = async () => {


    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-tocken': localStorage.getItem('tocken')
      },
      
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);

  }

  //Add note


  //-----------------------------For memories app------------------------------------------------

  // const add = async (data) => {

  //   // console.log(data);

  //   const {title , description, tag , image} = data;

  //   const response = await fetch(`${host}/api/notes/addnote`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'auth-tocken': localStorage.getItem('tocken')
  //     },
  //     body: JSON.stringify({title , description, tag , image})
  //   });
    
  //   const newnote = await response.json();
  //   console.log(newnote);
  //  // setNotes(notes.concat(newnote));

  // }


  



  //-----------------------------------------------------------------------------
  const addnote = async (title , description, tag ) => {

    

    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-tocken': localStorage.getItem('tocken')
      },
      body: JSON.stringify({title , description, tag })
    });
    
    const newnote = await response.json();
    

    setNotes(notes.concat(newnote));

  }

  // Edit note
  const editnote = async (id, title, description, tag) => {


    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-tocken': localStorage.getItem('tocken')
      },
      body: JSON.stringify({ title, description, tag })
    });
    console.log(response);

    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        notes[index].title = title
        notes[index].description = description
        notes[index].tag = tag
        break;
      }
    }

    setNotes(notes);


  }

  // deleting note
  const deletenote = async(id) => {

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-tocken': localStorage.getItem('tocken')
      },
      
    });
    console.log(response);
   

    const newnotes = notes.filter((note) => { return (note._id !== id) })
    // console.log(`"deleting ${id}"`);
    setNotes(newnotes);
  }


  return (
    <NoteContext.Provider value={{ notes, addnote, editnote, deletenote, getnotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;