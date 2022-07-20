const mongoose = require('mongoose')
const connectDB = async()=>{
    URI=process.env.MONGO_URI
    try {

        const conn = mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useFindAndModify:true
        })
        console.log(`Connected `)
    } catch (error) {
        console.log("error",error)
        process.exit();
    }
}

module.exports = connectDB