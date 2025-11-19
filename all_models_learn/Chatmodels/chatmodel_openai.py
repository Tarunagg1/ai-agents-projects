from langchain_openai import ChatOpenAI
from dotenv import load_dotenv

load_dotenv()


model = ChatOpenAI(temperature=0, model_name="gpt-4o-mini", max_completion_tokens=10)

result = model.invoke("Say foo bar baz qux")

print(result.content)
