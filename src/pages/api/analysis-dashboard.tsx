// pages/api/analyze-dashboard.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Check if the method is POST
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
        console.log("❤❤❤❤")
        const imageBase64 = req.body.image; // Assuming image is sent in base64 format
        if (!imageBase64) {
            console.error('No image data found in the request body');
            return res.status(400).json({ message: 'No image data provided' });
        }
        console.log("Image Base64 Length:", imageBase64.length);

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
                            2. Data Type: [One sentence about the type of data shown.]
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

        const response = await axios.post("https://api.openai.com/v1/chat/completions", payload, { headers });
        res.status(200).json(response.data);
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
