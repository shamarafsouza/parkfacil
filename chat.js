export default async function handler(request, response) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: { message: 'Método não permitido.' } });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return response.status(500).json({ error: { message: 'A chave da IA não foi configurada no servidor.' } });
  }

  const { system, messages } = request.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return response.status(400).json({ error: { message: 'Mensagem inválida.' } });
  }

  // Limita o histórico para evitar custos e payloads desnecessários.
  const safeMessages = messages.slice(-12).map(({ role, content }) => ({
    role: role === 'assistant' ? 'assistant' : 'user',
    content: String(content || '').slice(0, 2000)
  }));

  try {
    const anthropicResponse = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: String(system || '').slice(0, 8000),
        messages: safeMessages
      })
    });

    const data = await anthropicResponse.json();
    return response.status(anthropicResponse.status).json(data);
  } catch (error) {
    console.error('Anthropic request failed:', error);
    return response.status(502).json({ error: { message: 'Não foi possível conectar ao serviço de IA.' } });
  }
}
