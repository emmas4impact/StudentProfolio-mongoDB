const { Schema } = require("mongoose")
const mongoose = require("mongoose")

const StudentSchema = new Schema({
    firstname: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      index:{
          unique: true,
      },
      
    },
    dateOfBirth: {
      type: Date,
      
     
    },
    country: {
        type: String,
       
    },
  })
module.exports = mongoose.model("students", StudentSchema)