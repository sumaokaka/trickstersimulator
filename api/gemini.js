export const config = {
  runtime: "nodejs"
};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(200).json({
        status: "ok",
        message: "POST only"
      });
    }

    const body = req.body || {};
    const prompt = body.prompt;

    if (!prompt) {
      return res.status(400).json({
        error: "prompt is required"
      });
    }

    return res.status(200).json({
      reply: "test success",
      promptReceived: prompt
    });

  } catch (e) {
    return res.status(500).json({
      error: e.toString()
    });
  }
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