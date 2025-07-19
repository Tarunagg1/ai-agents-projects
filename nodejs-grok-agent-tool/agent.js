import Groq from "groq-sdk";
import readline from 'node:readline/promises';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });


const expensesDb = [];
const incomesDb = [];

async function callAgent() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: true,
    });

    const messages = [
        {
            role: "system",
            content: `You are a tarun, a personal finance assistent. your task is to help manage ypour expenses balanses and funancial service.
            you haave access to tools:
                1. Get_expense_tool: This tool allows you to get the total expenses between two dates.
                2. Add_expense_tool: This tool allows you to add an expense to the database.
                3. Add_income_tool: This tool allows you to add an income to the database.
                4. Get_income_tool: This tool allows you to get the total income between two dates.
                Currnent datatime ${new Date().toUTCString()}.
            `,
        },
    ];



    while (true) {
        const userInput = await rl.question("You: ");
        messages.push({ role: "user", content: userInput });

        if (userInput.toLowerCase() === "bye") {
            console.log("Exiting the agent.");
            break;
        }

        while (true) {
            const complition = await groq.chat.completions.create({
                messages: messages,
                model: "llama-3.3-70b-versatile",
                tools: [
                    {
                        type: "function",
                        function: {
                            name: "Get_expense_tool",
                            description: "Get the expense tool to generate an expense report.",
                            parameters: {
                                type: "object",
                                properties: {
                                    from: {
                                        type: "string",
                                        description: "The start date for the expense report.",
                                    },
                                    to: {
                                        type: "string",
                                        description: "The end date for the expense report.",
                                    },
                                },
                                required: ["from", "to"],
                            },
                        },
                    },
                    {
                        type: "function",
                        function: {
                            name: "Add_expense_tool",
                            description: "Add an expense to the database.",
                            parameters: {
                                type: "object",
                                properties: {
                                    amount: {
                                        type: "number",
                                        description: "The amount of the expense.",
                                    },
                                    name: {
                                        type: "string",
                                        description: "The name or description of the expense. bought groceries, paid rent, etc.",
                                    },
                                },
                                required: ["amount", "name"],
                            },
                        },
                    },
                    {
                        type: "function",
                        function: {
                            name: "Add_income_tool",
                            description: "Add an income to the database.",
                            parameters: {
                                type: "object",
                                properties: {
                                    amount: {
                                        type: "number",
                                        description: "The amount oyou get from income.",
                                    },
                                    name: {
                                        type: "string",
                                        description: "The source name of income like salery freelance etc.",
                                    },
                                },
                                required: ["amount", "name"],
                            },
                        },
                    },
                    {
                        type: "function",
                        function: {
                            name: "Get_income_tool",
                            description: "Get the income tool to generate an income report.",
                            parameters: {
                                type: "object",
                                properties: {
                                    from: {
                                        type: "string",
                                        description: "The start date for the income report.",
                                    },
                                    to: {
                                        type: "string",
                                        description: "The end date for the income report.",
                                    },
                                },
                                required: ["from", "to"],
                            },
                        },
                    },
                ]
            });

            messages.push(complition.choices[0].message);
            // console.log("Agent response:", complition.choices[0].message);
            // console.log("log another tool callls", complition.choices[0].message.tool_calls);

            const toolCalls = complition.choices[0].message.tool_calls;

            if (!toolCalls) {
                console.log("Assistent", complition.choices[0].message.content);
                break;
            }


            for (const toolCall of toolCalls) {
                const functionName = toolCall.function.name;
                const functionArgs = toolCall.function.arguments;

                if (functionName === "Get_expense_tool") {
                    const { from, to } = JSON.parse(functionArgs);
                    const result = await Get_expense_tool({ from, to });
                    messages.push({
                        role: "tool",
                        content: `Your expenses from ${toolCalls[0].function.arguments.from} to ${toolCalls[0].function.arguments.to} is ${result}`,
                        tool_call_id: toolCalls[0].id,
                    });
                }
                else if (functionName === "Add_expense_tool") {
                    const { amount, name } = JSON.parse(functionArgs);
                    const result = Add_expense_tool({ amount, name });
                    messages.push({
                        role: "tool",
                        content: `Expense added: ${name} for ${amount}`,
                        tool_call_id: toolCalls[0].id,
                    });
                }
                else if (functionName === "Add_income_tool") {
                    const { amount, name } = JSON.parse(functionArgs);
                    const result = Add_income_tool({ amount, name });
                    messages.push({
                        role: "tool",
                        content: `Income added: ${name} for ${amount}`,
                        tool_call_id: toolCalls[0].id,
                    });
                }
                else if (functionName === "Get_income_tool") {
                    const { amount, name } = JSON.parse(functionArgs);
                    const result = Add_income_tool({ amount, name });
                    messages.push({
                        role: "tool",
                        content: `Income added: ${name} for ${amount}`,
                        tool_call_id: toolCalls[0].id,
                    });
                }
                else {
                    console.log(`Unknown function called: ${functionName}`);
                }
            }
        }
    }

    rl.close();
}

callAgent()



/*
//  Get_expense_tool()
*/

export async function Get_expense_tool({ from, to }) {
    console.log('Get_expense_tool called with:', { from, to });

    const totalAmount = expensesDb.reduce((acc, item) => acc + item.amount, 0);

    return `${totalAmount} from ${from} to ${to} INR`;
}

/*
    ** Add expenses
*/

function Add_expense_tool({ amount, name }) {
    expensesDb.push({ name, amount, date: new Date() });

    console.log('Add_expense_tool called with:', { amount, name });

    return `Expense added: ${name} for ${amount} INR`;
}



/*
    ** Add income
*/

export function Add_income_tool({ amount, name }) {
    incomesDb.push({ name, amount, date: new Date() });

    console.log('Add_income_tool called with:', { amount, name });

    return `Income added: ${name} for ${amount} INR`;
}

/*
    ** Get income
*/

export async function Get_income_tool({ from, to }) {
    console.log('Get_income_tool called with:', { from, to });

    const totalAmount = incomesDb.reduce((acc, item) => acc + item.amount, 0);

    return `${totalAmount} from ${from} to ${to} INR`;
}