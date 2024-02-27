import { Document } from "mongoose";
import shortUrl, {ShortUrl} from '../model/shortUrl.model'

export async function incrementAccessCount(transformedUrl:string) {

    try {
    
      const urlDoc = await shortUrl.findOneAndUpdate(
        {transformedUrl},
        {$inc: {accessCount: 1}},
        { new: true } 
      ) as Document & ShortUrl;
  
      if (!urlDoc) {
        throw new Error('Shortened URL not found');
      }
  
      return (`url_access_count : ${urlDoc.accessCount}`); 
    } catch (error) {
      console.error('Error incrementing access count:', error);
      throw error; 
    }
  }