// EdgeFunction 入口文件（edgeFunctionFirst 生效的前提：entry 指向的文件必须真实存在且路径正确）
// 只做轻量网关逻辑：打一个标记头后放行给 静态资源 / RegionFunction，
// 便于用响应头 x-edge-function 验证 edgeFunctionFirst 是否真正前置执行。
// 注意：handler 签名以平台 EdgeFunction 规范为准，若平台为 (req, ctx) 单函数导出请相应调整。
addEventListener('fetch', (event) => {
  event.respondWith(handle(event));
});

async function handle(event) {
  // fetch(event.request) 即"放行"：继续走静态资源 / RegionFunction
  const resp = await fetch(event.request);
  const out = new Response(resp.body, resp);
  out.headers.set('x-edge-function', 'first');
  return out;
}
