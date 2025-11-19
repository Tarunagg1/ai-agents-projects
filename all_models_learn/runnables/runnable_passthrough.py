from langchain_openai import ChatOpenAI
from langchain_core.runnables import RunnablePassthrough, RunnableSequence, RunnableParallel
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv


load_dotenv()

prompt = PromptTemplate(
    input_variables=["product"],
    template="genrate a llinkdin post about {product}."
)

proompt2 = PromptTemplate(
    input_variables=["product"],
    template="Give me a creative name for a company that makes {product}."
)

model = ChatOpenAI(model="gpt-3.5-turbo", temperature=0.9)

parser = StrOutputParser()

joke_generator = RunnableSequence(prompt, model, parser)


parallet_chain = RunnableParallel({
    "post": RunnableSequence(proompt2, model, parser),
    "company_name": RunnablePassthrough()
})

final_chain = RunnableSequence(joke_generator, parallet_chain)

result = final_chain.invoke({"product": "colorful socks"})

print(result)





