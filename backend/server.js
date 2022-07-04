const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
app.use(express.json());


// ⁡⁢⁣⁣𝗿𝗼𝘂𝘁𝗲𝘀⁡ 
const workoutRouter = require('./routes/workoutsRoutes');
app.use("/api/workouts", workoutRouter);

// * ⁡⁢⁢⁢mongodb connection⁡
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
    .then(() => {
        // ⁡⁣⁢⁣𝗹𝗶𝘀𝘁𝗲𝗻⁡
        app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}/`) });
    })
    .catch(err => { console.log(err) });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to MongoDB"));
// *⁡⁢⁢⁢end connection mongodb⁡

// ⁡⁣⁢⁣​‌‍‌middleware​⁡
app.use((req, res, next) => {
    console.log(req.method, req.path);
    next()
})
