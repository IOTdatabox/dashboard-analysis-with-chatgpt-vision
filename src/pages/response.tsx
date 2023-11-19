import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const ResponsePage = () => {
    const router = useRouter();
    const [responseData, setResponseData] = useState('');
    const [firstAnswer, setFirstAnswer] = useState('');
    const [secondAnswer, setSecondAnswer] = useState('');
    const [thirdAnswerOptions, setThirdAnswerOptions] = useState<string[]>([]);
    const [fourthAnswer, setFourthAnswer] = useState('');
    const [fifthAnswer, setFifthAnswer] = useState('');
    const [imageBase64, setImageBase64] = useState('');
    const parseSection = (content: string, sectionName: string) => {
        const regex = new RegExp(`${sectionName}:\\s*([^]*?)(?=\\n\\d\\.|$)`, 'i');
        const match = content.match(regex);
        return match ? match[1].trim() : '';
    };

    useEffect(() => {
        // Extracting data passed through the router
        if (router.query.response) {
            const response = JSON.parse(router.query.response as string);

            if (response.choices && response.choices.length > 0) {
                const content = response.choices[0].message.content;

                const firstAnswer = parseSection(content, "1. Purpose");
                const secondAnswer = parseSection(content, "2. Data Type");
                const thirdAnswer = parseSection(content, "3. Audience");
                const fourthAnswer = parseSection(content, "4. Quick Improvements");
                const fifthAnswer = parseSection(content, "5. Detailed Improvements");

                let jotTypeString = thirdAnswer.split("*");

                setFirstAnswer(firstAnswer);
                setSecondAnswer(secondAnswer);
                setThirdAnswerOptions(jotTypeString);
                setFourthAnswer(fourthAnswer);
                setFifthAnswer(fifthAnswer);



            }
            setResponseData(router.query.response as string);
        }
        if (router.query.image) {
            setImageBase64(router.query.image as string);
        }
    }, [router]);

    const handleGeneratePDF = async () => {
        console.log("💨💨💨", imageBase64);

        // Send a request to generate-pdf.js endpoint
        const response = await fetch('/api/generate-pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fourthResponse: fourthAnswer,
                fifthAnswer: fifthAnswer,
                imageBase64: imageBase64, // Include the image Base64 string
            }),
        });

        if (response.ok) {
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            window.open(url, '_blank'); // Open the generated PDF in a new tab
            // const pdfData = await response.json();
            // const pdfBase64 = pdfData.pdfBase64;

            // // Now send this PDF in an email
            // await sendEmailWithPDF(pdfBase64);
        } else {
            // Handle error
            console.error('Failed to generate PDF');
        }
    };

    const sendEmailWithPDF = async (pdfBase64: any) => {
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    toEmail: 'uo0901576@gmail.com', // Set the recipient's email address
                    pdfBase64: pdfBase64,
                }),
            });

            if (response.ok) {
                console.log('Email sent successfully');
            } else {
                console.error('Failed to send email');
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };


    const handleRestart = () => {
        router.push('/'); // Navigate to the index page
    };


    return (
        <div className="container mx-auto my-8 p-4">
            {/* <h1 className="text-2xl font-bold mb-4">API Response</h1>
            <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={10}
                value={responseData}
                readOnly
            /> */}
            <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    What are you trying to convey?
                </label>
                <textarea
                    rows={2}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={firstAnswer}
                    readOnly
                />
            </div>
            <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    What type of data are you showing?
                </label>
                <textarea
                    rows={2}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={secondAnswer}
                    readOnly
                />
            </div>
            <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Who is the intended audience?
                </label>
                <select
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                    {thirdAnswerOptions.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
            <button
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleGeneratePDF}
            >
                Generate PDF
            </button>
            <button
                className="mt-4 ml-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleRestart}
            >
                Restart
            </button>
        </div>
    );
};

export default ResponsePage;
