try:
    import langchain_text_splitters
    print("langchain_text_splitters: found")
except ImportError:
    print("langchain_text_splitters: not found")

try:
    from langchain.text_splitter import RecursiveCharacterTextSplitter
    print("langchain.text_splitter: found")
except ImportError as e:
    print(f"langchain.text_splitter error: {e}")
