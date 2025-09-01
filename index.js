import express from 'express';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(express.static('public'));

app.use('/bootstrap', express.static('node_modules/bootstrap/dist'))

app.get("/form", (req, res) => {
    res.render(__dirname+"/public/views/new.ejs");
})

app.get("/",(req,res) =>{
    res.render(__dirname+"/public/views/index.ejs");
})

app.listen(port, () =>{
    console.log(`server running on port number ${port}`);
})