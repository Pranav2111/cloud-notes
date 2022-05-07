const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

const multer = require('multer');


const storage = multer.diskStorage({
    
   destination:(req, file, callback) => {
       callback(null, './client/public/uploads/')
   },
   filename:(req, file, callback)=>{
       callback(null, file)
   }

})


//upload parameter for multer

const upload = multer({
    storage: storage
});





//==========================================================================================================================================

// Route for fetching notes : GET

router.get('/fetchnotes', fetchuser, async (req, res) => {

    try {

        const notes = await Notes.find({ user: req.user.id });

        res.json(notes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }


})


//==========================================================================================================================================

// Route for adding notes : POST

router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid email').isLength({ min: 2 }),
    body('description', 'Enter a valid name').isLength({ min: 2}),
], async (req, res) => {


    try {
       const { title, description, tag } = req.body;

        //if there is error then return bad request and error

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title,
            description, 
            tag, 
            user: req.user.id,
           
        })

        //console.log(note);

        const savenote = await note.save();

        res.json(savenote);
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }



})



//==========================================================================================================================================

// Route for update notes : PUT

router.put('/updatenote/:id', fetchuser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        
        // create new note object

        const newNote ={};

        if(title){
            newNote.title = title;
        }
        if(description){
            newNote.description = description;
        }
        if(tag){
            newNote.tag = tag;
        }

        // find the note to be updated

        let note = await Notes.findById(req.params.id);

        if(!note)
        {
            return res.status(404).send("Not found");
        }

        if(note.user.toString() != req.user.id)
        {
            return res.status(404).send("Not Allowed");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set : newNote}, {new:true});
        res.json(note);




    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    
    }

})


//==========================================================================================================================================

// Route for delete notes : delete

router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        

        // find the note to be deleted

        let note = await Notes.findById(req.params.id);

        if(!note)
        {
            return res.status(404).send("Not found");
        }

        // allow if user is authenticated
        if(note.user.toString() != req.user.id)
        {
            return res.status(404).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        
        res.json("Deleted");




    } catch (error) {
        console.error(error.message);
        res.status(500).send("erver Error");
    
    }

})

module.exports = router;