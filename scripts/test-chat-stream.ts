async function main() {
  const query = "Tell me about your RAG and autonomous agent experience";
  console.log("Sending query to http://localhost:3000/api/chat...");
  const res = await fetch("http://localhost:3000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: [
        {
          role: "user",
          parts: [{ type: "text", text: query }],
        },
      ],
    }),
  });

  console.log("Status:", res.status);
  console.log("Headers:", Object.fromEntries(res.headers.entries()));
  const body = await res.text();
  console.log("--- Stream Body Output (first 500 chars) ---");
  console.log(body.slice(0, 500));
  console.log("--- Total length ---", body.length);
}

main().catch(console.error);
