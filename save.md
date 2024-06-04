const OpenAI = require("openai");
const dotenv = require("dotenv");

// Carregando variáveis de ambiente
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function main() {
  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "You are a helpful assistant." }],
      model: "gpt-3.5-turbo",
    });

    console.log(completion.choices[0]);
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error("Limite de taxa excedido. Por favor, tente novamente mais tarde.");
    } else {
      console.error("Erro ao fazer solicitação à API da OpenAI:", error.message);
    }
  }
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runWithDelay() {
  await delay(1000); // Adicionando um atraso de 1 segundo entre as solicitações
  await main();
}

runWithDelay();



// import OpenAI from "openai";

const OpenAI = require("openai");
const dotenv = require("dotenv");

const openai = new OpenAI();

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();