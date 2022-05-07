import noteConext from "../context/notes/NoteContext"
import React, { useContext, useEffect, useRef, useState } from 'react'
import Note from "./Note";
import AddNotes from "./AddNotes";
import { useNavigate } from "react-router-dom";
import './css/main.css'

const Main = () => {

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" });
  const [readmorecontent, setReadmorecontent] = useState("")
  const [titlecontent, setTitlecontent] = useState("")
  const navigate = useNavigate();
  const context = useContext(noteConext);
  const { notes, getnotes, editnote } = context;

  useEffect(() => {

    if (localStorage.getItem('tocken')) {
      console.log(localStorage.getItem('tocken'));
      getnotes();
    }
    else {
      navigate('/login');
    }
    // eslint-disable-next-line 
  }, [])


  const ref = useRef(null);
  const closeref = useRef(null);

  const readref = useRef(null);

  const updatenote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
  };

  const readmore = (e)=>{
    readref.current.click();
  }


  const onChange = (e) => {

    setNote({ ...note, [e.target.name]: [e.target.value] });
    // console.log(note);
  }

  const handleAddClick = (e) => {

    e.preventDefault();
    editnote(note.id.toString(), note.etitle.toString(), note.edescription.toString(), note.etag.toString());
    getnotes();
    closeref.current.click();
  }


  return (

    <>


      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Update Your Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={closeref}></button>
            </div>
            <div className="modal-body">
              <div>
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label h4">Title</label>
                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label h4">Description</label>
                    <textarea type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="tag" className="form-label h4">Tag</label>
                    <input type="text" className="form-control" id="etag" name="etag" placeholder="G-General | P-High Priority | O-Other" value={note.etag} onChange={onChange} />
                  </div>
                  <button type="submit" className="btn btn-primary" onClick={handleAddClick}>Update</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>







      <button ref={readref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#second">
        Launch demo modal
      </button>


      <div className="modal fade" id="second" tabIndex="-1" aria-labelledby="second" aria-hidden="true">
      <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">{titlecontent}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body textwrap">
        <p>{readmorecontent.toString()}</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>

      </div>







      <AddNotes />
      <div className="d-flex"><h4 className="px-2">Your Notes</h4><h4 className="text-danger px-2">&#9673; : Priority</h4><h4 className="text-primary px-2">&#9673; : General</h4><h4 className="text-warning px-2">&#9673; : Other</h4></div>
      <div className="row my-3">

        {notes.map((note) => {

          return <Note key={note._id} note={note} updatenote={updatenote} readmore={readmore} setReadmorecontent={setReadmorecontent} setTitlecontent={setTitlecontent}/>

        })}
      </div>
    </>
  )
}

export default Main;