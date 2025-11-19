from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

load_dotenv()  # Load environment variables from .env file


prompt = PromptTemplate(
    template="Translate the following English text to French: {text}",
    input_variables=["text"],
)


model = ChatOpenAI(temperature=0)

parser = StrOutputParser()

chain = prompt | model | parser

result = chain.invoke({"text": "Hello, how are you?"})

print(result)  # Expected output: "Bonjour, comment ça va ?"
