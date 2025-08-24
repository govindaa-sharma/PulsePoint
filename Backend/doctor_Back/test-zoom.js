// test-zoom.js
const axios = require('axios');

const ZOOM_API_KEY = 'IRNAXVtkQHC90jBQI9sn3A';
const ZOOM_API_SECRET = 'DbOfHFmcdsS7FLXq3gvWos6toruGXXhO';
const ZOOM_ACCOUNT_ID = 'devYld89QyqtLztvUjmOWA';

async function testZoomConnection() {
  try {
    const authResponse = await axios.post('https://zoom.us/oauth/token', null, {
      params: {
        grant_type: 'account_credentials',
        account_id: ZOOM_ACCOUNT_ID
      },
      headers: {
        'Authorization': `Basic ${Buffer.from(`${ZOOM_API_KEY}:${ZOOM_API_SECRET}`).toString('base64')}`
      }
    });

    console.log('✅ Zoom connection successful!');
    console.log('Access Token:', authResponse.data.access_token);
    return true;
  } catch (error) {
    console.error('❌ Zoom connection failed:');
    console.error(error.response?.data || error.message);
    return false;
  }
}

testZoomConnection();