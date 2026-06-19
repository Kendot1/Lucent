import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const trade = await request.json();

    if (!trade || !trade.instrument) {
      return NextResponse.json({ error: 'Trade data is required' }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: 'GROQ_API_KEY must be configured in .env.local for this feature.' },
        { status: 500 }
      );
    }

    const groqPrompt = `You are an elite trading psychologist and technical analysis coach. 
I am going to provide you with the details of a trade I recently took. 
Analyze the metrics and notes, and provide a single, actionable paragraph of constructive feedback (max 3 sentences). 
Focus on what went well, what could be improved, or a psychological tip based on the outcome and risk/reward.

Trade Details:
- Instrument: ${trade.instrument}
- Direction: ${trade.direction || 'Unknown'}
- Outcome: ${trade.outcome || 'Pending/Open'}
- Risk/Reward Ratio: ${trade.risk_reward_ratio || 'N/A'}
- Risk Amount: $${trade.risk_amount || 'N/A'}
- Reward Amount: $${trade.reward_amount || 'N/A'}
- User Notes/Context: ${trade.notes ? trade.notes.split('--- AI Suggestion ---')[0] : 'None provided'}

Provide only the constructive feedback paragraph. Do not include greetings or bullet points.`;

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
        temperature: 0.7,
        max_tokens: 250
      }),
    });

    if (!groqResponse.ok) {
      console.error('Groq API Error:', await groqResponse.text());
      return NextResponse.json({ error: 'Failed to generate suggestion with Groq' }, { status: groqResponse.status });
    }

    const groqData = await groqResponse.json();
    const suggestion = groqData.choices[0].message.content.trim();

    return NextResponse.json({ suggestion });

  } catch (error) {
    console.error('Error generating suggestion:', error);
    return NextResponse.json(
      { error: 'Internal server error during suggestion generation' },
      { status: 500 }
    );
  }
}
