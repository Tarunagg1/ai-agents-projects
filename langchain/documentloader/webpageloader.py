from langchain_community.document_loaders import WebBaseLoader
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate


url = "https://en.wikipedia.org/wiki/Artificial_intelligence"

loader = WebBaseLoader(url)
documents = loader.load()


print(len(documents))

parser = StrOutputParser()
llm = ChatOpenAI(temperature=0)

prompt = PromptTemplate(
    input_variables=["question", "text"],
    template="Answer the question based on the context below.\n\nContext: {text}\n\nQuestion: {question}\n\nAnswer:",
)


chain = prompt | llm | parser
result = chain.invoke(
    {
        "question": "What is Artificial Intelligence?",
        "text": documents[0].page_content,
    }
)

print(result)


