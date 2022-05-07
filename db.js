const mongoose = require('mongoose');


const mongoURI = "mongodb+srv://Pranav:pranav1026@cluster0.gj9ga.mongodb.net/cloudnotes?retryWrites=true&w=majority";

const connecttoMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connected to mongo successfully");
    })
}

module.exports = connecttoMongo;
