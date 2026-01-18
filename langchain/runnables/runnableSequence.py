from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv
from langchain_core import RunnableSequence


load_dotenv()


prompt = PromptTemplate(
    input_variables=["product"],
    template="Give me a creative name for a company that makes {product}."
)

model = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.9)
parser = StrOutputParser()

chain = RunnableSequence([prompt,model,parser])

result = chain.invoke({"product": "colorful socks"})

print(result)
