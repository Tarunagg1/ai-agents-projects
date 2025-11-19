import os
from langchain.llms import OpenAI

os.environ["OPENAI_API_KEY"] = "your_openai_api_key"

llm = OpenAI(temperature=0.7)

name = llm("Explain the theory of relativity in simple terms.")

print(name)


from langchain.prompts import PromptTemplate

prompt_temp = PromptTemplate(
    input_variables=["concept"],
    template="Explain the concept of {concept} in simple terms."
)

promt_yemp2 = PromptTemplate(
    input_variables=["topic"],
    template="Provide a brief summary of the topic: {topic}."
)


from langchain.chains import LLMChain

chain = LLMChain(llm=llm, prompt=prompt_temp)

chain2 = LLMChain(llm=llm, prompt=promt_yemp2)

# response = chain.run("quantum mechanics")

# response2 = chain2.run("quantum mechanics")

# print(response)
# print(response2)

from langchain.chains import SimpleSequentialChain

overall_chain = SimpleSequentialChain(chains=[chain, chain2], verbose=True)
