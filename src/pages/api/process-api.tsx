// pages/api/analyze-dashboard.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import PDFDocument, { image } from 'pdfkit';
import fs from 'fs';
import sgMail from '@sendgrid/mail';
import { supabase } from '@/client';
sgMail.setApiKey(process.env.SENDGRID_API_KEY ?? '');

const parseSection = (content: string, sectionName: string) => {
  const regex = new RegExp(`${sectionName}:\\s*([^]*?)(?=\\n\\d\\.|$)`, 'i');
  const match = content.match(regex);
  return match ? match[1].trim() : '';
};

const generateLink = async (token: String) => {
  const { data, error } = await supabase
    .from('results')
    .select()
    .eq('token', token);

  if (error) {
    console.error(error);
  }

  const generatedLink = `${process.env.NEXT_PUBLIC_URL}results?token=${data?.[0]?.token}`;
  console.log(data);
  console.log(generatedLink, 'generatedLink');
  return generatedLink;
};

// const generatePDF = (
//   imageBase64: any,
//   fourthResponse: string,
//   fifthResponse: string
// ) => {
//   return new Promise((resolve, reject) => {
//     const doc = new PDFDocument();
//     let buffers: any[] = [];
//     doc.on('data', buffers.push.bind(buffers));
//     doc.on('end', () => {
//       const pdfData = Buffer.concat(buffers);
//       const base64String = pdfData.toString('base64');
//       resolve(base64String);
//     });
//     doc.on('error', () => {
//       reject('error');
//     });

//     doc.fontSize(25).text('How to Improve Your Dashboard', { align: 'center' });
//     doc.moveDown();
//     doc.fontSize(13).text('The dashboard', { align: 'center' });
//     doc.moveDown();
//     if (imageBase64) {
//       const imageBuffer = Buffer.from(imageBase64, 'base64');
//       doc.image(imageBuffer, {
//         fit: [500, 300], // Adjust the size as needed
//         align: 'center',
//         valign: 'center',
//       });
//     }

//     doc.moveDown();
//     doc.fontSize(13).text('Quick Improvements', { align: 'center' });
//     doc.moveDown();
//     doc.fontSize(12).text(fourthResponse, { align: 'left' });
//     doc.moveDown();
//     doc.fontSize(13).text('In Depth Explanations', { align: 'center' });
//     doc.moveDown();
//     doc.fontSize(12).text(fifthResponse, { align: 'left' });
//     doc.end();
//   });
// };

// const sendEmailWithPDF = async (toEmail: string, pdfBase64: any) => {
//   const msg = {
//     to: toEmail, // Recipient email address
//     from: {
//       email: 'whaydigital@gmail.com',
//       name: 'Vision Labs Insights',
//     }, // Your verified sender address
//     subject: 'Here are some insights to improve your dashboard.',
//     templateId: 'd-c4a496ad89d84b9c8b70777d75cdd373',
//     dynamicTemplateData: {
//       subject: `Here are some insights to improve your dashboard.`,
//       username: `Client`,
//     },
//     isMultiple: false,
//     attachments: [
//       {
//         content: pdfBase64,
//         filename: 'dashboard_improvements.pdf',
//         type: 'application/pdf',
//         disposition: 'attachment',
//         contentId: 'pdfDocument',
//       },
//     ],
//   };

//   // console.log(msg)

//   try {
//     await sgMail.send(msg);
//     console.log('❤❤❤');
//     return { success: true, message: 'Email sent successfully' };
//   } catch (error) {
//     console.error(error);
//     return { success: false, error: 'Unknown error occurred' };
//     // }
//   }
// };
const sendEmailWithLink = async (toEmail: string, link: any) => {
  const msg = {
    to: toEmail, // Recipient email address
    from: {
      email: 'whaydigital@gmail.com',
      name: 'Vision Labs Insights',
    }, // Your verified sender address
    subject: 'Here are some insights to improve your dashboard.',
    templateId: 'd-c4a496ad89d84b9c8b70777d75cdd373',
    dynamicTemplateData: {
      subject: `Here are some insights to improve your dashboard.`,
      username: `Client`,
      result_page_link: link,
    },

    isMultiple: false,
  };

  // console.log(msg)

  try {
    await sgMail.send(msg);
    console.log('❤❤❤');
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Unknown error occurred' };
    // }
  }
};

function generateRandomToken() {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const tokenLength = 32;
  let token = '';

  for (let i = 0; i < tokenLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    token += characters.charAt(randomIndex);
  }

  return token;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Check if the method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    console.log('❤❤❤❤');
    const imageBase64 = req.body.image; // Assuming image is sent in base64 format
    const toEmail = req.body.email;
    const userId = req.body.userId;
    if (!imageBase64) {
      console.error('No image data found in the request body');
      return res.status(400).json({ message: 'No image data provided' });
    }
    console.log('Image Base64 Length:', imageBase64.length);
    console.log('Email:', toEmail);

    const payload = {
      model: 'gpt-4-vision-preview',
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: `Attached is a Data Dashboard. Please reply in the following format:
                            1. Purpose: [provide 3 positives & 7 areas improvement of the dashboard.]
                            2. Positives:
                             "Title": [Positive Aspect 1]
                             "description": [Positive Point 1 Description]
                             "Title": [Positive Aspect 2]
                             "description": [Positive Point 2 Description]
                             "Title": [Positive Aspect 3]
                             "description": [Positive Point 3 Description]
                            3. Improvements:
                             "Title": [Improvement Aspect 1]
                            "description": [Improvement Point 1 Description]
                              "Possible Solution": [Your possible solution for Improvement Aspect 1]
                             "Title": [Improvement Aspect 2]
                            "description": [Improvement Point 2 Description]
                              "Possible Solution": [Your possible solution for Improvement Aspect 2]
                             "Title": [Improvement Aspect 3]
                            "description": [Improvement Point 3 Description]
                              "Possible Solution": [Your possible solution for Improvement Aspect 3]
                             "Title": [Improvement Aspect 4]
                            "description": [Improvement Point 4 Description]
                              "Possible Solution": [Your possible solution for Improvement Aspect 4]
                             "Title": [Improvement Aspect 5]
                            "description": [Improvement Point 5 Description]
                              "Possible Solution": [Your possible solution for Improvement Aspect 5]
                             "Title": [Improvement Aspect 6]
                            "description": [Improvement Point 6 Description]
                              "Possible Solution": [Your possible solution for Improvement Aspect 6]
                             "Title": [Improvement Aspect 7]
                            "description": [Improvement Point 7 Description]
                              "Possible Solution": [Your possible solution for Improvement Aspect 7]
                            4. Rating: [provide appropriate score for readability, color usage, chart selection, understandability, accessibility out of 10]
                              "Title": [Readability] 
                             "score": [provide appropriate score for readability out of 10]
                              "description": [Readability Description]
                              "Title": [Color Usage]
                             "score": [provide appropriate score for color-usage out of 10]
                             "description": [Color Usage Description]
                             "Title": [Chart Selection]
                             "score": [provide appropriate score for chart selection out of 10]
                             "description": [Chart Selection Description]
                             "Title": [Understandability]
                             "score": [provide appropriate score for understandability out of 10]
                             "description": [Understandability Description]
                             "Title": [Accessibility]
                             "score": [provide appropriate score for accessibility out of 10]
                             "description": [Accessibility Description]
                            Do not include anything on Mobile responsiveness.
                            also Improvements section format like this [{"title":"","Description":"","PossibleSolution":""},{"title":"","Description":"","PossibleSolution":""}].
                            also Positives section format like this [{"title":"","Description":""},{"title":"","Description":""}].
                            also Rating section format like this [{"title":"","score":"","Description":""},{"title":"","score":"","Description":""}]
                            `,
            },
            {
              type: 'image_url',
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
                detail: 'high',
              },
            },
          ],
        },
      ],
      max_tokens: 3000,
    };

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use environment variable for API key
    };
    console.log('start axios');

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      payload,
      { headers }
    );
    const responseParsed = response.data;

    if (responseParsed.choices && responseParsed.choices.length > 0) {
      const content = responseParsed.choices[0].message.content;

      const firstAnswer = parseSection(content, '1. Purpose');
      const secondAnswer = parseSection(content, '2. Positives');
      const thirdAnswer = parseSection(content, '3. Improvements');
      const fourthAnswer = parseSection(content, '4. Rating');

      let dataTypeString = secondAnswer.split('*');
      let jobTypeString = thirdAnswer.split('*');

      const apiResponse = {
        firstAnswer: firstAnswer,
        secondAnswer: dataTypeString,
        thirdAnswer: jobTypeString, // Assuming you want to include the split string of thirdAnswer
        fourthAnswer: fourthAnswer,
      };

      // const image = imageBase64.split(';base64,').pop();
      // const imageBuffer = Buffer.from(image, 'base64');

      // const imageName = `image_${generateRandomToken()}.png`;
      // const imagePath = `E:/Projects/dashboard-analysis-with-chatgpt-vision/public/img/${imageName}`;

      // fs.writeFileSync(imagePath, imageBuffer, 'binary');

      const { data, error } = await supabase
        .from('results')
        .upsert([
          {
            user_id: userId,
            image: imageBase64,
            positives: apiResponse.secondAnswer,
            improvements: apiResponse.thirdAnswer,
            rating: apiResponse.fourthAnswer,
            token: generateRandomToken(),
          },
        ])
        .select();

      if (error) {
        console.error('Supabase Error:', error.message);
        return res
          .status(500)
          .json({ message: 'Internal Server Error', error });
      }

      const token = data.map((d) => d.token).toString();

      const link = await generateLink(token);

      console.log(link, 'Line no 300');

      // const response = await generatePDF(
      //   imageBase64,
      //   fourthAnswer,
      //   fifthAnswer
      // );
      // if (response == 'error') {
      //   return res.status(500).json({ message: 'Internal Server Error' });
      // }
      // const emailResponse = await sendEmailWithPDF(toEmail, response);
      const emailResponse = await sendEmailWithLink(toEmail, link);
      if (emailResponse.success) {
        res.status(200).json({
          message: emailResponse.message,
          data: { firstAnswer, secondAnswer, thirdAnswer },
        });
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
      sizeLimit: '4mb', // Set desired value here
    },
  },
};
