from langchain_openai import ChatOpenAI
from langchain_core.tools import tool
from langchain_core.messages import HumanMessage
import requests
# tool create
from langchain_core.tools import InjectedToolArg
from typing import Annotated
import json


@tool
def add(a: int, b: int) -> int:
    """Add two numbers together."""
    return a + b


@tool
def get_conversion_factor(base_currency: str, target_currency: str) -> float:
  """
  This function fetches the currency conversion factor between a given base currency and a target currency
  """
  url = f'https://v6.exchangerate-api.com/v6/c754eab14ffab33112e380ca/pair/{base_currency}/{target_currency}'

  response = requests.get(url)

  return response.json()

@tool
def convert(base_currency_value: int, conversion_rate: Annotated[float, InjectedToolArg]) -> float:
  """
  given a currency conversion rate this function calculates the target currency value from a given base currency value
  """

  return base_currency_value * conversion_rate

llm = ChatOpenAI(model="gpt-4", temperature=0)

llm_with_tool = llm.bind_tools([add, get_conversion_factor, convert])

query = HumanMessage("Can you add the 5 + 3?")

messages = [
    query
]

result = llm_with_tool.invoke(messages)

messages.append(result)

# result.tool_calls[0].result  # should be 8


tool_result = add.invoke(result.tool_calls[0])  # should also be 8

messages.append(tool_result)


ai_message = llm_with_tool.invoke(messages)


for tool_call in ai_message.tool_calls:
    if tool_call.tool.name == "get_conversion_factor":
        # get conversion factor tool call
        tool_result = get_conversion_factor.tool.invoke(tool_call)
        messages.append(tool_result)
    
        conversion_rate = json.load(tool_result.content)["conversion_rate"]

    if tool_call.tool.name == "convert":
        # convert tool call
        tool_call.args["conversion_rate"] = conversion_rate
        tool_result = convert.tool.invoke(tool_call)
        messages.append(tool_result)

final_ai_message = llm_with_tool.invoke(messages)

print(final_ai_message.content)


