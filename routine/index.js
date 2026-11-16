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
