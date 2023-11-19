import sgMail from '@sendgrid/mail';
import { NextApiRequest, NextApiResponse } from 'next';
sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? "");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end('Method Not Allowed');
    }

    const { toEmail, pdfBase64 } = req.body; // Extract email and PDF Base64 string from the request body

    const msg = {
        to: toEmail, // Recipient email address
        from: 'whaydigital@gmail.com', // Your verified sender address
        subject: 'Your PDF Document',
        text: 'Please find the attached PDF document.',
        attachments: [
            {
                content: pdfBase64,
                filename: 'dashboard_improvements.pdf',
                type: 'application/pdf',
                disposition: 'attachment',
                contentId: 'pdfDocument',
            },
        ],
    };

    try {
        await sgMail.send(msg);
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);

        // Type Guard to check if it's an Error instance
        if (error instanceof Error) {
            // Now TypeScript knows 'error' is an Error and you can access its properties
            console.error(error.message);

            // If you expect a specific structure (like having a 'response' property), use type assertions
            if ('response' in error) {
                console.error((error as any).response.body);
            }
        } else {
            // Handle cases where error is not an Error instance
            res.status(500).json({ error: 'Unknown error occurred' });
        }
    }
}