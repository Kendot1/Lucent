import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { image } = await request.json(); // base64 data URL

    if (!image) {
      return NextResponse.json({ error: 'Image is required' }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY || !process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'Both GEMINI_API_KEY and GROQ_API_KEY must be configured in .env.local for this pipeline.' },
        { status: 500 }
      );
    }

    // Parse the data URL
    const match = image.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
    if (!match) {
      return NextResponse.json({ error: 'Invalid image format' }, { status: 400 });
    }
    const mimeType = match[1];
    const base64Data = match[2];

    // ==========================================
    // STEP 1: Use Gemini for Vision Extraction
    // ==========================================
    const visionPrompt = `Analyze this trading chart in detail. 
Please extract:
1. The trading symbol (e.g., AAPL, BTCUSD)
2. The timeframe (e.g., 15m, 1h, 1D)
3. A detailed description of the price action, trends, key support/resistance levels, and any visible indicators.`;

    const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: visionPrompt },
              {
                inlineData: {
                  mimeType: mimeType,
                  data: base64Data
                }
              }
            ]
          }
        ],
        generationConfig: { temperature: 0.1 }
      }),
    });

    if (!geminiResponse.ok) {
      console.error('Gemini API Error:', await geminiResponse.text());
      return NextResponse.json({ error: 'Failed to extract chart data with Gemini' }, { status: geminiResponse.status });
    }

    const geminiData = await geminiResponse.json();
    const chartDescription = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!chartDescription) {
      throw new Error("No description returned from Gemini");
    }

    // ==========================================
    // STEP 2: Use Groq for Fast JSON Reasoning
    // ==========================================
    const groqPrompt = `You are an expert technical analyst. I have used a vision model to extract the contents of a trading chart. 
Here is the description of the chart:

"${chartDescription}"

Based on this description, your task is to:
1. Extract the trading symbol. If not explicitly stated, infer it or default to "UNKNOWN".
2. Extract the timeframe. If not explicitly stated, default to "15m".
3. Write a brief, punchy technical analysis (max 3 sentences) summarizing the setup.

Respond STRICTLY in JSON format with no markdown wrappers or backticks. Do not include any text outside the JSON object. Example:
{
  "symbol": "BTCUSD",
  "timeframe": "4h",
  "analysis": "Price is approaching a major resistance level at 65,000. There is a visible bullish divergence on the RSI, suggesting potential for a breakout. A bounce off the 50 EMA provides further confluence for a long setup."
}`;

    const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'user',
            content: groqPrompt
          },
        ],
        response_format: { type: "json_object" },
        temperature: 0.2,
      }),
    });

    if (!groqResponse.ok) {
      console.error('Groq API Error:', await groqResponse.text());
      return NextResponse.json({ error: 'Failed to format analysis with Groq' }, { status: groqResponse.status });
    }

    const groqData = await groqResponse.json();
    const contentText = groqData.choices[0].message.content;
    const parsed = JSON.parse(contentText);

    return NextResponse.json(parsed);

  } catch (error) {
    console.error('Error analyzing chart:', error);
    return NextResponse.json(
      { error: 'Internal server error during analysis pipeline' },
      { status: 500 }
    );
  }
}
