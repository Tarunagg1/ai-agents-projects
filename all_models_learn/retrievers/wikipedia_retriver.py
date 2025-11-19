from langchain_community.retrievers import WikipediaRetriever

retriver = WikipediaRetriever(
    top_k=5,
    language="en",
    summarize=True,
)

query = "Explain the significance of the theory of relativity."

docs = retriver.invoke(query)

print(docs)

for i, doc in enumerate(docs):
    print(f"Document {i+1}:\n{doc.page_content}\nMetadata: {doc.metadata}\n")

# Note: Ensure that the 'langchain_community' package is installed in your environment.