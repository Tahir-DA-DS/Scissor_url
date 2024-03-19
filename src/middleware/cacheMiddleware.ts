import { Request, Response, NextFunction } from 'express';
import NodeCache from 'node-cache';


const cache = new NodeCache()

function cacheMiddleware(req: Request, res: Response, next: NextFunction) {
    const key = JSON.stringify({
        body: req.body,
        params: req.params.transformedUrl
    });

    const cachedData = cache.get(key);
    console.log('Cache hit for key:', key)
    console.log('Cache content:', cache.keys())
    if (cachedData) {
        res.send(cachedData);
    } else {
        console.log('Cache miss for key:', key)
        next();
    }
}

export default cacheMiddleware