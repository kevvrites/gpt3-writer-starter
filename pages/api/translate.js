import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
  "You will be given a JSON transcript and a target language. Your task is to check the text field of the JSON object for spelling and spacing errors, fix those, and then translate the text fields into the target language. Return the entire JSON object with the translated text fields, leaving all other fields the same.";

const translateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0,
  });

  const basePromptOutput = baseCompletion.data.choices;

  res.status(200).json({ output: basePromptOutput });
};

export default translateAction;
