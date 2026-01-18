from langchain_community.tools import ShallTool

shell_tool = ShallTool()

result = shell_tool.invoke("echo Hello, World!")
print(result)

