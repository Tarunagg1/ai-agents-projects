from langgrapph.graph import StateGraph, START, END
from dotenv import load_dotenv
import asyncio
from langchain_openai import ChatOpenAI
import os
from langchain_community.tools import DuckDuckGoSearchRun
from typing import TypedDict, Annotated
from langchain_core.messages import HumanMessage, BaseMessage
from langgraph.graph.message import add_messages
from langgraph.prebuilt import ToolNode, tools_condition
from langchain_core.tools import tool
from langchain_mcp_adapters.clien import MultiServerMCPClient


load_dotenv()

llm = ChatOpenAI(model="gpt-5")

client = MultiServerMCPClient(
    {
        "arith":{
            "transport": "stdio",
            "command":"python3",
            "args": ["/Users/nitish/Desktop/mcp-math-server/main.py"],
        },
        "expense":{
            "transport": "streamable_http",  # if this fails, try "sse"
            "url": "https://splendid-gold-dingo.fastmcp.app/mcp"
        }
    }
)


class ChatState(TypedDict):
    messages: Annotated[list[BaseMessage], add_messages]


async def build_graph():
    tools = await client.get_tools()

    print(tools)

    llms_with_tools = llm.bind_tools(tools)

    # nodes

    async def chat_node(state: ChatState):
        messages = state["messages"]
        response = await llms_with_tools.ainvoke(messages)
        return {"messages":[response]}


    tool_node = ToolNode(tools)

    graph = StateGraph(ChatState)

    graph.add_node("chat_node", chat_node)
    graph.add_node("tools",tool_node)

    graph.add_edge(START,"chat_node")
    graph.add_conditional_edges("chat_node",tools_condition)
    graph.add_edge("tools","chat_node")

    chatbot = graph.compile()

    return chatbot

async def main():
    chatbot = await build_graph()

    result = await chatbot.ainvoke(
        {
            "messages":[HumanMessage(content="What is 1234 times 5678?")]
        }
    )

    print(result['messages'][-1].content)


if __name__ == '__main__':
    asyncio.run(main())