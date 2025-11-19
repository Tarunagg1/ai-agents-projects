from langchain_core.document_loaders import CSVLoader


loader = CSVLoader(file_path="documentloader/example_data/sample_data.csv")
documents = loader.load()

print(len(documents))

