import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  try {
    const { question } = await req.json();
    const apiKey = Deno.env.get('OPENROUTER_API_KEY');
    const model = 'nvidia/nemotron-3-super-120b-a12b:free';

    if (!apiKey) {
      throw new Error('OPENROUTER_API_KEY not configured');
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://yourdomain.com',
        'X-Title': 'Gaming Store AI Assistant',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'user',
            content: `You are a helpful gaming store assistant. Answer questions about gaming products. Question: ${question}`
          }
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify({ answer: data.choices[0].message.content }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});