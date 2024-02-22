import {Express, Request, Response} from 'express'
import {createShortUrl, handleRedirect, Genqrcode, getAnalytics} from '../controller/shortUrl.ctrl'
import validateResource from '../middleware/validate.resource'

function routes(app:Express){

    app.post('/api/url', validateResource(), createShortUrl)

    app.get("/:transformedUrl", handleRedirect)

    app.get('/analytics/:transformedUrl', getAnalytics)

    app.get('/qr/:transformedUrl', Genqrcode)



}

export default routes