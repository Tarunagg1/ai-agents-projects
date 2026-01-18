from langchain.text_splitter import RecursiveCharacterTextSplitter

text = """LangChain is a framework for developing applications powered by language models. It can be used for chatbots, Generative Question-Answering (GQA), summarization, and much more. """



splitter = RecursiveCharacterTextSplitter(
    chunk_size=50,
    chunk_overlap=0,
    length_function=len,
)