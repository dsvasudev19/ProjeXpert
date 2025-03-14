const axios = require('axios');
const apiKey = process.env.GEMINI_API_KEY; // Store the API key in an environment variable
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

const generateProjectReadme = async (description) => {
    try {
        const prompt = `Generate a detailed and comprehensive README.md file for a project based on the following high-level description:\n\n${description}\n\nThe README should include sections like Project Title, Description, Installation, Usage, and Contributing. Format it in Markdown.`;

        const response = await axios.post(url, {
            contents: [
                {
                    parts: [{ text: prompt }],
                },
            ],
        });

        const markdownContent = response.data.candidates[0].content.parts[0].text;
        const plainTextContent = markdownToPlainText(markdownContent);

        return {
            success: true,
            message: "Successfully Generated the README content",
            data: plainTextContent
        };
    } catch (error) {
        console.error('Error details:', error);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
        }

        throw new Error('Failed to generate README');
    }
};

module.exports = { generateProjectReadme };

const markdownToPlainText = (markdown) => {
    return markdown
        .replace(/^# (.*?)$/gm, '\n$1\n' + '='.repeat(50)) // H1 -> Underlined Title
        .replace(/^## (.*?)$/gm, '\n$1\n' + '-'.repeat(40)) // H2 -> Underlined Subtitle
        .replace(/^### (.*?)$/gm, '\n$1\n' + '-'.repeat(30)) // H3 -> Smaller Subtitle
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold (**text** → text)
        .replace(/\*(.*?)\*/g, '$1') // Remove italics (*text* → text)
        .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Remove links but keep text
        .replace(/`([^`]+)`/g, '"$1"') // Convert inline code (`code` → "code")
        .replace(/```[\s\S]*?```/g, '') // Remove code blocks
        .replace(/[-*] /g, '• ') // Convert list markers (- or * → •)
        .replace(/\n{3,}/g, '\n\n') // Reduce excessive line breaks
        .replace('``"markdown','')
        .trim();
};


module.exports = { generateProjectReadme };
