import { useState } from 'react';

export function useTextFileManagement() {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileContent, setFileContent] = useState('');
  const [editedText, setEditedText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  const commonState = {
    files,
    selectedFile,
    fileContent,
    editedText,
  };

  const createFile = () => {
    if (newFileName) {
      const newFile = {
        name: newFileName + '.txt',
        content: '',
        createdBy: getCurrentUserId(), // Assuming you have a function to get the current user's ID
      };
      setFiles((prevFiles) => [...prevFiles, newFile]);
      setNewFileName('');
    }
  };

  const getCurrentUserId = () => {
    // Implement a function to get the current user's ID, for example, from your authentication context
    // This function should return the ID of the currently logged-in user
    // Replace the following line with the actual implementation
    return 'user123';
  };

  const readAndSetFileContent = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setFileContent(content);
    };
    reader.readAsText(file);
  };

  const handleFileChange = (fileInputRef) => {
    const file = fileInputRef.current.files[0];
    if (file) {
      readAndSetFileContent(file);
    }
  };

  const updateFiles = (updatedFiles) => {
    setFiles(updatedFiles);
    setIsEditing(false);
  };

  const selectFile = (file) => {
    setSelectedFile(file);
    setFileContent(file.content);
    setIsEditing(false);
  };

  const editFile = () => {
    setIsEditing(true);
  };

  const saveFile = () => {
    const updatedFiles = files.map((file) =>
      file === selectedFile ? { ...file, content: editedText } : file
    );
    updateFiles(updatedFiles);
  };

  const deleteFile = () => {
    const updatedFiles = files.filter((file) => file !== selectedFile);
    setSelectedFile(null);
    updateFiles(updatedFiles);
  };

  return {
    ...commonState,
    setEditedText,
    isEditing,
    newFileName,
    setNewFileName,
    handleFileChange,
    createFile,
    selectFile,
    editFile,
    saveFile,
    deleteFile,
  };
}
