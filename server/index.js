const express = require("express");
const app = express();

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payment");
const courseRoutes = require("./routes/Course");
const contactUsRoute = require("./routes/Contact");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const { cloudinaryConnect } = require('./config/cloudinary');
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();

const Port = process.env.PORT || 4000;

// database connect 
database.connect();

// middlewares 
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: function (origin, callback) {
            const allowedOrigins = [
                "https://elaborate-dango-f54071.netlify.app",
                "https://66901fbbdc6b2e225f38f4b1--elaborate-dango-f54071.netlify.app"
            ];
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
    })
);

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp',
    })
);

// cloudinary connection 
cloudinaryConnect();

// routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/reach", contactUsRoute);

// default route
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: 'Your server is up and running....'
    });
});

app.listen(Port, () => {
    console.log(`App is running at ${Port}`);
});
