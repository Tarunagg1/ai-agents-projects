# medthod t2
from langchain.tools import StructuredTool
from pydantic import BaseModel, Field


class Add_Number_model(BaseModel):
    """Input for Add Numbers Tool"""

    num1: float = Field(..., description="The first number to add")
    num2: float = Field(..., description="The second number to add")


def add_numbers_func(num1: float, num2: float) -> float:
    """Add two numbers together."""
    return num1 + num2

add_tool = StructuredTool.from_function(
    func=add_numbers_func,
    name="add_numbers",
    description="Add two numbers together and return the result.",
    args_schema=Add_Number_model,
)


result = add_tool.invoke({"num1": 5, "num2": 10})
print(f"Result of addition: {result}")





