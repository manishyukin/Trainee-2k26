import fs from "fs";
const USERS_FILE = "data/users.json";
// Read all users from the JSON file
export function readFile() {
    return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
}
// Write data back to the JSON file
export function writeFile(data) {
    console.log("Data to be written ", data);
    fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2));
}
