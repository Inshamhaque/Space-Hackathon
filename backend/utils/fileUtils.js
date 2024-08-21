import fs from 'fs';
import path from 'path';
import { MIMEType } from 'util';
export function fileToGenerativePart(){
    return{
        inlineData:{
            data : Buffer.from(fs.readFileSync(path).toString('base64')),
            MIMEType,
        },
    };
}
