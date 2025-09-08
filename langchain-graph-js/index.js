import { StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import readline from 'readline';
import dotenv from 'dotenv'
import { ChatGroq } from "@langchain/groq";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { TavilySearch } from "@langchain/tavily";
import { MemorySaver } from "@langchain/langgraph";


dotenv.config()

const tool = new TavilySearch({
    maxResults: 5,
    topic: "general"
});


// Define the tools for the agent to use
const tools = [tool];
const toolNode = new ToolNode(tools);



const llm = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    maxRetries: 2,
}).bindTools(tools);


// Initialize memory to persist state between graph runs
const checkpointer = new MemorySaver();

async function callModel(state) {
    // call the agent model here
    console.log('Calling model with messages:', state.messages[0]['content']);
    const response = await llm.invoke(state.messages);
    return { messages: [response] };
}

function shouldContinue(state) {
    const lastMessages = state.messages[state.messages.length - 1];

    if (lastMessages.tool_calls && lastMessages.tool_calls.length > 0) {
        return "tools";
    }

    return "__end__";
}

const workFlow = new StateGraph(MessagesAnnotation)
    .addNode("agent", callModel)
    .addEdge("__start__", "agent") // __start__ is a special name for the entrypoint
    .addNode("tools", toolNode)
    .addEdge("tools", "agent")
    .addConditionalEdges("agent", shouldContinue)

// Finally, we compile it into a LangChain Runnable.
const app = workFlow.compile();


async function main(params) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    function ask(question) {
        return new Promise(resolve => rl.question(question, resolve));
    }

    while (true) {
        const userInput = await ask('Ask agent: ');
        if (userInput === 'exit') {
            break;
        }

        // Use the agent
        const finalState = await app.invoke({
            messages: [{ role: 'user', content: userInput }],
        });


        const lastMessages = finalState.messages[finalState.messages.length - 1];
        console.log("AI: ", lastMessages['content']);
    }
    rl.close();
}

main();