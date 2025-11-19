from langchain_openai  import ChatOpenAI
from dotenv          import load_dotenv
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers  import StrOutputParser
from langchain_core.output_parsers import PydanticOutputParser
from pydantic import BaseModel
from langchain_core.runnables import RunnableBranch, RunnableLambda

load_dotenv()  # Load environment variables from .env file

parser = StrOutputParser()

model = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)

class sentimentResponse(BaseModel):
    sentiment: str

parser2 = PydanticOutputParser(pydantic_object=sentimentResponse)

prompt1 = PromptTemplate(
    input_variables=["text"],
    template="classify the following text into positive, negative or neutral sentiment: {text}.",
    partial_variables={
        "format_instruction": parser2.get_format_instructions()
    }
)

classifier_chain = prompt1 | model | parser2


prompt2 = PromptTemplate(
    input_variables=["text"],
    template="write a appropriate response to this positive feedback : {text}",
)

prompt3 = PromptTemplate(
    input_variables=["text"],
    template="write a appropriate response to this negative feedback : {text}",
)

positive_chain = prompt2 | model | parser
negative_chain = prompt3 | model | parser

branching_chain = RunnableBranch(
    (lambda x: x.sentiment == "positive", positive_chain),
    (lambda x: x.sentiment == "negative", negative_chain),
    RunnableLambda(lambda x: "Thank you for your feedback.")
)

chain = classifier_chain | branching_chain

response = chain.invoke({"text": "The product quality is outstanding and exceeded my expectations!"})

print(response)

chain.get_graph().print_ascii()
