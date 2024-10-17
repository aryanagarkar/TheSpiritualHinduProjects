const fs = require("fs");

class OpenAIClient {
  constructor() {
    this.apiUrl = "https://api.openai.com/v1/chat/completions";
    this.apiKey = process.env.API_KEY;
  }

  // Send text completion request.
  async sendTextCompletionRequest(prompt) {
    const requestBody = this.generateRequestBody(prompt);
    const response = await this.sendPostRequest(this.apiUrl, requestBody);

    // Extract the message content from the response
    const messageContent = response.choices[0].message.content;

    // Write the message content to a text file inside this method
    fs.writeFileSync('questions.txt', messageContent, 'utf-8');
    console.log("Response saved to questions.txt");

    return response; // Return the full response for further use if needed
  }

  generateRequestBody(prompt) {
    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: prompt },
    ];

    return {
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 1500, // Adjust as needed
    };
  }

  // Send POST request to OpenAI API
  async sendPostRequest(url, requestBody) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  }
}

async function main() {
  const client = new OpenAIClient();
  const prompt =
    "Please generate a question about science with four possible answers. Format the answers in the following format: {answer, varna).";

  try {
    const response = await client.sendTextCompletionRequest(prompt);

    // Access the generated message text
    const message = response.choices[0].message.content; // Accessing the generated content
    console.log("Generated Question and Answers:", message);
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the dummy main function
main();
