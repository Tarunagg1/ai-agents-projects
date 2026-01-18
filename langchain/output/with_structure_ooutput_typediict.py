from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
from typing import TypedDict

load_dotenv()



model = ChatOpenAI(model_name="gpt-4", temperature=0)

class Review(TypedDict):
    summary: str
    sentiment: str


structure_model = model.with_structured_output(Review)


structure_model.invoke("""The movie was fantastic! I really enjoyed the plot and the characters were well developed.""")
