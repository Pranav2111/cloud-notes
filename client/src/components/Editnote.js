import {React ,useContext, useState} from 'react'
import noteConext from "../context/notes/NoteContext"


const Editnote = ({setNote,note}) => {

    const context = useContext(noteConext);
    const { editnote } = context;

    

    const onChange = (e)=>{

        setNote({...note,[e.target.name]:[e.target.value]});
       // console.log(notes);
    }

    const handleAddClick = (e)=> {

        e.preventDefault();
        editnote(note.title, note.description, note.tag);
    }



  return (
    <div>
        <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label h4">Title</label>
                        <input type="text" className="form-control" id="title" name='title' value={note.title} aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label h4">Description</label>
                        <textarea type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label h4">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleAddClick}>Update</button>
                </form>
    </div>
  )
}

export default Editnote