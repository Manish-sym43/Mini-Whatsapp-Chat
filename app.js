const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


//DataBase Creating
main()
    .then(res => console.log("DataBase Created Successfully"))
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatapp');
};


//index route
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
});

//New Route
app.get("/chats/new", (req, res) => {
    // res.send("hello Manish i am new chat");
    res.render("new.ejs");
});

app.post("/chats", (req, res) => {
    let { from, to, msg } = req.body;
    let newChat = new Chat({
        from: from,
        to: to,
        msg: msg,
        created_at: new Date,
    });
    newChat
        .save()
        .then((res) => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    res.redirect("/chats");
});


//Read route
app.get("/")


// App Set Up
app.get("/", (req, res) => {
    res.send("hello i am root , Manish Good Morning");
});

app.listen(port, (req, res) => {
    console.log("App Is Listening Successfully");
});
