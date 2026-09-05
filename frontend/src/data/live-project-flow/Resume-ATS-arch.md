# System Architecture & Data Flow Specification
## Resume Screening & ATS Scoring Platform

This document provides a comprehensive technical breakdown of the platform's architectural topology, design patterns, subsystem relationships, and end-to-end data flows.

---

## 1. High-Level System Architecture Diagram

The system is structured as a multi-tier, decoupled architecture adhering to clean software engineering principles. The **Gradio UI** interacts solely with the **Screening System Facade**, which orchestrates parsing, scoring, vector search, and agentic workflows.

```mermaid
graph TB
    %% Subgraphs and Styling
    classDef uiLayer fill:#e0e7ff,stroke:#4338ca,stroke-width:2px,color:#1e1b4b;
    classDef facadeLayer fill:#fef3c7,stroke:#b45309,stroke-width:2px,color:#78350f;
    classDef engineLayer fill:#dcfce7,stroke:#15803d,stroke-width:2px,color:#14532d;
    classDef dataLayer fill:#f3e8ff,stroke:#7e22ce,stroke-width:2px,color:#3b0764;
    classDef externalLayer fill:#fee2e2,stroke:#b91c1c,stroke-width:2px,color:#7f1d1d;

    subgraph UI_Tier["1. Presentation Tier (Gradio UI)"]
        UI_Upload["Tab 1: Upload & Job Requirements"]:::uiLayer
        UI_Dashboard["Tab 2: Screening Dashboard & Charts"]:::uiLayer
        UI_Agent["Tab 3: ReAct Chatbot Interface"]:::uiLayer
        UI_Settings["Tab 4: Settings & Credentials"]:::uiLayer
    end

    subgraph Facade_Tier["2. Orchestration & Facade Tier"]
        Facade["ScreeningSystemFacade (facade.py)"]:::facadeLayer
        State_Cache["In-Memory Cache\n- parsed_resumes: Dict[str, ParsedResume]\n- active_jd: str"]:::facadeLayer
    end

    subgraph Core_Subsystems["3. Core Business Logic & Subsystems"]
        subgraph Parser_Subsystem["Document Parsing Subsystem"]
            Factory["ResumeParserFactory"]:::engineLayer
            PDF_P["PDFParser (pdfplumber / pypdf)"]:::engineLayer
            DOCX_P["DocxParser (python-docx)"]:::engineLayer
        end

        subgraph Scoring_Subsystem["ATS Evaluation Subsystem"]
            Scoring_Eng["ScoringEngine (scoring.py)"]:::engineLayer
            Struct_Parse["Structured Parsing\n(ResumeDataStructure)"]:::engineLayer
            ATS_Eval["Category Scoring & Verdict\n(ATSScoringRawOutput)"]:::engineLayer
            Math_Weight["Weighted Normalizer\nOverall Score = Σ(Cat * Weight)"]:::engineLayer
        end

        subgraph RAG_Subsystem["Semantic RAG Subsystem"]
            Splitter["RecursiveCharacterTextSplitter\n(700 chars / 150 overlap)"]:::engineLayer
            Embed_Factory["EmbeddingServiceFactory"]:::engineLayer
            VS_Mgr["VectorStoreManager (vector_store.py)"]:::engineLayer
        end

        subgraph Agent_Subsystem["Conversational ReAct Agent Subsystem"]
            Agent_Mgr["ATSAgentManager (ats_agent.py)"]:::engineLayer
            Tools["LangChain Tools (tools.py)\n- list_candidates\n- get_candidate_details\n- search_resumes_rag\n- evaluate_candidate_fit"]:::engineLayer
            Agent_Exec["AgentExecutor (ReAct Loop)"]:::engineLayer
        end
    end

    subgraph Storage_Tier["4. Storage & State Persistence"]
        FAISS_DB[("Local FAISS Index\n./data/vector_db/index.faiss")]:::dataLayer
        Env_Config[(".env Config / Settings Singleton")]:::dataLayer
    end

    subgraph External_LLMs["5. External Foundation Models"]
        OpenAI_API["OpenAI API\n(gpt-4o, text-embedding-3)"]:::externalLayer
        Gemini_API["Google Gemini API\n(gemini-2.5-flash, embedding-001)"]:::externalLayer
        Groq_API["Groq Cloud API\n(llama-3.3-70b-versatile)"]:::externalLayer
        HuggingFace_Local["Local HuggingFace\n(sentence-transformers)"]:::externalLayer
    end

    %% Linkages
    UI_Upload -->|1. Upload Files & JD| Facade
    UI_Dashboard -->|2. Trigger Screening / Select Candidate| Facade
    UI_Agent -->|3. Chat Query| Facade
    UI_Settings -->|4. Update Keys & Models| Facade

    Facade <--> State_Cache
    Facade --> Factory
    Factory --> PDF_P & DOCX_P
    PDF_P & DOCX_P -->|Raw Text| Facade

    Facade --> Scoring_Eng
    Scoring_Eng --> Struct_Parse & ATS_Eval
    ATS_Eval --> Math_Weight

    Facade --> VS_Mgr
    VS_Mgr --> Splitter
    Splitter --> Embed_Factory
    Embed_Factory --> FAISS_DB

    Facade --> Agent_Mgr
    Agent_Mgr --> Agent_Exec
    Agent_Exec --> Tools
    Tools --> State_Cache
    Tools --> VS_Mgr
    Tools --> Scoring_Eng

    %% External Connections
    Struct_Parse & ATS_Eval & Agent_Exec -.-> OpenAI_API & Gemini_API & Groq_API
    Embed_Factory -.-> OpenAI_API & Gemini_API & HuggingFace_Local
    UI_Settings -.-> Env_Config
```

---

## 2. End-to-End Data Flow Diagrams

### Data Flow 1: Resume Ingestion, Structured Extraction & Vector Indexing

This sequence illustrates what happens when a recruiter uploads resumes (`.pdf` or `.docx`) and inputs a Job Description in **Tab 1**.

```mermaid
sequenceDiagram
    autonumber
    actor Recruiter as Recruiter / User
    participant UI as Gradio UI (Tab 1)
    participant Facade as ScreeningSystemFacade
    participant ParserFactory as ResumeParserFactory
    participant Parser as BaseResumeParser (PDF/Docx)
    participant ScoringEng as ScoringEngine
    participant LLM as Foundation LLM (OpenAI/Gemini/Groq)
    participant TextSplitter as RecursiveTextSplitter
    participant EmbedFactory as EmbeddingServiceFactory
    participant FAISS as Local FAISS Vector DB

    Recruiter->>UI: Upload files (resume.pdf, resume.docx) & paste JD
    UI->>Facade: set_job_description(jd_text)
    UI->>Facade: upload_and_process_resume(file_path)
    
    rect rgb(240, 248, 255)
        Note over Facade, Parser: 1. Text Extraction Phase
        Facade->>ParserFactory: get_parser(file_path)
        ParserFactory-->>Facade: Concrete Parser (PDFParser / DocxParser)
        Facade->>Parser: parse(file_path)
        Parser-->>Facade: raw_text (string)
    end

    rect rgb(240, 255, 240)
        Note over Facade, LLM: 2. LLM Structured Extraction Phase
        Facade->>ScoringEng: parse_resume_text(raw_text, filename)
        ScoringEng->>LLM: with_structured_output(ResumeDataStructure)
        LLM-->>ScoringEng: Structured JSON (Contact, Skills, Experience, Education, Certifications)
        ScoringEng-->>Facade: ParsedResume (Pydantic Object)
        Facade->>Facade: parsed_resumes[filename] = ParsedResume (In-Memory Cache)
    end

    rect rgb(255, 245, 238)
        Note over Facade, FAISS: 3. Vector Chunking & Embedding Phase
        Facade->>TextSplitter: split_text(raw_text) [chunk=700, overlap=150]
        TextSplitter-->>Facade: List of Document chunks with metadata
        Facade->>EmbedFactory: get_embeddings()
        EmbedFactory-->>Facade: Embeddings instance
        Facade->>FAISS: add_documents(chunks)
        FAISS->>FAISS: save_local("./data/vector_db")
    end

    Facade-->>UI: Processing complete status message
    UI-->>Recruiter: Display upload success and candidate count
```

---

### Data Flow 2: ATS Evaluation, Category Breakdown & Leaderboard Generation

This sequence details how candidate resumes are scored against the active Job Description, how category weights are applied, and how visual charts are rendered in **Tab 2**.

```mermaid
sequenceDiagram
    autonumber
    actor Recruiter as Recruiter / User
    participant UI as Gradio UI (Tab 2)
    participant Facade as ScreeningSystemFacade
    participant ScoringEng as ScoringEngine
    participant LLM as Foundation LLM
    participant Matplotlib as Matplotlib Engine

    Recruiter->>UI: Adjust weight sliders (Skills: 0.4, Exp: 0.35, Edu: 0.15, Cert: 0.1)
    Recruiter->>UI: Click "Execute ATS Match & Rank"
    UI->>Facade: screen_all_candidates(weights)

    loop For each ParsedResume in parsed_resumes cache
        Facade->>ScoringEng: score_resume(resume, active_jd, weights)
        Note over ScoringEng: Normalize weights to sum to 1.0
        ScoringEng->>LLM: invoke(Prompt + CandidateProfile + JD) via with_structured_output(ATSScoringRawOutput)
        LLM-->>ScoringEng: Raw Scores (0-100), SkillMatchDetail, ExperienceVerdict, Feedback, Verdict
        Note over ScoringEng: Mathematical Overall Score Calculation:<br/>overall_score = Σ(Category_Score * Normalized_Weight)
        ScoringEng-->>Facade: ATSScoringReport
    end

    Note over Facade: Sort candidate reports by overall_score descending
    Facade-->>UI: List[ATSScoringReport] (Ranked Leaderboard)
    UI-->>Recruiter: Display Leaderboard Dataframe (Rank, Name, Score, Verdict, Skills)

    opt Candidate Detailed Inspection
        Recruiter->>UI: Select candidate from dropdown
        UI->>Matplotlib: generate_breakdown_chart(skills, exp, edu, cert, overall)
        Matplotlib-->>UI: Horizontal bar chart Figure
        UI-->>Recruiter: Render Bar Chart + Detailed Recommendations Markdown
    end
```

---

### Data Flow 3: Conversational ReAct Recruiter Agent

This sequence illustrates the agentic loop when a recruiter interacts with the conversational recruiter assistant in **Tab 3**.

```mermaid
sequenceDiagram
    autonumber
    actor Recruiter as Recruiter / User
    participant UI as Gradio UI (Tab 3)
    participant Facade as ScreeningSystemFacade
    participant AgentMgr as ATSAgentManager
    participant AgentExec as LangChain AgentExecutor
    participant Tools as Agent Screening Tools
    participant FAISS as Local FAISS Vector DB
    participant Cache as Parsed Resume Cache
    participant ScoringEng as ScoringEngine
    participant LLM as Foundation LLM

    Recruiter->>UI: "Which candidate has the most Kubernetes experience and matches our JD?"
    UI->>Facade: chat_with_recruiter_agent(user_message, history)
    Facade->>AgentMgr: run_agent(user_query, history_str)
    AgentMgr->>AgentExec: invoke({"input": user_query, "active_jd": jd, "chat_history": history})

    rect rgb(254, 243, 199)
        Note over AgentExec, LLM: ReAct Iteration 1: Semantic Search
        AgentExec->>LLM: Prompt with available tools and input question
        LLM-->>AgentExec: Thought: I should search resumes for Kubernetes experience.<br/>Action: search_resumes_rag<br/>Action Input: "Kubernetes"
        AgentExec->>Tools: search_resumes_rag("Kubernetes")
        Tools->>FAISS: similarity_search_with_score("Kubernetes", k=5)
        FAISS-->>Tools: Top chunks with candidate names and similarity scores
        Tools-->>AgentExec: Observation: Found candidate Alice Smith with 4 years Kubernetes...
    end

    rect rgb(240, 253, 244)
        Note over AgentExec, LLM: ReAct Iteration 2: Fit Evaluation
        AgentExec->>LLM: Next thought based on Observation
        LLM-->>AgentExec: Thought: Now I should check Alice Smith's ATS fit.<br/>Action: evaluate_candidate_fit<br/>Action Input: "Alice Smith"
        AgentExec->>Tools: evaluate_candidate_fit("Alice Smith")
        Tools->>Cache: Lookup "Alice Smith" in parsed_resumes
        Tools->>ScoringEng: score_resume(Alice_resume, active_jd)
        ScoringEng-->>Tools: ATSScoringReport (Score: 88%, Verdict: Strongly Recommend)
        Tools-->>AgentExec: Observation: Alice has an ATS score of 88%...
    end

    rect rgb(238, 242, 255)
        Note over AgentExec, LLM: ReAct Iteration 3: Synthesis & Final Answer
        AgentExec->>LLM: Final Thought synthesis
        LLM-->>AgentExec: Thought: I now know the final answer.<br/>Final Answer: Alice Smith has the strongest Kubernetes background...
    end

    AgentExec-->>AgentMgr: {"output": final_response}
    AgentMgr-->>Facade: final_response string
    Facade-->>UI: bot_response
    UI-->>Recruiter: Formatted conversational response in chat
```

---

## 3. Detailed Component Map & Responsibilities

| Subsystem / Component | File Location | Key Classes / Functions | Primary Responsibility |
| :--- | :--- | :--- | :--- |
| **Facade Orchestrator** | `resume_ats_agent/facade.py` | `ScreeningSystemFacade` | Unified system API, lifecycle management, in-memory state coordination (`parsed_resumes`, `active_jd`). |
| **Parsing Strategy** | `resume_ats_agent/parsers/` | `BaseResumeParser`, `PDFParser`, `DocxParser` | Strategy Pattern. Robust text extraction across multi-format resumes with table and column preservation. |
| **Parser Factory** | `resume_ats_agent/parsers/factory.py` | `ResumeParserFactory` | Factory Pattern. Dynamic parser resolution based on file extension (`.pdf`, `.docx`). |
| **Scoring Engine** | `resume_ats_agent/engine/scoring.py` | `ScoringEngine`, `ResumeDataStructure`, `ATSScoringRawOutput` | LLM-based structured information extraction, weighted matching logic, score normalization, Pydantic report generation. |
| **Vector Store Manager** | `resume_ats_agent/rag/vector_store.py` | `VectorStoreManager` | Text chunking (`700`/`150`), local FAISS database persistence, deserialization, and L2 similarity search. |
| **Embedding Factory** | `resume_ats_agent/rag/embedding_service.py` | `EmbeddingServiceFactory` | Instantiates HuggingFace local models, OpenAI embeddings, or Gemini embeddings dynamically. |
| **ReAct Agent Manager** | `resume_ats_agent/agents/ats_agent.py` | `ATSAgentManager` | LangChain ReAct agent compilation, chain-of-thought prompt orchestration, and execution error recovery. |
| **Agent Screening Tools** | `resume_ats_agent/agents/tools.py` | `create_screening_tools` | Custom LangChain tools (`list_candidates`, `get_candidate_details`, `search_resumes_rag`, `evaluate_candidate_fit`). |
| **Data Models & Schemas** | `resume_ats_agent/models/schemas.py` | `ParsedResume`, `ContactInfo`, `WorkExperience`, `Education`, `ATSScoringReport`, `ATSScoreBreakdown`, `SkillMatchDetail` | Strict type validation, serialization, and standardized domain schema definitions. |
| **Configuration Singleton** | `resume_ats_agent/config/settings.py` | `Settings`, `settings` | Singleton Pattern. Global thread-safe configurations, API key updates, and environment persistence. |
| **Presentation Tier** | `resume_ats_agent/ui/app.py` | `create_gradio_app`, `generate_breakdown_chart` | Interactive web UI with 4 functional tabs, Matplotlib horizontal breakdown chart, and reactive callbacks. |

---

## 4. Software Design Patterns Implemented

```mermaid
classDiagram
    class ScreeningSystemFacade {
        -VectorStoreManager vector_store
        -ScoringEngine scoring_engine
        -ATSAgentManager agent_manager
        -Dict parsed_resumes
        -str active_jd
        +upload_and_process_resume(file_path)
        +score_single_resume(filename, weights)
        +screen_all_candidates(weights)
        +search_candidates_rag(query, k)
        +chat_with_recruiter_agent(query, history)
    }

    class BaseResumeParser {
        <<abstract>>
        +parse(file_path)* str
    }
    class PDFParser {
        +parse(file_path) str
    }
    class DocxParser {
        +parse(file_path) str
    }
    BaseResumeParser <|-- PDFParser : implements
    BaseResumeParser <|-- DocxParser : implements

    class ResumeParserFactory {
        +get_parser(file_path)$ BaseResumeParser
    }
    ResumeParserFactory ..> BaseResumeParser : creates

    class EmbeddingServiceFactory {
        +get_embeddings()$ Embeddings
    }

    class Settings {
        <<Singleton>>
        +str default_llm_provider
        +str default_model_name
        +str openai_api_key
        +str gemini_api_key
        +str groq_api_key
        +Dict default_weights
    }

    ScreeningSystemFacade --> ResumeParserFactory : uses
    ScreeningSystemFacade --> Settings : reads config
    ScreeningSystemFacade --> EmbeddingServiceFactory : uses
```

1. **Facade Pattern (`ScreeningSystemFacade`)**: Encapsulates the entire complex multi-component subsystem (parsers, vector stores, scoring engine, agent executor) behind a clean, single-point API used by the UI.
2. **Strategy Pattern (`BaseResumeParser`, `PDFParser`, `DocxParser`)**: Abstracts file parsing algorithms into interchangeable strategies selected at runtime based on file format.
3. **Factory Pattern (`ResumeParserFactory`, `EmbeddingServiceFactory`)**: Decouples client code from class instantiation, allowing dynamic selection of parser algorithms and embedding backends.
4. **Singleton Pattern (`Settings`)**: Enforces a single global configuration instance across threads, ensuring runtime UI settings changes take effect immediately across all subsystems.
