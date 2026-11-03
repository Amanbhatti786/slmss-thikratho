export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, message } = req.body;

  const GATEWAY_DEVICE_TOKEN = "El-34Fc8RvW1aia3_S7ikw:APA91bFBYAgMe9Hzcyyc8Kl9qqV4oGbsRFWU0G6mU0DLvRUm0XWFjMdYDYJTFkxEz21oqb6SUucbt8bYrmEhmQoWq8r694BMwb98L5hEUMJHo3Yw_kRo_ko";

  try {
    // Server se Traccar Gateway FCM par direct push trigger
    const fcmResponse = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `key=${GATEWAY_DEVICE_TOKEN}`
      },
      body: JSON.stringify({
        to: GATEWAY_DEVICE_TOKEN,
        priority: 'high',
        data: {
          phone: to,
          message: message,
          text: message
        }
      })
    });

    const data = await fcmResponse.json().catch(() => ({}));
    return res.status(200).json({ success: true, result: data });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
