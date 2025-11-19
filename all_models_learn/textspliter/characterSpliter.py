from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import PyMuPDFLoader


loader = PyMuPDFLoader("example.pdf")
documents = loader.load()


text = """LangChain is a framework for developing applications powered by language models. It can be used for chatbots, Generative Question-Answering (GQA), summarization, and much more. """

splitter = CharacterTextSplitter(
    separator="\n",
    chunk_size=50,
    chunk_overlap=0,
    separator="",
    length_function=len,
)

splits = splitter.split_text(text)
print(splits)

result = splitter.split_documents(documents)


print(result[0].page_content)


