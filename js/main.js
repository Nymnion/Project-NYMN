//onload waits for page to load before running
window.onload = function () {
  const client = new tmi.Client({
    channels: ["nymn"],
  });
  client.connect();

  client.on("message", (channel, tags, message, self) => {
    document.getElementById("chat").innerText += `${tags["username"]}: ${message}\n`;
  });

  document.getElementById("save-chat").addEventListener("click", saveLast100Lines);
};

function saveLast100Lines() {
  const chat = document.getElementById("chat");
  const lines = chat.innerText.split("\n");
  const last100Lines = lines.slice(Math.max(lines.length - 101, 0), lines.length - 1).join("\n");

  console.log(last100Lines); // Use the last100Lines variable as needed
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

    //prepend the received chat message to the chat div