const mongoose = require('mongoose')

module.exports = () => {

    mongoose.connect('mongodb+srv://hunfa:123@cluster0.z2kbwem.mongodb.net/test')
        .then(() => { console.log("connected to database") })
        .catch((error) => { console.log("Error connecting to database", error) });

}