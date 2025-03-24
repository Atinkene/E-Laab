import React, { useState } from 'react';

const FileUpload = ({ onFileChange }) => {
  const [file, setFile] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
    onFileChange(droppedFile);
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    onFileChange(selectedFile);
  };

  return (
    <div
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className="border-dashed border-2 border-gray-400 p-6 text-center rounded-lg"
    >
      <p>Glissez un fichier ici ou</p>
      <input
        type="file"
        accept=".pdf"
        onChange={handleChange}
        className="mt-2"
      />
      {file && <p className="mt-2">Fichier sélectionné : {file.name}</p>}
    </div>
  );
};

export default FileUpload;