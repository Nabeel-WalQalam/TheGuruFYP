const mongoose = require('mongoose')

module.exports = () => {

    mongoose.connect('mongodb://127.0.0.1:27017/')
        .then(() => { console.log("connected to database") })
        .catch((error) => { console.log("Error connecting to database", error) });

}