const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String, // Path to the uploaded image
        required: false,
    },
});

const FormDataModel = mongoose.model('FormData', formDataSchema);

module.exports = FormDataModel;
