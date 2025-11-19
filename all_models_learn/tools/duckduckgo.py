from langchain_community.tools import DuckDuckGoSearchRun

duckduckgo_search = DuckDuckGoSearchRun()


result = duckduckgo_search.invoke("What is the capital of France?")

print(result)