// pages/api/generate-pdf.js
import { NextApiRequest, NextApiResponse } from 'next';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { fourthResponse, fifthAnswer,  imageBase64 } = req.body; // Get the image base64 string

  const doc = new PDFDocument();
  let buffers:any[] = [];
  doc.on('data', buffers.push.bind(buffers));
  doc.on('end', () => {
    let pdfData = Buffer.concat(buffers);
    res.writeHead(200, {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=dashboard_improvements.pdf',
      'Content-Length': pdfData.length,
    });
    res.end(pdfData);
  });

  doc.fontSize(25).text('How to Improve Your Dashboard', { align: 'center' });
  console.log("💨💨💨", fourthResponse);
  if (imageBase64) {
    const imageBuffer = Buffer.from(imageBase64, 'base64');
    doc.image(imageBuffer, {
      fit: [500, 300], // Adjust the size as needed
      align: 'center',
      valign: 'center',
    });
  }

  doc.moveDown();
  doc.fontSize(12).text(fourthResponse, { align: 'left' });
  doc.moveDown();
  doc.fontSize(12).text(fifthAnswer, { align: 'left' });

  doc.end();
}

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '4mb' // Set desired value here
      }
  }
}
