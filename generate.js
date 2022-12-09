import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `Write me a table of contents for the title below .  
Title:
`;
const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)
  // Run first prompt
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.7,
    max_tokens: 500,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();
  console.log(`${basePromptOutput}`, "this is base Prompt Output");

  //Prompt #2

  const secondPrompt = 
  `
  Take the title of contents from ${basePromptOutput} and generate a detailed thread explaining with examples. Make it feel like a story. Don't just list the points. Go deep into each line. Explain why with examples.   
  Title: "The title as follows:"
   
  Query Summary:
  `

  //I call the openAI API second time with Prompt #2
  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    temperature: 0.80,
    max_tokens: 1000,
  });

  //get Output
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();
  console.log(`${secondPromptOutput.text}`, "this is second Prompt Output");

  res.status(200).json(JSON.stringify({ output: {contents: basePromptOutput, blog: secondPromptOutput }}));
};

export default generateAction;
