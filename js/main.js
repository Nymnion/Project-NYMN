//onload waits for page to load before running

const repetitionThreshold = 2;
const maxLength = 75;

window.onload = function () {
  const client = new tmi.Client({
    channels: ["nymn"],
  });
  client.connect();

  client.on("message", (channel, tags, message, self) => {

    let userNameSpan = document.createElement("span");
    let messageSpan = document.createElement("span");
    let brTag = document.createElement("br");

    userNameSpan.style.color = tags["color"];
    userNameSpan.textContent  = tags["username"] + ": ";

    messageSpan.textContent  = message;

    document.getElementById("chat").appendChild(userNameSpan);
    document.getElementById("chat").appendChild(messageSpan);
    document.getElementById("chat").appendChild(brTag);
    
    //document.getElementById("chat").innerText += `${tags["username"]}: ${message}\n`;

  });

  document.getElementById("save-chat").addEventListener("click", saveLast100Lines);
};

function isLowValueMessage(message) {
  // You can modify this function to define more criteria for low-value messages
  const trimmedMessage = message.trim();
  return trimmedMessage.length === 0 || trimmedMessage.startsWith("!") || /^\s*$/.test(message);
}

function isLowValueMessage(message) {
  // You can modify this function to define more criteria for low-value messages
  const trimmedMessage = message.trim();
  return trimmedMessage.length === 0 || trimmedMessage.startsWith("!") || /^\s*$/.test(message);
}

function saveLast100Lines() {
  const chat = document.getElementById("chat");
  const lines = chat.innerText.split("\n");
  const cleanedLines = lines.filter((line) => {
    const message = line.trim();
    return message.length <= maxLength && !isLowValueMessage(message);
  });

  const uniqueLines = [];
  cleanedLines.forEach((line) => {
    const recentMessages = uniqueLines.slice(-repetitionThreshold);
    const repeatCount = recentMessages.filter((recent) => recent === line).length;
    if (repeatCount < repetitionThreshold) {
      uniqueLines.push(line);
    }
  });

  const last100Lines = uniqueLines.slice(Math.max(uniqueLines.length - 500, 0)).join("\n");

  console.log(last100Lines); // Use the last100Lines variable as needed

  // Checks if there is a question in the text box
  const questionInput = document.getElementById("question-input");
  const question = questionInput.value.trim();
  if (!question) {
    alert("Please enter a question");
    return;
  }

  sendChatToOpenAI(last100Lines, question);
}

//channel: channel name with a # - use channel.substring(1) to remove the #.
//message: the chat message that the user sent.
//self: set to true if the received message was sent by you, will always be false here because we are not logged in.
//tags: the message tags that show more info about the user. example tags:
// {
//   "badge-info": { subscriber: "45" },
//   badges: { subscriber: "42", twitchconEU2022: "1" },
//   color: "#BA0000",
//   "display-name": "Taste_U",
//   emotes: null,
//   "first-msg": false,
//   flags: null,
//   id: "ef307a04-3648-4ce2-b60d-7b4442ceee5d",
//   mod: false,
//   "returning-chatter": false,
//   "room-id": "62300805",
//   subscriber: true,
//   "tmi-sent-ts": "1681500158137",
//   turbo: false,
//   "user-id": "77648680",
//   "user-type": null,
//   "emotes-raw": null,
//   "badge-info-raw": "subscriber/45",
//   "badges-raw": "subscriber/42,twitchconEU2022/1",
//   username: "taste_u",
//   "message-type": "chat",
// }
