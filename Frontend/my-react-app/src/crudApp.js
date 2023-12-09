import React, { useRef } from 'react';
import { useTextFileManagement } from './useTextFileManagement.js';

function FileInput({ fileInputRef, handleFileChange }) {
  return (
    <>
      <input type="file" accept=".txt" ref={fileInputRef} onChange={() => handleFileChange(fileInputRef)} />
    </>
  );
}

function NewFileSection({ newFileName, setNewFileName, createFile }) {
  return (
    <>
      <h2>Create New Car File:</h2>
      <div>
        <input
          type="text"
          placeholder="Enter file name"
          value={newFileName}
          onChange={(e) => setNewFileName(e.target.value)}
        />
        <button className="app-button" onClick={createFile}>Create</button>
      </div>
    </>
  );
}

function SelectedFileSection({ selectedFile, isEditing, editedText, setEditedText, fileContent, saveFile, editFile, deleteFile }) {
  return (
    <>
      <h2>Selected Car File: {selectedFile ? selectedFile.name : 'No File Selected'}</h2>
      {isEditing ? (
        <div>
          <textarea value={editedText} onChange={(e) => setEditedText(e.target.value)} />
          <button className="app-button" onClick={saveFile}>Save</button>
        </div>
      ) : (
        <div>
          <div>Car Content:</div>
          <pre>{fileContent}</pre>
          <button className="app-button" onClick={editFile}>Edit</button>
          <button className="app-button" onClick={deleteFile}>Delete</button>
        </div>
      )}
    </>
  );
}

function FileList({ files, selectFile }) {
  return (
    <>
      <h2>All Car Files:</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index} onClick={() => selectFile(file)}>
            {file.name}
          </li>
        ))}
      </ul>
    </>
  );
}

function CrudApp() {
  const {
    files,
    selectedFile,
    fileContent,
    editedText,
    isEditing,
    handleFileChange,
    createFile,
    selectFile,
    editFile,
    saveFile,
    deleteFile,
    newFileName,
    setNewFileName,
    setEditedText,
  } = useTextFileManagement();

  const fileInputRef = useRef();

  return (
    <div>
      <h1>Car Registration Text Files</h1>
      <FileInput fileInputRef={fileInputRef} handleFileChange={handleFileChange} />
      <NewFileSection newFileName={newFileName} setNewFileName={setNewFileName} createFile={createFile} />
      <SelectedFileSection
        selectedFile={selectedFile}
        isEditing={isEditing}
        editedText={editedText}
        setEditedText={setEditedText}
        fileContent={fileContent}
        saveFile={saveFile}
        editFile={editFile}
        deleteFile={deleteFile}
      />
      <FileList files={files} selectFile={selectFile} />
    </div>
  );
}

export default CrudApp;
