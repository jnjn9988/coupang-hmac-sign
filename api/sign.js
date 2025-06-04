export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { accessKey, secretKey, method, path } = req.body;
  const timestamp = Date.now().toString();
  const crypto = require('crypto');
  const message = timestamp + method + path;

  const signature = crypto.createHmac('sha256', secretKey)
    .update(message)
    .digest('base64');

  const authHeader = `CEA algorithm=HmacSHA256, access-key=${accessKey}, signed-date=${timestamp}, signature=${signature}`;

  res.status(200).json({
    Authorization: authHeader,
    'X-Coupang-Date': timestamp
  });
}
