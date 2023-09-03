import { NextFunction,Response } from 'express';
import moment from 'moment';

import { getAccessToken } from '../services/analytics.service';

export const analyticsAuth = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.query.expire ||!req.query.token || !req.headers.authorization) {
        return res.status(404).send('missing fields')
    }
    const isTokenExpire = moment(parseInt(req.query.expire)).isBefore(moment());
    if (isTokenExpire) {
      const creds = await getAccessToken(req.headers.authorization);
      req.token = creds.accessToken;
      req.expire = creds.expire;
    } else {
        req.expire = 0;
        req.token = req.query.token;
    }

    return next();
  } catch (err) {
    return res.status(500).send({
      errMsg: err,
    });
  }
};
