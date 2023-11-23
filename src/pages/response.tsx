import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Spinner from '@/components/Spinner';
const ResponsePage = () => {
    const router = useRouter();
    const [responseData, setResponseData] = useState('');
    const [firstAnswer, setFirstAnswer] = useState('');
    const [secondAnswer, setSecondAnswer] = useState('');
    const [thirdAnswerOptions, setThirdAnswerOptions] = useState<string[]>([]);
    const [fourthAnswer, setFourthAnswer] = useState('');
    const [fifthAnswer, setFifthAnswer] = useState('');
    const [imageBase64, setImageBase64] = useState('');
    const [emailToSend, setEmailToSend] = useState('');
    const [username, setUsername] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        let successTimeout: string | number | NodeJS.Timeout | undefined;
        if (successMessage) {
            setShowSuccess(true);
            successTimeout = setTimeout(() => {
                setShowSuccess(false);
            }, 1500);
        }

        return () => {
            if (successTimeout) clearTimeout(successTimeout);
        };
    }, [successMessage]);

    useEffect(() => {
        let errorTimeout: string | number | NodeJS.Timeout | undefined;
        if (errorMessage) {
            setShowError(true);
            errorTimeout = setTimeout(() => {
                setShowError(false);
            }, 1500);
        }

        return () => {
            if (errorTimeout) clearTimeout(errorTimeout);
        };
    }, [errorMessage]);


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
        if (router.query.email) {
            setEmailToSend(router.query.email as string);
        }
        if (router.query.name) {
            setUsername(router.query.name as string);
        }
    }, [router]);

    const handleGeneratePDF = async () => {
        setIsLoading(true); // Start loading

        setSuccessMessage('');
        setErrorMessage('');
        // existing code...

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
            const blob = await response.arrayBuffer();
            const content = new Buffer(blob).toString('base64');
            await sendEmailWithPDF(content);
            setSuccessMessage('Email sent successfully');
            setErrorMessage('');
        } else {
            // Handle error
            setErrorMessage('Failed to send email');
            setSuccessMessage('');
        }
        setIsLoading(false); // End loading after the process is complete

    };

    const sendEmailWithPDF = async (pdfBase64: any) => {
        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    toEmail: emailToSend, // Set the recipient's email address
                    username: username, // Include the username
                    pdfBase64: pdfBase64,

                }),
            });
            console.log("💨💨💨");
            console.log(pdfBase64);
            if (response.ok) {
                console.log('Email sent successfully.');
            } else {
                console.error('Failed to send email.');
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };


    const handleRestart = () => {
        router.push('/'); // Navigate to the index page
    };


    return (
        <div className="bg-[url('/img/background.jpg')] bg-cover bg-center w-screen h-screen">
            <div className={`container mx-auto py-8 px-32 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
                {/* <h1 className="text-2xl font-bold mb-4">API Response</h1>
            <textarea
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={10}
                value={responseData}
                readOnly
            /> */}
                <h2 className=' pt-10 text-H2CooperTextSize font-cooper mx-auto text-center'>Overview</h2>

                <div className="mt-4">
                    <label className="block text-gray-700 text-PPoppinsTextSize font-poppins font-bold mb-2">
                        What are you trying to convey?
                    </label>
                    <textarea
                        rows={2}
                        className="text-PPoppinsTextSize font-poppins shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-Gray200"
                        value={firstAnswer}
                        readOnly
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-gray-700 text-PPoppinsTextSize font-poppins font-bold mb-2">
                        What type of data are you showing?
                    </label>
                    <textarea
                        rows={2}
                        className="text-PPoppinsTextSize font-poppins shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  bg-Gray200"
                        value={secondAnswer}
                        readOnly
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-gray-700 text-PPoppinsTextSize font-poppins font-bold mb-2">
                        Who is the intended audience?
                    </label>
                    <select
                        className="text-PPoppinsTextSize font-poppins shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  bg-Gray200"
                    >
                        {thirdAnswerOptions.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mt-8">
                    <label className="block text-gray-700 text-PPoppinsTextSize font-poppins font-bold mb-2">
                        We&#39;ve already prepared a more detailed document for you. Click the button and we&#39;ll send it to your email.
                    </label>
                </div>
                <button
                    className="mt-4 bg-Olive200 hover:bg-OliveHover text-Gray100 font-poppins text-[20px] py-[20px] px-[30px] rounded"
                    onClick={handleGeneratePDF}
                >
                    Send PDF
                </button>
                <button
                    className="mt-4 ml-4 bg-white hover:bg-Olive200 text-Olive200 hover:text-white font-poppins text-[20px] py-[20px] px-[30px] rounded border-2 border-Olive200 box-border" onClick={handleRestart}
                >
                    Restart
                </button>
                {showSuccess && (
                    <div className={` text-Olive200 text-PPoppinsTextSize font-poppins message ${showSuccess ? 'fade-in' : 'fade-out'}`}>
                        {successMessage}
                    </div>
                )}
                {showError && (
                    <div className={` text-Orange200 text-PPoppinsTextSize font-poppins message ${showError ? 'fade-in' : 'fade-out'}`}>
                        {errorMessage}
                    </div>
                )}
            </div>
            {isLoading && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
                    <Spinner />
                </div>
            )}
        </div>
    );
};

export default ResponsePage;
