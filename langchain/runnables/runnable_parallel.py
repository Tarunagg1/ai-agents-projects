from langchain_openai import ChatOpenAI
from langchain_core.runnables import RunnableSequence, RunnableParallel
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv


load_dotenv()

prompt = PromptTemplate(
    input_variables=["product"],
    template="genrate a llinkdin post about {product}."
)

prompt2 = PromptTemplate(
    input_variables=["product"],
    template="Give me a creative name for a company that makes {product}."
)

model = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.9)
parser = StrOutputParser()

parallel_chain = RunnableParallel({
    "post": RunnableSequence([prompt, model, parser]),
    "company_name": RunnableSequence([prompt2, model, parser])
})


result = parallel_chain.invoke({"product": "colorful socks"})

print(result)


