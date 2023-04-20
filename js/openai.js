async function sendChatToOpenAI(messages, question, temperature = 0.7) {
  const API_URL = "https://api.openai.com/v1/chat/completions";

  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("openai_api_key")}`,
  });

  const requestBody = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content:
          'The following is a 100 lines from a Twitch chat answering the question: "' +
          question +
          '" | Format the answers and present back the top 10 answers in an HTML table that covers the user, their reply, your rating of their comment, and a small review that roasts their reply. Here are the chat logs:' +
          messages,
      },
    ],
    temperature: temperature,
    stream: true,
  });

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: headers,
      body: requestBody,
    });

    response_box = "";

    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        return;
      }
      addToResponseBox(value);
    }
  } catch (error) {
    console.error(`Error while sending chat data to OpenAI: ${error}`);
  }
}

let response_box = "";

function addToResponseBox(uint8Array) {
  let string = new TextDecoder().decode(uint8Array);

  if (string.includes("data: [DONE]")) {
    return;
  }

  const regex = /data: {.*}/g;

  const ArrayOfData = string.match(regex);

  for (let data of ArrayOfData) {
    data = data.replace("data: ", "");

    const object = JSON.parse(data.replace("data: ", ""));

    const response = object.choices[0].delta.content;

    if (response) {
      response_box += response;
    }
    displayOpenAIResponse();
  }
}

function displayOpenAIResponse() {
  const responseElement = document.getElementById("openai-response");

  if (responseElement) {
    responseElement.innerHTML = response_box;
  } else {
    console.error('Unable to find the HTML element with the ID "openai-response"');
  }
}
