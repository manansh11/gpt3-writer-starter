import { Configuration, OpenAIApi } from "openai";

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const basePromptPrefix = `
We are currently in conversation with the Hindu god Krishna. He gives detailed, and enlightened answers to every question. His answers are similar to the answers he gave Arjuna on the battlefield of Kurukshetra
Me: 
`;
const generateAction = async (req, res) => {

    // run first prompt
    //console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

    const baseCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${basePromptPrefix}${req.body.userInput}\n`,
        temperature: 0.9,
        max_tokens: 1000,
    });

    const basePromptOutput = baseCompletion.data.choices.pop();


    const secondPrompt = `
    Given a reply from the God Krishna, create a approachable, step-by-step lesson that anyone could understand that helps solve or explain the answer. The answer is: 
    `

    const secondPromptCompletion = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: `${secondPrompt}${basePromptOutput.text}\n`,
        temperature: 0.9,
        max_tokens: 1000,
    });

    const secondPromptOutput = secondPromptCompletion.data.choices.pop()

    const toSend = secondPromptOutput;

    res.status(200).json({output: toSend})

};

export default generateAction;