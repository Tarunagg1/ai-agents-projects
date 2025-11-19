from langchain_community.document_loaders import DirectoryLoader, PyMuPDFLoader


loader = DirectoryLoader(
    path="documentloader/example_data/",
    loader_cls=PyMuPDFLoader,
    glob="*.pdf"
)


documents = loader.lazy_load()

print(len(documents))

for doc in documents:
    print(doc.page_content)



