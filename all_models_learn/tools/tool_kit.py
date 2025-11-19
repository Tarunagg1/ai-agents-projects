from langchain_community.tools import tool

@tool
def custom_add(a: int, b: int) -> int:
    """Custom tool to add two integers."""
    return a + b

@tool
def custom_subtract(a: int, b: int) -> int:
    """Custom tool to subtract two integers."""
    return a - b

class MathToolKit:
    def get_tools(self):
        return [custom_add, custom_subtract]

tools = MathToolKit().get_tools()

for t in tools:
    print(f"Tool Name: {t.name}")
    print(f"Description: {t.description}")
    print(f"Return Direct: {t.return_direct}")

