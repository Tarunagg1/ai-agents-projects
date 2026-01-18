from langchain_openai import ChatOpenAI
from langchain_community.document_loaders import PyPDFLoader
from langchain_core.prompts import PromptTemplate
from dotenv import load_dotenv
from langchain_core.output_parsers import StrOutputParser

load_dotenv()


model = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)
prompt = PromptTemplate(
    input_variables=["text"],
    template="Summarize the following text:\n\n{text}\n\nSummary:",
)

parser = StrOutputParser()

loader = PyPDFLoader("documentloader/example_data/sample.pdf")
documents = loader.load()

print(documents[0].page_content)
chain = prompt | model | parser
result = chain.invoke({"text": documents[0].page_content})
print("Summary:", result)


