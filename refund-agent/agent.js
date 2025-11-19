import readline from 'node:readline/promises';
import * as z from 'zod';
import { createAgent, tool, humanInTheLoopMiddleware } from 'langchain';
import { ChatGroq } from '@langchain/groq';
import { MemorySaver, Command } from '@langchain/langgraph';
import { marked } from 'marked';
import TerminalRenderer from 'marked-terminal';
import { gmailEmails } from './emailData.js';

const llm = new ChatGroq({
    model: 'openai/gpt-oss-120b',
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    maxTokens: undefined,
    maxRetries: 2,
});

const getEmails = tool(
    () => {
        // todo: access Gmail apis

        return JSON.stringify(gmailEmails);
    },
    {
        name: 'get_emails',
        description: 'Get the emails from inbox.',
    }
);

const refund = tool(
    ({ emails }) => {
        // todo: access backend apis

        return '✅ All refunds processed succesfully!';
    },
    {
        name: 'refund',
        description: 'Process the refund for given emails.',
        schema: z.object({
            emails: z.array(z.string()).describe('The list of the emails which need to be refunded'),
        }),
    }
);

const agent = createAgent({
    model: llm,
    tools: [getEmails, refund],
    middleware: [
        humanInTheLoopMiddleware({
            interruptOn: { refund: true },
            descriptionPrefix: 'Refund pending approval',
        }),
    ],
    checkpointer: new MemorySaver(),
});

async function main() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    let interrupts = [];

    while (true) {
        const query = await rl.question('You: ');
        if (query === '/bye') break;

        const response = await agent.invoke(
            interrupts.length
                ? new Command({
                    resume: {
                        [interrupts?.[0]?.id]: {
                            decisions: [{ type: query === '1' ? 'approve' : 'reject' }],
                        },
                    },
                })
                : {
                    messages: [
                        {
                            role: 'user',
                            content: query,
                        },
                    ],
                },
            { configurable: { thread_id: '1' } }
        );

        interrupts = [];

        const formatted = marked.setOptions({
            renderer: new TerminalRenderer(),
        });

        let output = '';

        if (response?.__interrupt__?.length) {
            interrupts.push(response.__interrupt__[0]);

            output += response.__interrupt__[0].value.actionRequests[0].description + '\n\n';
            output += 'Choose:\n';

            output += response.__interrupt__[0].value.reviewConfigs[0].allowedDecisions
                .filter((decision) => decision !== 'edit')
                .map((decision, idx) => `${idx + 1}. ${decision}`)
                .join('\n');
        } else {
            output += response.messages[response.messages.length - 1].content;
        }

        console.log(formatted(output));
    }

    rl.close();
}

main();
