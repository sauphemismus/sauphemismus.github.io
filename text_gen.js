import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("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");


//const chatCompletion = await client.chatCompletion({
//    provider: "auto",
//    model: "deepseek-ai/DeepSeek-V3",
//    messages: [
//        {
//            role: "user",
//            content: "What is the capital of France?",
//        },
//    ],
//});

//console.log(chatCompletion.choices[0].message);



const output = await client.textGeneration({
	model: "meta-llama/Meta-Llama-3-8B",
	inputs: "Can you please let us know more details about your special in",
	provider: "auto",
});

console.log(output);