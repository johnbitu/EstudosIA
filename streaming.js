const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const readline = require("readline");

dotenv.config();

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

async function run() {
  // The Gemini 1.5 models are versatile and work with multi-turn conversations (like chat)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Cria a interface para ler o input do usuário
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Função para fazer uma pergunta ao usuário e aguardar a resposta
  const askQuestion = (question) => {
    return new Promise((resolve) => rl.question(question, resolve));
  };

  try {
    // Faz uma pergunta ao usuário e aguarda a resposta
    const resposta = await askQuestion('Digite algo: ');

    // Fecha a interface
    rl.close();

    // Use streaming with text-only input
    const result = await model.generateContentStream(resposta);
    const response = await result.response;
    const text = await response.text();

    console.log(text);
  } catch (error) {
    console.error("Error:", error);
  }
}

run();