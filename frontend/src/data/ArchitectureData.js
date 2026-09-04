// Simplified, illustrative architecture maps for real, shipped projects (see ProjectData.js
// for the full write-ups). Node/edge shapes here are deliberately generic (client / app /
// service / data) so ArchitecturePanel can lay out any entry the same way.

const architectureData = {
  'Resume Screening & ATS Scoring Platform': {
    nodes: {
      client: { label: 'Gradio UI', sublabel: '4-tab client', kind: 'client', latency: 8, description: "Recruiter uploads resumes and a JD (Tab 1), reviews the ranked leaderboard (Tab 2), and chats with the ReAct agent (Tab 3)." },
      app: { label: 'Screening Facade', sublabel: 'ScreeningSystemFacade (facade.py)', kind: 'app', latency: 14, description: "Single orchestration entry point coordinating parsing, scoring, RAG retrieval, and the ReAct agent.", tags: ['ATSAgentManager', 'AgentExecutor (ReAct loop)', 'list_candidates', 'get_candidate_details'] },
      service1: { label: 'Resume Parser', sublabel: 'PDFParser / DocxParser → GPT-4o extraction', kind: 'service', latency: 58, description: "Extracts raw text via pdfplumber/python-docx, then structures it into a ResumeDataStructure via LLM structured output." },
      service2: { label: 'ATS Scoring Engine', sublabel: 'GPT-4o · Gemini · Groq', kind: 'service', latency: 112, description: "Scores each category against the JD and computes overall_score = Σ(category × weight); also powers the agent's evaluate_candidate_fit tool.", tags: ['evaluate_candidate_fit tool'] },
      data: { label: 'FAISS Vector Store', sublabel: 'Local index · 700/150 chunking', kind: 'data', latency: 12, description: "Stores resume chunk embeddings; queried by the ReAct agent's search_resumes_rag tool for semantic candidate search.", tags: ['search_resumes_rag tool'] },
    },
    flows: [
      { label: 'Upload & index resume', path: ['client', 'app', 'service1', 'data'] },
      { label: 'Score candidate vs JD', path: ['client', 'app', 'service2'] },
      { label: 'Chat: ReAct agent reasoning loop', path: ['client', 'app'] },
    ],
  },

  'MyTripMate: AI-powered Trip Planner': {
    nodes: {
      client: { label: 'ADK Web Server', sublabel: 'adk web · Docker · Cloud Run', kind: 'client', latency: 10, description: "Traveler's request enters through the ADK web server and reaches the root agent." },
      app: { label: 'Root Agent', sublabel: 'my_trip_mate_agent', kind: 'app', latency: 18, description: "before_agent_callback loads the user's profile, then routes to travel_brainstormer (if no destination yet) or straight to the itinerary_planner." },
      service1: { label: 'Itinerary Planner', sublabel: 'Gemini + weather_agent + search_agent', kind: 'service', latency: 120, description: "Builds the attractions list and day-by-day plan, calling weather_agent and Google Search grounding as AgentTools, then saves the draft to session state.", tags: ['travel_brainstormer', 'weather_agent', 'search_agent'] },
      service2: { label: 'Planning & Booking', sublabel: 'planing_agent → booking_orchestrator', kind: 'service', latency: 96, description: "10 flight/train/bus/ship/hotel specialist agents shortlist transport and stay, then hand off to booking_orchestrator — a fully mocked EaseMyTrip checkout with no real payment gateway.", tags: ['flight/train/bus/ship ×8', 'hotel ×2', 'booking_orchestrator'] },
      data: { label: 'Local JSON Store', sublabel: 'profiles/ · itinerary/', kind: 'data', latency: 20, description: "save_to_file() appends a full snapshot per user on every planning and booking pass — flat append-only files, not a database (Firebase is named in the README but not actually wired up)." },
    },
    flows: [
      { label: 'Plan itinerary', path: ['client', 'app', 'service1', 'data'] },
      { label: 'Book trip (mocked checkout)', path: ['client', 'app', 'service2'] },
    ],
  },

  'Steganography Tool': {
    nodes: {
      client: { label: 'Encoder / Decoder UI', sublabel: 'Encoder.tsx · Decoder.tsx', kind: 'client', latency: 6, description: "User picks an image, types a message, and optionally sets a password — both pages draw the file to an off-screen <canvas>." },
      app: { label: 'App.js Router', sublabel: 'React Router · BrowserRouter', kind: 'app', latency: 3, description: "Routes \"/\" to Encoder and \"/decoder\" to Decoder; both call the same utility layer, entirely in-browser with no server round trip." },
      service1: { label: 'steganography.ts', sublabel: 'LSB encode/decode · Canvas 2D API', kind: 'service', latency: 9, description: "Writes or reads one message bit per pixel in the red channel's LSB and appends a |||END||| terminator; rejects messages needing more than (n + 9) × 8 pixels." },
      service2: { label: 'crypto-js', sublabel: 'AES.encrypt / AES.decrypt', kind: 'service', latency: 5, description: "Encrypts or decrypts the message with the typed password as passphrase, only when the Encrypt/Decrypt checkbox is checked." },
      data: { label: 'stego.png', sublabel: 'download ⇄ re-upload', kind: 'data', latency: 2, description: "The only thing that crosses from Encoder to Decoder — a PNG the user downloads and re-uploads. Nothing is persisted server-side (an api.ts client for localhost:5000 exists in the repo but is never called)." },
    },
    flows: [
      { label: 'Encode message into image', path: ['client', 'app', 'service1', 'data'] },
      { label: 'Password-protect the payload', path: ['client', 'app', 'service2'] },
    ],
  },

  'Sonam Portfolio': {
    nodes: {
      client: { label: 'React App', sublabel: 'This site', kind: 'client', latency: 4, description: 'Visitor fills out the contact form.' },
      app: { label: 'Express API', sublabel: 'Node.js', kind: 'app', latency: 9, description: 'Validates the payload and relays it to the mail service.' },
      service1: { label: 'Nodemailer', sublabel: 'SMTP client', kind: 'service', latency: 15, description: 'Builds the outgoing email from the form fields.' },
      data: { label: 'Gmail SMTP', sublabel: 'Delivery', kind: 'data', latency: 180, description: 'Delivers the message to the inbox.' },
    },
    flows: [
      { label: 'POST /send-email', path: ['client', 'app', 'service1', 'data'] },
    ],
  },
};

module.exports = { architectureData };
