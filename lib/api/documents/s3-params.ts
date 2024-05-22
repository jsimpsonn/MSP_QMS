// pages/api/s3-params.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const s3 = new S3Client({
  forcePathStyle: true,
  region: process.env.SUPABASE_REGION,
  endpoint: process.env.SUPABASE_STORAGE_URL,
  credentials: {
    accessKeyId: process.env.SUPABASE_PROJECT_REF!,
    secretAccessKey: process.env.SUPABASE_ANON_KEY!,
    sessionToken: process.env.SUPABASE_SESSION_TOKEN!
  }
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { filename, contentType } = req.body;

  if (!filename || !contentType) {
    return res.status(400).json({ error: 'Filename and contentType are required' });
  }

  try {
    const command = new PutObjectCommand({
      Bucket: process.env.SUPABASE_BUCKET_NAME,
      Key: filename,
      ContentType: contentType,
      ACL: 'public-read',
    });

    const url = await getSignedUrl(s3, command, { expiresIn: 60 });

    res.status(200).json({
      method: 'PUT',
      url,
      fields: {
        'x-amz-acl': 'public-read'
      }
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}
