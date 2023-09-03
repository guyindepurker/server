import { Request,Response } from 'express';
import axios from 'axios';

import { getAccessToken,getUrl } from '../services/analytics.service';

const token = async (req: Request, res: Response) => {
    try {
        console.log(req.headers)
       const creds = await getAccessToken(req.headers.authorization);
       console.log('retrive token',creds);
       return res.status(201).send(creds);
    } catch (err) {
        return res.status(500).send({err});
    }
}

const getAnalyticsData =  async (req: any, res: Response) => {
    try {
        const url = getUrl(req.params.viewId as string);
        const data = req.body;
        const resGa4 = await axios.post(url, data, {headers: {Authorization: 'Bearer ' + req.token }})
        const resObject:any = {
            data: resGa4.data
        }
        if (req.expire) {
            resObject.token.token = req.token;
            resObject.token.expire = req.expire
        }
        return res.status(201).send(resObject);
    } catch (err) {
        return res.status(500).send({err});
    }
}

export const analyticsController = {
    getAnalyticsData,token

}