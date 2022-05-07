import {React ,useContext, useState} from 'react'
import noteConext from "../context/notes/NoteContext"
import im from './css/dsktp.png'
import './css/main.css'

const AddNotes = () => {

    const context = useContext(noteConext);
    const { addnote } = context;

    const [note, setNote] = useState({title:"",description:"", tag:""});
    // const [fileName, setFileName] = useState("");
    
    // const onChangeFile = (e) =>{
    //     setFileName(e.target.files[0].name);
    // }

    const onChangetext = (e)=>{

        setNote({...note,[e.target.name]:[e.target.value]});
       // console.log(notes);
    }

    const handleAddClick = (e)=> {

    e.preventDefault();


    //     const data = {
    //         title : note.title.toString(),
    //         description : note.description.toString(),
    //         tag : note.tag.toString() ,
    //         // image : fileName.toString()
    //     }

       

    //    addnote(data);

    addnote(note.title.toString(), note.description.toString(), note.tag.toString());
    //     //console.log(note.title.toString(), note.description.toString(), note.tag.toString());
    setNote({title:"",description:"", tag:""});
    }

    return (

        <div className='col-md-12 d-flex my-0 mx-0'>
            <div className='container my-3'>
                <h2>Add Notes</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label h4">Title</label>
                        <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChangetext} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label h4">Description</label>
                        <textarea type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChangetext} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="tag" className="form-label h4">Tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" placeholder="G-General | P-High Priority | O-Other" value={note.tag} onChange={onChangetext} />
                    </div>
                    {/* <div className="mb-3">
                        <label htmlFor="image" className="form-label h4">Upload Image</label>
                        <input type="file" className="form-control" id="image" name="image" onChange={onChangeFile}/>
                    </div> */}
                    <button type="submit" className="btn btn-primary" onClick={handleAddClick}>Add</button>
                </form>

            </div>

            <div className='container imgg'>
                    <img src={im} alt="" className='imgg'/>
            </div>
        </div>
    )
}

export default AddNotes