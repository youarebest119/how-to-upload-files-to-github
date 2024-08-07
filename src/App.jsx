import React, { useState } from 'react';
import { uploadCreateFile, readFileContent, updateFileContent, getFileDetails } from './githubFunctions';

const GitHubFileManager = () => {
  const [owner] = useState('youarebest119'); // Your GitHub username
  const [repo] = useState('github-notes'); // Your repository name
  const [path, setPath] = useState('notes/new-file.txt'); // Path of the file
  const [message, setMessage] = useState('Initial commit'); // Commit message
  const [content, setContent] = useState('This is the content of the new file.'); // File content
  const [token] = useState('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'); // Your GitHub token
  const [fileContent, setFileContent] = useState(''); // Content of the file from GitHub
  const [sha, setSha] = useState(''); // SHA for updating the file

  const handleCreateFile = async () => {
    try {
      const result = await uploadCreateFile(owner, repo, path, message, content, token);
      console.log('File created successfully:', result);
    } catch (error) {
      console.error('Error creating file:', error);
    }
  };

  const handleReadFile = async () => {
    try {
      const content = await readFileContent(owner, repo, path, token);
      setFileContent(content);
      console.log('File content:', content);
    } catch (error) {
      console.error('Error reading file content:', error);
    }
  };

  const handleUpdateFile = async () => {
    try {
      const result = await updateFileContent(owner, repo, path, message, content, sha, token);
      console.log('File updated successfully:', result);
    } catch (error) {
      console.error('Error updating file content:', error);
    }
  };

  const handleFetchSha = async () => {
    try {
      const fileDetails = await getFileDetails(owner, repo, path, token);
      setSha(fileDetails.sha); // Set the SHA of the file
      console.log('File SHA:', fileDetails.sha);
    } catch (error) {
      console.error('Error fetching SHA:', error);
    }
  };

  return (
    <div>
      <div>
        <label>Path: </label>
        <input value={path} onChange={(e) => setPath(e.target.value)} />
      </div>
      <div>
        <label>Commit Message: </label>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <div>
        <label>Content: </label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <div>
        <label>SHA (for update): </label>
        <input value={sha} onChange={(e) => setSha(e.target.value)} />
        <button onClick={handleFetchSha}>Fetch SHA</button>
      </div>
      <button onClick={handleCreateFile}>Create File</button>
      <button onClick={handleReadFile}>Read File</button>
      <button onClick={handleUpdateFile}>Update File</button>
      <div>
        <h3>File Content:</h3>
        <pre>{fileContent}</pre>
      </div>
    </div>
  );
};

export default GitHubFileManager;
