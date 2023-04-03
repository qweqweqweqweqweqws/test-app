import { S3 } from 'aws-sdk';
import { NextApiRequest, NextApiResponse } from 'next';

const s3 = new S3({
    endpoint: process.env.NEXT_PUBLIC_ENDPOINT,
    region: 'ru-central1',
    accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_SECRET_KEY,
})

export async function PUT(request: Request) {
    const req = await request.json();

    const buf = Buffer.from(req.image.replace(/^data:image\/\w+;base64,/, ""),'base64')

    const params = {
        Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME ?? '',
        Key: 'spider-man.png',
        Body: buf,
        ContentEncoding: 'base64',
        ContentType: 'image/png'
    }

    const url = await s3.upload(params).promise()
}  
