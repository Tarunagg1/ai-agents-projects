from langchain_openai   import ChatOpenAI
from dotenv          import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers  import StrOutputParser
from langchain_anthropic import ChatAnthropic
from langchain_core.runnables import RunnableParallel

load_dotenv()  # Load environment variables from .env file


model1 = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)

model2 = ChatAnthropic(model="claude-2", temperature=0)

prompt1 = PromptTemplate(
    input_variables=["text"],
    template="genrate short and simple notes from the following text: {text}.",
)

prompt2 = PromptTemplate(
    input_variables=["text"],
    template="genrate the 5 short questions answer from tha following text {text}",
)


prompt3 = PromptTemplate(
    input_variables=["text", "quiz"],
    template="merge and provide notes and quiz  into single document notes: {text}. and quiz {quiz}",
)

parser = StrOutputParser()


parallel_chains = RunnableParallel({
    "notes": model1 | prompt1 | parser,
    "quiz": model2 | prompt2 | parser
})

merge_chain = prompt3 | model1 | parser

chain = parallel_chains | merge_chain

result = chain.invoke({"text": "LangChain is a framework for developing applications powered by language models. It provides tools and abstractions to simplify the process of building complex applications that leverage the capabilities of large language models. With LangChain, developers can create chatbots, virtual assistants, and other AI-driven applications with ease."})

print(result)

chain.get_graph().print_ascii()




