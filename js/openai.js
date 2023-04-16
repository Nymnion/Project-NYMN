async function sendChatToOpenAI(messages, temperature = 0.7) {
    const API_URL = 'https://api.openai.com/v1/chat/completions';
  
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('openai_api_key')}`,
    });
  
    const requestBody = JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: messages }], 
      temperature: temperature,
    });
  
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: headers,
        body: requestBody,
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error(`API request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error(`Error while sending chat data to OpenAI: ${error}`);
    }


console.log(messages);
 
  }
  
