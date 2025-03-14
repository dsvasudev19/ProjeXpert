const axios = require('axios');
require('dotenv').config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = process.env.GITHUB_OWNER;
const BASE_URL = "https://api.github.com";

const getHeaders = () => ({
    "Authorization": `token ${GITHUB_TOKEN}`,
    "Accept": "application/vnd.github+json"
});

/**
 * Create a new GitHub repository
 */
const createRepository = async (repoName, description = "", isPrivate = true) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/user/repos`,
            {
                name: repoName,
                description: description,
                private: isPrivate,
                auto_init: false // We'll add the README manually
            },
            { headers: getHeaders() }
        );

        console.log(`Repository created: ${response.data.html_url}`);
        return response.data;
    } catch (error) {
        console.error("Error creating repository:", error.response?.data || error.message);
        throw error;
    }
};

/**
 * Add a README file to the repository
 */
const addReadmeToRepo = async (repoName, readmeContent) => {
    console.log(repoName,readmeContent)
    try {
        const encodedContent = Buffer.from(readmeContent).toString('base64');

        const response = await axios.put(
            `${BASE_URL}/repos/${OWNER}/${repoName}/contents/README.md`,
            {
                message: "Added custom README",
                content: encodedContent,
                branch: "main"
            },
            { headers: getHeaders() }
        );

        console.log(`README added: ${response.data.content.html_url}`);
        return response.data;
    } catch (error) {
        console.error("Error adding README:", error.response?.data || error.message);
        throw error;
    }
};

module.exports = {
    createRepository,
    addReadmeToRepo
};
