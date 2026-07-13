import bcrypt from 'bcrypt';
import { readFile, writeFile } from './file.service.js';
const readData = readFile();
export const signup = async (req, res) => { 
    let  {name, email, password } = req.body;
    const data = readFile();
    console.log("Data " , data);
    const user = readData.find((user) => {return user.email === email});
    //check if user already exists
    if(user) { 
      return res.status(400).send({message: "User already exists"});
    }
    //password convert to hash
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {name, email, password: hashedPassword};
    console.log("New user " , newUser);
    writeFile(newUser);


    return res.send({message: "User created successfully"});
}