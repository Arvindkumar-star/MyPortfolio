async function testChat() {
  try {
    const res = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [
          {
            id: 'msg-1',
            role: 'user',
            parts: [{ type: 'text', text: 'Tell me about your RAG and autonomous agent experience' }],
          },
        ],
      }),
    });

    console.log("Status:", res.status);
    console.log("Content-Type:", res.headers.get("content-type"));
    const text = await res.text();
    console.log("Raw Response:\n", text);
  } catch (err) {
    console.error("Test chat failed:", err);
  }
}

testChat();
