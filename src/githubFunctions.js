import axios from 'axios';

// Create or Upload a File
export const uploadCreateFile = async (owner, repo, path, message, content, token) => {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    const base64Content = btoa(content); // Convert content to Base64

    const data = {
        message,
        content: base64Content,
    };

    const config = {
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
        }
    };

    try {
        const response = await axios.put(url, data, config);
        return response.data;
    } catch (error) {
        console.error('Error uploading/creating file:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Read a File
export const readFileContent = async (owner, repo, path, token) => {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    const config = {
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
        }
    };

    try {
        const response = await axios.get(url, config);
        const decodedContent = atob(response.data.content); // Decode Base64 content
        return decodedContent;
    } catch (error) {
        console.error('Error reading file content:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Update a File
export const updateFileContent = async (owner, repo, path, message, content, sha, token) => {
    console.log({ sha });
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    const base64Content = btoa(content); // Convert content to Base64

    const data = {
        message,
        content: base64Content,
        sha
    };

    const config = {
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
        }
    };

    try {
        const response = await axios.put(url, data, config);
        return response.data;
    } catch (error) {
        console.error('Error updating file content:', error.response ? error.response.data : error.message);
        throw error;
    }
};


// Get File Details
export const getFileDetails = async (owner, repo, path, token) => {
    const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

    const config = {
        headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
        }
    };

    try {
        const response = await axios.get(url, config);
        return response.data; // Includes `sha` and `content`
    } catch (error) {
        console.error('Error fetching file details:', error.response ? error.response.data : error.message);
        throw error;
    }
};