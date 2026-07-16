import "dotenv/config";
import express from "express";
import { authRouter } from "./routes/auth.route.js";
import { profileRouter } from "./routes/profile.route.js";
import { tasksRouter } from "./routes/tasks.route.js";
const app = express();
const port = 8008;

// Parse incoming JSON request bodies
app.use(express.json());
// app.use(cors(
//   {
//   origin: "*",
//   methods : ["GET", "POST", "PUT", "DELETE"],
// }))

// Mount route groups
console.log("Auth Router ", );
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/task",tasksRouter)

// req ---> (CAR MANUFACTURER PARTS) FACTORY -----> route

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// Frontend(http://localhost:3000) ----> API ----> Backend(http://localhost:8000)


  // https://web.whatsapp.com/  ---->  http://3.2.353.200:8000