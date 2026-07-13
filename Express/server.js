import express from 'express';
import { authRouter } from './routes/auth.route.js';
import { profileRouter } from './routes/profile.route.js';
const app = express();

const port = 8000
// console.log('express ', express.json());
app.use(express.json());
app.use('/auth', authRouter);
app.use('/profile', profileRouter);

// app.get('/profile ', (req, res) => {
//     res.send('Hello World')
// })

// req --->(CAR MANUFACTURER  PARTS ) FACTORY -----> route

app.listen(port, () => { 
    console.log(`Server is running on port ${port}`)
})
