const mongoose = require("mongoose");
const Chat = require("./models/chat.js");


async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatapp');
    console.log("Database Connected Successfully");

    let allChats = [
        {
            
            from: "manish",
            to: "hello",
            msg: "hello love you",
            created_at: new Date()
        },
        {
            
            from: "simran",
            to: "manish",
            msg: "hello miss you",
            created_at: new Date()
        }
    ];

    await Chat.insertMany(allChats);
    console.log("Chats inserted successfully");

    mongoose.connection.close();
}

main().catch(err => console.log(err));
