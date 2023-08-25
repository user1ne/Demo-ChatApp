document.addEventListener("DOMContentLoaded", () => {
    // Set focus to the message input field by default
    const messageInput = document.getElementById("messageInput");
    messageInput.focus();
});


const socket = io();
let username;

do {
    username = prompt("Please enter your username:");
} while (!username);

socket.emit("user joined", username);

socket.on("update userlist", (users) => {
    const contactList = document.querySelector(".contact-list");
    contactList.innerHTML = "";

    users.forEach((user) => {
        const contactItem = document.createElement("li");
        contactItem.className = "contact";

        const contactNameSpan = document.createElement("span");
        contactNameSpan.className = "contact-name";
        contactNameSpan.textContent = user;

        contactItem.appendChild(contactNameSpan);
        contactList.appendChild(contactItem);
    });
});

const messageInput = document.getElementById("messageInput");
messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const message = messageInput.value;
        if (message.trim() !== "") {
            socket.emit("chat message", message);
            messageInput.value = "";
        }
    }
});


// socket.on("chat message", (msg) => {
//     const messagesContainer = document.querySelector(".messages"); // Changed messageDiv to messagesContainer
//     const newMessageDiv = document.createElement("div");
//     newMessageDiv.className = "message received";
//     newMessageDiv.textContent = msg;
//     messagesContainer.appendChild(newMessageDiv); // Changed messageDiv to messagesContainer
//     messagesContainer.scrollTop = messagesContainer.scrollHeight; // Corrected scrollHeight
// });

socket.on("chat message", (msg) => {
    const messagesContainer = document.querySelector(".messages");
    const newMessageDiv = document.createElement("div");
    newMessageDiv.className = "message received";

    // Replace words with emojis/icons
   // Replace words with emojis/icons
// Replace words with emojis/icons
// Replace words with emojis/icons
const emojiMsg = msg
    .replace(/React/gi, '<img src="/icons8-react-16.png" alt="React Logo" class="emoji">') // Replace "React" with React logo image
    .replace(/woah/gi, "😲") // Replace "woah" with surprised emoji
    .replace(/hey/gi, "👋") // Replace "hey" with hand emoji
    .replace(/like/gi, "🤍") // Replace "like" with white heart emoji
    .replace(/congratulation/gi, "🥳") // Replace "congratulation" with party emoji
    .replace(/lol/gi, "😂"); // Replace "lol" with crying laughter emoji

    newMessageDiv.innerHTML = emojiMsg; // Use innerHTML to render the replaced HTML content

    messagesContainer.appendChild(newMessageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
});
