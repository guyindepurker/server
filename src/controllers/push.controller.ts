import { Request, Response } from 'express';
import axios from 'axios';
const BASE_URL = 'https://fcm.googleapis.com/fcm/send';
function createPayloadPush(title: string, body: string, platform?: string) {
  return {
    to: '/topics/all-notifications',
    notification: {
      body,
      title,
    },
  };
}
const send = async (req: any, res: Response) => {
  try {
    const key = req.query.key;
    const { title, body } = req.body;
    const payload = createPayloadPush(title, body);
    const pushRes = await axios.post(BASE_URL, payload, {
      headers: {
        Authorization: `key=${key}`,
        "Content-Type": 'application/json'
      },
    });
    console.log('Push payload sent')
    return res.status(201).send({
      data: 'Push Sent',
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      errMsg: err,
    });
  }
};
export const pushController = {
  send,
};
