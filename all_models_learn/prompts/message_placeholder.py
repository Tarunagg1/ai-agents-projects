from langchain_core.prompts import ChatMessagePromptTemplate, MessagesPlaceholder

chat_template = ChatMessagePromptTemplate([
    ("system", "You are a helpful assistant."),
    MessagesPlaceholder("history"),
    ("human", '{query}'),
])


chat_history = []

with open("chat_history.txt", "r") as file:
    chat_history.extend(file.readlines())


chat_template.invoke({
    "history": chat_history,
    "query": "What is the capital of France?"
})



