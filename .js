let _config = {
  openAI_api: "https://alcuino-chatbot.azurewebsites.net/api/OpenAIProxy",
  openAI_model: "gpt-4o-mini",
  ai_instruction: `You are a math expert that helps users solve math problems.
  Always explain step-by-step clearly.
  Output should be in HTML format, not markdown.
  Include both the solution process and the final answer.`,
  response_id: "",
};

async function sendOpenAIRequest(text) {
  let requestBody = {
    model: _config.openAI_model,
    input: text,
    instructions: _config.ai_instruction,
    previous_response_id: _config.response_id,
  };

  if (_config.response_id.length == 0) {
    requestBody = {
      model: _config.openAI_model,
      input: text,
      instructions: _config.ai_instruction,
    };
  }

  try {
    const response = await fetch(_config.openAI_api, {
      method: "POST",
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    let output = data.output[0].content[0].text;
    _config.response_id = data.id;

    return output;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw error;
  }
}
