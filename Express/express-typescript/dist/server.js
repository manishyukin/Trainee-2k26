import express from "express";
import { authRouter } from "./routes/auth.route.js";
import { profileRouter } from "./routes/profile.route.js";
const app = express();
const port = 8000;
// Parse incoming JSON request bodies
app.use(express.json());
// Mount route groups
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
// req ---> (CAR MANUFACTURER PARTS) FACTORY -----> route
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
