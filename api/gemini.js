export default async function handler(request) {
  // GET や直接アクセス対策
  if (request.method !== "POST") {
    return new Response(
      JSON.stringify({
        status: "ok",
        message: "POST only"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  // ★ POST のときだけ body を読む（超重要）
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({ error: "invalid json" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  const prompt = body?.prompt;

  if (!prompt) {
    return new Response(
      JSON.stringify({ error: "prompt is required" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  // ★ まずはここで即返す（Geminiまだ呼ばない）
  return new Response(
    JSON.stringify({
      reply: "test success",
      promptReceived: prompt
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" }
    }
  );
}


/*export default async function handler(req, res) {
  const { prompt, systemInstruction, isJson } = req.body;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    systemInstruction: { parts: [{ text: systemInstruction }] },
    generationConfig: isJson ? { responseMimeType: "application/json" } : {}
  };

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY
      },
      body: JSON.stringify(payload)
    }
  );

  const data = await response.json();
  res.status(200).json(
    isJson
      ? JSON.parse(data.candidates[0].content.parts[0].text)
      : data.candidates[0].content.parts[0].text
  );
}
*/