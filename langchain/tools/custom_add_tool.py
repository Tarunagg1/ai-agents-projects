from langchain_community.tools import tool


@tool
def custom_add(a: int, b: int) -> int:
    """Custom tool to add two integers."""
    return a + b


result = custom_add.invoke({"a": 5, "b": 10})
print(f"The result of adding is: {result}")



print(custom_add.name)
print(custom_add.description)
print(custom_add.return_direct)

