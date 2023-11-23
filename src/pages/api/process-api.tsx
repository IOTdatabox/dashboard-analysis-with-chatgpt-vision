// pages/api/analyze-dashboard.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import PDFDocument, { image } from 'pdfkit';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? "");

const parseSection = (content: string, sectionName: string) => {
    const regex = new RegExp(`${sectionName}:\\s*([^]*?)(?=\\n\\d\\.|$)`, 'i');
    const match = content.match(regex);
    return match ? match[1].trim() : '';
};

const generatePDF = (imageBase64: any, fourthResponse: string, fifthResponse: string) => {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        let buffers: any[] = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers);
            const base64String = pdfData.toString('base64');
            resolve(base64String);
        });
        doc.on('error', () => {
            reject("error");
        });

        doc.fontSize(25).text('How to Improve Your Dashboard', { align: 'center' });
        doc.moveDown();
        doc.fontSize(13).text("The dashboard", { align: 'center' });
        doc.moveDown();
        if (imageBase64) {
            const imageBuffer = Buffer.from(imageBase64, 'base64');
            doc.image(imageBuffer, {
                fit: [500, 300], // Adjust the size as needed
                align: 'center',
                valign: 'center',
            });
        }

        doc.moveDown();
        doc.fontSize(13).text("Quick Improvements", { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(fourthResponse, { align: 'left' });
        doc.moveDown();
        doc.fontSize(13).text("In Depth Explanations", { align: 'center' });
        doc.moveDown();
        doc.fontSize(12).text(fifthResponse, { align: 'left' });
        doc.end();
    });
};

const sendEmailWithPDF = async (toEmail: string, pdfBase64: any) => {
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
            username: `Client`
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
        return { success: true, message: 'Email sent successfully' };
    } catch (error) {
        console.error(error);
        return { success: false, error: 'Unknown error occurred' };
        // }
    }
};


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check if the method is POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        console.log("❤❤❤❤")
        const imageBase64 = req.body.image; // Assuming image is sent in base64 format
        const toEmail = req.body.email;
        if (!imageBase64) {
            console.error('No image data found in the request body');
            return res.status(400).json({ message: 'No image data provided' });
        }
        console.log("Image Base64 Length:", imageBase64.length);
        console.log("Email:", toEmail);

        const payload = {
            model: "gpt-4-vision-preview",
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            type: "text",
                            text: `Attached is a Data Dashboard. Please reply in the following format:
                            1. Purpose: [One sentence about the dashboard's purpose.]
                            2. Data Type: [List four job positions, separated by asterisks (*).]
                            3. Audience: [List four job positions, separated by asterisks (*).]
                            4. Quick Improvements: [List at least four quick improvements, each starting with a dash (-).]
                            5. Detailed Improvements: [List at least four detailed improvements, each starting with a dash (-).]
                            Do not include anything on Mobile responsiveness.
                            `
                        },
                        {
                            type: "image_url",
                            image_url: {
                                url: `data:image/jpeg;base64,${imageBase64}`,
                                detail: "high"
                            }
                        }
                    ]
                }
            ],
            max_tokens: 3000
        };

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${process.env.OPENAI_API_KEY}` // Use environment variable for API key
        };
        console.log("start axios");

        const response = await axios.post("https://api.openai.com/v1/chat/completions", payload, { headers });
        const responseParsed = response.data;

        if (responseParsed.choices && responseParsed.choices.length > 0) {
            const content = responseParsed.choices[0].message.content;

            const firstAnswer = parseSection(content, "1. Purpose");
            const secondAnswer = parseSection(content, "2. Data Type");
            const thirdAnswer = parseSection(content, "3. Audience");
            const fourthAnswer = parseSection(content, "4. Quick Improvements");
            const fifthAnswer = parseSection(content, "5. Detailed Improvements");

            let dataTypeString = secondAnswer.split("*");
            let jobTypeString = thirdAnswer.split("*");

            const apiResponse = {
                firstAnswer: firstAnswer,
                secondAnswer: dataTypeString,
                thirdAnswer: jobTypeString, // Assuming you want to include the split string of thirdAnswer
                fourthAnswer: fourthAnswer,
                fifthAnswer: fifthAnswer
            };

            const response = await generatePDF(imageBase64, fourthAnswer, fifthAnswer);
            if (response == "error") {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            const emailResponse = await sendEmailWithPDF(toEmail, response);
            if (emailResponse.success) {
                res.status(200).json({ message: emailResponse.message, data: { firstAnswer, secondAnswer, thirdAnswer } });
                console.log('Email sent successfully');
            } else {
                res.status(500).json({ error: emailResponse.error });
                console.log('Unknown error occurred');
            }
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // This means the error is related to Axios or the OpenAI API call
            console.error('Axios Error:', error.response?.data || error.message);
        } else {
            // Generic error
            console.error('Generic Error:', error);
        }
        res.status(500).json({ message: 'Internal Server Error', error });
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb' // Set desired value here
        }
    }
}
