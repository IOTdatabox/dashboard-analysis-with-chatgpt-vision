import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? "");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end('Method Not Allowed');
    }

    const { toEmail, username, pdfBase64 } = req.body; // Extract email and PDF Base64 string from the request body
    
    // console.log("In send-email", pdfBase64);
    const msg = {
        to: toEmail, // Recipient email address
        from: {
            email: 'whaydigital@gmail.com',
            name: "Vision Labs Insights"
        }, // Your verified sender address
        subject: 'Here are some insights to improve your dashboard.',
        templateId: "d-c4a496ad89d84b9c8b70777d75cdd373",
        dynamicTemplateData: {
          subject: `Here are some insights to improve your dashboard.`,
          username: username
        },
        isMultiple: false,
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

    // console.log(msg)

    try {
        await sgMail.send(msg);
        console.log("❤❤❤")
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error(error);

        // // Type Guard to check if it's an Error instance
        // if (error instanceof Error) {
        //     // Now TypeScript knows 'error' is an Error and you can access its properties
        //     console.error(error.message);

        //     // If you expect a specific structure (like having a 'response' property), use type assertions
        //     if ('response' in error) {
        //         console.error((error as any).response.body);
        //     }
        // } else {
        //     // Handle cases where error is not an Error instance
            res.status(500).json({ error: 'Unknown error occurred' });
        // }
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb' // Set desired value here
        }
    }
}
