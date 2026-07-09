import bcrypt from "bcrypt";
import { readFile, writeFile } from "./file.service.js";
// Loaded once when the module starts
const readData = readFile();
// Handle user registration
export const signup = async (req, res) => {
    const { name, email, password } = req.body;
    const token = generateToken(email);
    console.log("Token ", token);
    const data = readFile();
    console.log("Data ", data);
    const user = readData.find((user) => user.email === email);
    // Check if user already exists
    if (user) {
        return res.status(400).send({ message: "User already exists" });
    }
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { name, email, password: hashedPassword };
    console.log("New user ", newUser);
    writeFile(newUser);
    return res.send({ message: "User created successfully" });
};
//  http://localhost:8000/auth/sigin?email=
//Sign-in route 
export const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = readData.find((user) => user.email === email);
    if (!user) {
        return res.status(404).send({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(400).send({ message: "Invalid password" });
    }
    return res.send({ message: "User signed in successfully" });
};
