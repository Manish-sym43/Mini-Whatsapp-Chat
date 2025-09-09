const express = require("express");
const app = express();
const port = 8080;
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));


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
app.get("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("show.ejs", { chat });
});

//Edit Route
app.get("/chats/:id/edit", async (req, res) => {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", { chat });
});

app.patch("/chats/:id", async (req, res) => {
    let { id } = req.params;
    let { msg } = req.body;
    await Chat.findByIdAndUpdate(id, { msg: msg }, { runValidators: true, new: true });
    res.redirect("/chats");
});

//Delete Route
app.delete("/chats/:id", async (req, res) => {
    let { id } = req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
});

// App Set Up
app.get("/", (req, res) => {
    res.send("hello i am root , Manish Good Morning");
});

app.listen(port, (req, res) => {
    console.log("App Is Listening Successfully");
});
