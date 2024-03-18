import {Request, Response} from 'express'
import shortUrl from '../model/shortUrl.model'
import shortid from 'shortid'
import qr from 'qr-image';
import AnalyticsModel, {Analytics} from '../model/Analytics.model'

export async function createShortUrl(req:Request, res:Response){

    const {destination, customAlias} = req.body

    try {

        let transformedUrl;
        if (customAlias) {
          const existingUrl = await shortUrl.findOne({ shortId: customAlias });
          if (existingUrl) {
            return res.status(400).json({ error: 'Custom alias is already in use.' });
          }
          transformedUrl = customAlias;
        } else {
         
          transformedUrl = shortid.generate();
        }
    
        const newUrl = new shortUrl({
          destination,
          transformedUrl,
        });
    
        await newUrl.save();
    
        res.json({transformedUrl});
        
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
    }

}

export async function handleRedirect(req: Request, res: Response) {
  try {
    const {transformedUrl}= req.params;

    const short = await shortUrl.findOne({transformedUrl}).lean();

    if (!short) {
      return res.sendStatus(404);
    }
    await AnalyticsModel.create({
      shortUrl: transformedUrl,
      timestamp: new Date(),
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    await AnalyticsModel.findOneAndUpdate(
      { shortUrl: transformedUrl },
      { $inc: { accessCount: 1 } }
    );

    return res.redirect(short.destination);
  } catch (error) {
    console.error("Error handling redirect:", error);
    res.sendStatus(500); 
  }
}


export async function Genqrcode(req:Request, res:Response){
  const {transformedUrl} = req.params
  const qrCode = qr.image(`http://localhost:4000/${transformedUrl}`, { type: 'png' });
  res.type('png');
  qrCode.pipe(res);
}

export async function getAnalytics(req: Request, res: Response) {
  try {
    const { transformedUrl } = req.params;

    const analyticsData: Analytics[] = await AnalyticsModel.find({ shortUrl: transformedUrl });

    if (analyticsData.length === 0) {
      return res.status(404).json({ error: 'Analytics data not found' });
    }

    const totalAccessCount: number = analyticsData.reduce((total, data) => total + data.accessCount, 0);

    const response = {
      totalAccessCount,
      analyticsData
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


