import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";

const app = express()
dotenv.config()




const server = app.listen(process.env.PORT, ()=> {
    console.log(`Server started on Port ${process.env.PORT}`);
});


mongoose.set('strictQuery', true);

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
       
    })
    .then(()=> {
        console.log("DB connection successfull");
    }).catch((err)=> {
        console.log(err.message);
    });
   


mongoose.connection.on("disconnected", ()=> {
    console.log("mongodb disconnected!")
})
mongoose.connection.on("connected", ()=> {
    console.log("mongodb connected!")
})

//middlewares
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success:false,
        status:errorStatus,
        message:errorMessage,
        stack:err.stack,
    });
});































// const connect = async() => {
//     try {
//         mongoose.set('strictQuery', true);
//         await mongoose.connect(process.env.MONGO);
//         console.log ("Connected to mongodb")
//     } catch (error) {
//         throw error;
//     }

// };


// app.listen(8800, ()=>{
//     connect()
//     console.log("connected to backend")
// })