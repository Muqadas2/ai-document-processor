
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function analyzeDocument(text: string): Promise<{
  summary: string;
  tags: string[];
  documentType: string;
}> {
  const message = await client.messages.create({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `Analyze this document and provide:
1. A 2-sentence summary
2. 5 relevant tags
3. Document type (e.g., contract, research paper, invoice, email)

Document:
${text.slice(0, 5000)}` // Limit to first 5000 chars for testing
      }
    ],
  });

  const content = message.content[0];
  if (content.type !== 'text') {
    throw new Error('Unexpected response type');
  }

  // Parse response (simple regex for demo)
  const text_response = content.text;
  const summary = text_response.match(/Summary:.*?\n/)?.[0]?.replace('Summary:', '').trim() || 'N/A';
  const tagsMatch = text_response.match(/Tags:.*?\n/)?.[0];
  const tags = tagsMatch ? tagsMatch.replace('Tags:', '').split(',').map(t => t.trim()) : [];
  const typeMatch = text_response.match(/Type:.*?\n/)?.[0];
  const documentType = typeMatch ? typeMatch.replace('Type:', '').trim() : 'Unknown';

  return { summary, tags, documentType };
}

export async function generateQAResponse(
  question: string,
  documentText: string
): Promise<string> {
  const stream = await client.messages.stream({
    model: 'claude-3-5-sonnet-20241022',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: `Based on this document, answer the question.\n\nDocument:\n${documentText.slice(0, 3000)}\n\nQuestion: ${question}`
      }
    ],
  });

  let fullResponse = '';
  for await (const event of stream) {
    if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
      fullResponse += event.delta.text;
    }
  }

  return fullResponse;
}