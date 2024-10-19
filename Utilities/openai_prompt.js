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
    fs.writeFileSync('questions_1.txt', messageContent, 'utf-8');

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
    "I am creating a survey to determine someone's Varna based on their aptitudes and skillset. My target audience for this survey is people aged 20 to 50, mostly Indian, who have a mindset of a seeker and are eager to learn. Please generate ten engaging questions that fit this criteria. Each question should have 4 answer choices, each of them corresponding to a different Varna. These questions should be easy for a 20 year old who doesn't have a job to understand, as well as 40 year old adult who has one. Format the questions and answers in the following format: {question} \n 1. {answer}, {varna} \n 2. {answer}, {varna} \n 3. {answer}, {varna} \n 4. {answer}, {varna}.";

  try {
    const response = await client.sendTextCompletionRequest(prompt);

    // Access the generated message text
    const message = response.choices[0].message.content; // Accessing the generated conten
  } catch (error) {
    console.error("Error:", error);
  }
}

// Run the dummy main function
main();
