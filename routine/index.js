export default {
  async fetch(request) {
    const resp = await fetch(request);
    const out = new Response(resp.body, resp);
    out.headers.set('x-edge-function', 'first');
    return out;
  },
};
