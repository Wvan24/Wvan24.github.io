// Cloudflare Worker — GitHub OAuth proxy for Decap CMS
// 部署后在 wrangler.toml 里设置 CLIENT_ID 和 CLIENT_SECRET
// 或者在 Cloudflare Dashboard → Workers → Settings → Variables 里添加

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const clientId     = env.CLIENT_ID
    const clientSecret = env.CLIENT_SECRET

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': 'https://wvan24.github.io',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    // Step 1: /auth — redirect user to GitHub OAuth
    if (url.pathname === '/auth') {
      const params = new URLSearchParams({
        client_id: clientId,
        scope: 'repo,user',
      })
      return Response.redirect(
        `https://github.com/login/oauth/authorize?${params}`,
        302
      )
    }

    // Step 2: /callback — exchange code for access token, pass to CMS
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code')
      if (!code) {
        return new Response('Missing code', { status: 400 })
      }

      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ client_id: clientId, client_secret: clientSecret, code }),
      })

      const tokenData = await tokenRes.json()

      if (tokenData.error) {
        const html = buildPostMessageHtml('error', tokenData.error_description || tokenData.error)
        return new Response(html, { headers: { 'Content-Type': 'text/html' } })
      }

      const html = buildPostMessageHtml('success', tokenData.access_token)
      return new Response(html, { headers: { 'Content-Type': 'text/html' } })
    }

    return new Response('Not found', { status: 404 })
  },
}

function buildPostMessageHtml(status, payload) {
  const message = status === 'success'
    ? `authorization:github:success:${JSON.stringify({ token: payload, provider: 'github' })}`
    : `authorization:github:error:${payload}`

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"/></head>
<body>
<script>
(function () {
  var msg = ${JSON.stringify(message)};
  function onMessage(e) {
    window.opener.postMessage(msg, e.origin);
  }
  window.addEventListener('message', onMessage, false);
  window.opener.postMessage('authorizing:github', '*');
})();
<\/script>
</body></html>`
}
