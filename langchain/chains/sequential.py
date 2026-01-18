from langchain_openai import ChatOpenAI
from langchain_core.prompts  import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv


load_dotenv()  # Load environment variables from .env file

prompt1 = PromptTemplate(
    template="What is a good name for a company that makes {product}?",
    input_variables=["product"],
)

prompt2 = PromptTemplate(
    template="Give me a slogan for a company named {company_name}.",
    input_variables=["company_name"],
)

model = ChatOpenAI(temperature=0)

parser = StrOutputParser()

chain = prompt1 | model | parser | prompt2 | model | parser

chain.invoke({"product": "colorful socks"})

chain.get_graph().print_ascii()


