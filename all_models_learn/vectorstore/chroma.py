from langchain_openai import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.schema import Document

# Create 10 documents on different topics
docs = [
    Document(
        page_content="Artificial Intelligence is revolutionizing industries by enabling machines to learn from data, recognize patterns, and make decisions. Machine learning, deep learning, and neural networks are key components of AI systems that power applications like image recognition, natural language processing, and autonomous vehicles.",
        metadata={"source": "ai_overview.txt", "topic": "Artificial Intelligence"}
    ),
    Document(
        page_content="Climate change is one of the most pressing challenges facing humanity. Rising global temperatures, melting ice caps, and extreme weather events are consequences of greenhouse gas emissions. Renewable energy sources like solar and wind power are crucial for reducing our carbon footprint and combating climate change.",
        metadata={"source": "climate.txt", "topic": "Climate Change"}
    ),
    Document(
        page_content="Quantum computing harnesses the principles of quantum mechanics to process information in fundamentally new ways. Unlike classical computers that use bits, quantum computers use qubits that can exist in multiple states simultaneously. This enables them to solve complex problems exponentially faster than traditional computers.",
        metadata={"source": "quantum.txt", "topic": "Quantum Computing"}
    ),
    Document(
        page_content="Space exploration has captivated human imagination for decades. From the Apollo moon landings to Mars rovers and the International Space Station, humanity continues to push the boundaries of what's possible. Private companies like SpaceX are now making space more accessible than ever before.",
        metadata={"source": "space.txt", "topic": "Space Exploration"}
    ),
    Document(
        page_content="Blockchain technology is a decentralized ledger system that ensures transparency and security in digital transactions. Initially developed for cryptocurrencies like Bitcoin, blockchain is now being applied to supply chain management, healthcare records, voting systems, and smart contracts.",
        metadata={"source": "blockchain.txt", "topic": "Blockchain"}
    ),
    Document(
        page_content="Mental health awareness has grown significantly in recent years. Understanding conditions like anxiety, depression, and PTSD is crucial for providing proper support. Therapy, meditation, exercise, and social connections all play important roles in maintaining good mental health and overall wellbeing.",
        metadata={"source": "mental_health.txt", "topic": "Mental Health"}
    ),
    Document(
        page_content="Renewable energy sources are transforming the global energy landscape. Solar panels convert sunlight into electricity, wind turbines harness wind power, and hydroelectric dams use water flow to generate energy. These sustainable alternatives are essential for reducing dependence on fossil fuels.",
        metadata={"source": "renewable_energy.txt", "topic": "Renewable Energy"}
    ),
    Document(
        page_content="Biotechnology combines biology and technology to develop innovative solutions for medicine, agriculture, and industry. CRISPR gene editing allows precise modifications to DNA, while synthetic biology creates new biological systems. These advances promise revolutionary treatments for diseases and sustainable food production.",
        metadata={"source": "biotech.txt", "topic": "Biotechnology"}
    ),
    Document(
        page_content="Cybersecurity is critical in our interconnected digital world. Threats like ransomware, phishing, and data breaches pose significant risks to individuals and organizations. Encryption, multi-factor authentication, regular security updates, and employee training are essential components of a robust cybersecurity strategy.",
        metadata={"source": "cybersecurity.txt", "topic": "Cybersecurity"}
    ),
    Document(
        page_content="Ancient civilizations like Egypt, Rome, Greece, and the Indus Valley have left lasting legacies on modern society. From architectural marvels like pyramids and aqueducts to philosophical teachings and democratic principles, these cultures shaped the foundations of art, science, governance, and human thought.",
        metadata={"source": "ancient_history.txt", "topic": "Ancient History"}
    )
]

# Initialize Chroma vector store
vectorStore = Chroma(
    embedding_function=OpenAIEmbeddings(),
    collection_name="sample_collection",
    persist_directory="./chroma_persist",
)


vectorStore.add_documents(docs)


vectorStore.get(include=["metadatas", "documents"])


vectorStore.similarity_search(
    "What are the benefits of renewable energy sources?",
    k=3,
    include_metadata=True
)
