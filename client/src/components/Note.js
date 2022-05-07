import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext';
import './css/note.css'


const Note = ({ note, updatenote, readmore, setReadmorecontent, setTitlecontent }) => {

    const context = useContext(noteContext);
    const { deletenote } = context;

    //const {note} = props;
    let tagcolor = "";

    if (note.tag === "G") {
        tagcolor = "primary"
    }
    else if (note.tag === "P") {
        tagcolor = "danger"
    }
    else {
        tagcolor = "warning"

    }



    // const truncate = (, n) => {
    // 	return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    // };


    return (
        <div className={`col-md-4`}>
            <div className={`card my-3 border-5 border-${tagcolor} note-card`}>
                <div className="card-body">
                    <div className='d-flex items'>
                        <div>
                            <h5 className="card-title">{note.title}</h5>
                        </div>
                        <div>
                            <i className="far fa-edit mx-2 text-primary btnn" onClick={() => { updatenote(note) }}></i>
                            <i className="far fa-trash-alt mx-2 text-danger btnn" onClick={() => deletenote(note._id)}></i>
                        </div>
                    </div>
                    <p className="card-subtitle text-muted">{note.description.length > 100 ? note.description.substr(0, 100) + "..." : note.description}{note.description.length > 50 && <span className='text-primary cursor' onClick={() => { readmore(); setReadmorecontent(note.description); setTitlecontent(note.title) }}>Read More</span>}</p>
                </div>

            </div>
        </div>
    )
}

export default Note