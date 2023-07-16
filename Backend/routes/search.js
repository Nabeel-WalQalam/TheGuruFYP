const express = require('express')
const router = express.Router()


module.exports = router;

router.get("/", async (req, res) => {

    const {searchString} = req.body;

    if(!searchString)
    return res.send({success:false,payload:"Please enter something"})


    if( (searchString.startsWith("[")) && (searchString.endsWith("]")) ){
        // serach by tag
    }

});
