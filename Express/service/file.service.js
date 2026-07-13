import fs from 'fs';


export function readFile() { 
   return JSON.parse(fs.readFileSync('data/users.json', 'utf8'));
   //   console.log("Data from the file " , data);
     return data;
}

 export function writeFile(data) {
   console.log("Data to be written " , data);
    return fs.writeFileSync('data/users.json', JSON.stringify(data, null, 2));
 }