const html = `<!DOCTYPE html>
<body>
  <h1>这个返回是edgefunction返回的</h1>
</body>`

async function handleRequest(request) {
  return new Response(html, {
    headers: {
      "content-type": "text/html;charset=UTF-8",
      // 测试探针禁止缓存：CDN 缓存键不含 query，nonce/no-cache 都绕不开，曾把 200 脏响应缓存住
      "cache-control": "no-store",
    },
  })
}

export default {
  async fetch(request) {
    return handleRequest(request);
  }
};
