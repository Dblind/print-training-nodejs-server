import express from 'express';
import router from './routers/router.js';
import mongoose from 'mongoose';
import cors from 'cors';
import routerTest from './routers/routerTest.js';
import cookieParser from 'cookie-parser';


// const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT || 80;
const DB_URL = "mongodb+srv://admin:admin@cluster0.ggemf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const GREETINGS_MESSAGE = "Server run on port: " + PORT;

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());
// app.use("/users", router);

app.use("/api", router);
app.use("/", routerTest);
app.use("/public", express.static("public"));

startApp();



async function startApp() {
  try {
    await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true, });
    app.listen(PORT, () => {
      console.log(GREETINGS_MESSAGE);
    });
  } catch (error) {
    console.log(error);
  }
}
