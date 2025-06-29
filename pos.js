import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient("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");

const output = await client.tokenClassification({
	model: "vblagoje/bert-english-uncased-finetuned-pos",
	inputs: "My name is Sarah Jessica Parker but you can call me Jessica",
	provider: "hf-inference",
});

console.log(output);