import { createCommit } from '@lib/push';
import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const reqData = await request.json();
  const { content, path, message } = reqData;
  console.log("content:", content);
  console.log("message:", message);

  try {
    await createCommit(content, path, message);
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
