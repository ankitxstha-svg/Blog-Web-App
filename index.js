import express from 'express';
import multer from 'multer';
import { dirname } from "path";
import { fileURLToPath } from "url";


const upload = multer({dest: 'uploads/'});
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

let posts = [];


app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));
app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use('/uploads', express.static('uploads'));


app.get("/",(req,res) =>{
    console.log(posts);
    res.render(__dirname+"/views/index.ejs", {posts});
    
})

app.post("/create-post",upload.single('blogImage') ,(req,res) =>{
    const {firstName, lastName, email, content , date} = req.body;
    const blogImage = req.file;


    if(!firstName || !lastName || !email || !content || !blogImage || !date){
        return res.status(400).send("missing required fields. Please fill in all fields");
    }

    try{
        posts.push({
            id: Date.now(),
            firstName,
            lastName,
            email,
            content,
            blogImage: blogImage.filename,
            date,
        });

        res.redirect("/?message=Post+created+successfully");
    }catch (error){
        console.error(error);
        res.status(500).send("Something went wrong while creating the post. Please try again.");
    }
});

app.get("/post/:id", (req, res) => {
    const postId = parseInt(req.params.id, 10);

    const post = posts.find(p=> p.id === postId);

    if(!post){
        return res.status(404).send("post not found");
    }

    res.render(__dirname+"/views/post.ejs", {post});
});

app.listen(port, () =>{
    console.log(`server running on port number ${port}`);
});
