import fs from "fs";
import path from "path";

// Create a minimal valid PDF binary with Arvind's resume text so it can be downloaded and opened in any PDF reader
function createSimplePdf(): Buffer {
  const content = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length 1200 >>
stream
BT
/F1 20 Tf
50 740 Td
(ARVIND KUMAR) Tj
/F1 10 Tf
0 -18 Td
(B.Tech Electronics & Communication Engineering - IIIT Pune) Tj
0 -14 Td
(Pune, India | shivantag2022@gmail.com | LinkedIn: /in/arvind-kumar-4364a0338 | GitHub: Arvindkumar-star) Tj
/F1 12 Tf
0 -26 Td
(PROFESSIONAL SUMMARY) Tj
/F1 9 Tf
0 -14 Td
(B.Tech Electronics and Communication Engineering student at IIIT Pune with hands-on experience) Tj
0 -12 Td
(building full-stack web applications and AI-powered solutions. Proficient in React.js, JavaScript,) Tj
0 -12 Td
(Node.js, Express.js, MongoDB, C++, and Python, with experience developing MERN-stack apps and GenAI.) Tj
/F1 12 Tf
0 -24 Td
(TECHNICAL SKILLS) Tj
/F1 9 Tf
0 -14 Td
(Languages & Core: Python, C++, C, JavaScript, TypeScript, SQL, Linear Algebra, Feature Engineering) Tj
0 -12 Td
(Web Development: React, Next.js, Redux, Node.js, Express.js, HTML, CSS, MongoDB, SQLite, REST APIs) Tj
0 -12 Td
(AI / ML: Generative AI, LangChain, RAG (Retrieval-Augmented Gen), Machine Learning, Image Processing) Tj
0 -12 Td
(Tools & Platforms: Git, AWS, Docker, Vercel, Software Development, Technical Leadership) Tj
/F1 12 Tf
0 -24 Td
(EXPERIENCE & PROJECTS) Tj
/F1 9 Tf
0 -14 Td
(Full-Stack & AI Application Development - Personal Projects (2025 - Present)) Tj
0 -12 Td
(- AgentFlow AI Platform: Multi-tenant autonomous agent workflow orchestration platform) Tj
0 -12 Td
(- MYCollege RAG ChatBot: Source-grounded college Q&A system with zero hallucinations) Tj
0 -12 Td
(- AI-Powered Resume Builder & ATS Analyzer: 4 specialized AI agents for ATS scoring and optimization) Tj
0 -12 Td
(- MacroSnap Nutrition Assistant: AI vision macro/calorie estimation with WhatsApp automation) Tj
0 -12 Td
(- AI-Powered Mock Interview Platform: Real-time speech evaluation & role-based interview simulation) Tj
/F1 12 Tf
0 -24 Td
(EDUCATION) Tj
/F1 9 Tf
0 -14 Td
(Indian Institute of Information Technology, Pune (IIIT Pune) - Expected Jan 2028 | GPA: 7.7) Tj
ET
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000060 00000 n 
0000000117 00000 n 
0000000241 00000 n 
0000001500 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
1570
%%EOF`;

  return Buffer.from(content, "utf-8");
}

const publicDir = path.join(process.cwd(), "public");
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const pdfBuf = createSimplePdf();
fs.writeFileSync(path.join(publicDir, "Arvind_Kumar_Resume.pdf"), pdfBuf);
fs.writeFileSync(path.join(publicDir, "resume.pdf"), pdfBuf);
console.log("Successfully generated public/Arvind_Kumar_Resume.pdf and public/resume.pdf");
