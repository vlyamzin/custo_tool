import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import {getDirname} from "./util.js";
const app = express();
const port = 4321;
import Platform from './platform.js';
import User from "./user.js";
import FileSubstitutor from "./file-substitutor.js";

const di = {};

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

di.userService = new User();
new Platform(app, di);
new FileSubstitutor(app, di);


app.use(express.static(getDirname() + '/public/dist/'));
app.get('/exit', (req, res) => {
  res.sendFile(getDirname()+'/public/dist/index.html');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


