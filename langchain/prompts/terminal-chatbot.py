from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage

load_dotenv()  # Load environment variables from .env file

model = ChatOpenAI(model_name="gpt-4", temperature=0)

chatHistory = [
    SystemMessage(content="You are a helpful assistant.")
]


while True:
    user_input = input("You: ")
    chatHistory.append(HumanMessage(content=user_input))
    if user_input.lower() in ["exit", "quit"]:
        print("Exiting the chatbot. Goodbye!")
        break

    chat = model.invoke(chatHistory)
    chatHistory.append(AIMessage(content=chat.content))
    print(f"Bot: {chat.content}")


