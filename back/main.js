import express from 'express';
import cors from 'cors';
import {config} from './config.js';
import {getDirname} from "./util.js";
import Platform from './platform.js';
import User from "./user.js";
import FileSubstitutor from "./file-substitutor.js";
import FileUpload from "./file-upload.js";

const app = express();
const port = config.port || 4321;
const di = {};

app.use(cors({
  origin: config.domain || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

di.userService = new User();
new Platform(app, di);
new FileSubstitutor(app, di);
new FileUpload(app, di);


app.use(express.static(getDirname() + '/public/dist/'));
app.get('/exit', (req, res) => {
  res.sendFile(getDirname()+'/public/dist/index.html');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});


