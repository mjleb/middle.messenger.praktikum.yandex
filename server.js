import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
const PORT = 3000;

const app = express();
app.use(express.static(path.resolve(__dirname,'dist')));
app.use('/*',(req,res)=>{res.sendFile(path.join(__dirname,'dist/index.html'))});

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
  }); 
  