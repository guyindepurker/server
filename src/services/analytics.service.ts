import { google } from 'googleapis';

export const getAccessToken = async (basicAuth: string) => {
    const token = Buffer.from(basicAuth.split(" ")[1], 'base64').toString()
    const scops = 'https://www.googleapis.com/auth/analytics';
    const [email,privateKey] = token.split(':')
    const jwt = new google.auth.JWT(
      email,
      null,
      privateKey.replace(/\\n/g, '\n'),
      scops
    );
    const res = await jwt.refreshAccessToken();
    const {access_token, expiry_date} = res.credentials;
    return {
        accessToken: access_token,
        expire: expiry_date
    }
}

export const getUrl = (viewId: string) => `https://content-analyticsdata.googleapis.com/v1beta/properties/${viewId}:runReport?alt=json`
