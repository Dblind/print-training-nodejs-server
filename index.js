import express from 'express';
import router from './routers/router.js';
import mongoose from 'mongoose';

const PORT = 3000;
const DB_URL = "mongodb+srv://admin:admin@cluster0.ggemf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const GREETINGS_MESSAGE = "Server run on port: " + PORT;

const app = express();
app.use(express.json());
// app.use("/users", router);

app.use("/api", router)

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
