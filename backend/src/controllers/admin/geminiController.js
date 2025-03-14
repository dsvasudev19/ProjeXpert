const apiKey = process.env.GEMINI_API_KEY; // Store the API key in an environment variable
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

const generateProjectReadme = async (req, res, next) => {
    const { description } = req.body
    try {

        const prompt = `Generate a detailed and comprehensive README.md file for a project based on the following high-level description:\n\n${description}\n\nThe README should include sections like Project Title, Description, Installation, Usage, and Contributing. Format it in Markdown.`;
        // Send POST request to Google API with the description
        const response = await axios.post(url, {
            contents: [
                {
                    parts: [{ text: prompt }],
                },
            ],
        });


        res.json({ success: true, message: "Successfully Generated the readme content", data: response.data.candidates[0].content.parts[0].text });
    } catch (error) {
        console.error('Error details:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }
        res
            .status(500)
            .json({ error: 'Failed to generate README', details: error.message });
    }
}

const generateResponse = async (req, res, next) => {
    try {
        const { prompt } = req.body;

        const response = await axios.post(url, {
            contents: [
                {
                    parts: [{ text: prompt }],
                },
            ],
        });
        res.json({ success: true, message: "Successfully Generated the readme content", data: response.data.candidates[0].content.parts[0].text });
    } catch (error) {
        console.log(error)
        console.error('Error details:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }
        next(error)
    }
}


module.exports={
    generateProjectReadme,
    generateResponse
}