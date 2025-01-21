const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const FormDataModel = require('./models/FormData');

const corsConfig = {
    origin: "*",
    credential: true,
    methods : ["POST", "GET", "PUT", "DELETE"],
}; 
const app = express();
app.use(express.json());
app.options("", cors(corsConfig));
app.use(cros(corsConfig));

app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve uploaded files

mongoose.connect('mongodb://127.0.0.1:27017/employee', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
    res.json("hello");
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to store images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique filename
    },
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const mimeType = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
        if (mimeType && extName) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    },
});

// User registration endpoint with image upload
app.post('/register', upload.single('image'), (req, res) => {
    const { name, email, password } = req.body;
    const image = req.file ? req.file.filename : null; // Check if an image is uploaded

    // Check if the user already exists
    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json("Already registered");
            } else {
                // Create a new user
                const newUser = new FormDataModel({
                    name,
                    email,
                    password,
                    image, // Save the image filename
                });
                newUser.save()
                    .then(user => res.json(user))
                    .catch(err => res.json(err));
            }
        })
        .catch(err => res.json(err));
});

// User login endpoint
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    FormDataModel.findOne({ email: email })
        .then(user => {
            if (user) {
                // If user exists
                if (user.password === password) {
                    res.json("Success");
                } else {
                    res.json("Wrong password");
                }
            } else {
                // If user doesn't exist
                res.json("No records found!");
            }
        })
        .catch(err => res.json(err));
});

app.listen(3001, () => {
    console.log("Server listening on http://127.0.0.1:3001");
});


app.listen(3001, () => {
    console.log("Server listining on http://127.0.0.1:3001");

});
