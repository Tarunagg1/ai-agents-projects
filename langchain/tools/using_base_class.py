# method 2 for tool creation using base class

from langchain.tools import BaseTool
from typing import Type
from pydantic import BaseModel, Field



class Add_Number_model(BaseModel):
    """Input for Add Numbers Tool"""

    num1: float = Field(..., description="The first number to add")
    num2: float = Field(..., description="The second number to add")


class AddNumbersInput(BaseTool):
    name: str = "add_numbers"
    description: str = "Add two numbers together and return the result."

    args_schema: Type[BaseModel] = Add_Number_model


    def _run(self, num1: float, num2: float) -> float:
        """Add two numbers together."""
        return num1 + num2

add_tool = AddNumbersInput()
result = add_tool.invoke({"num1": 5, "num2": 10})
print(f"Result of addition: {result}")





