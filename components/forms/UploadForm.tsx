'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function UploadForm() {
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setUploading(true);
    setStatus('Uploading...');

    try {
      const formData = new FormData();
      formData.append('file', acceptedFiles[0]);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setStatus(`✓ ${data.filename} uploaded successfully`);
        setTimeout(() => setStatus(null), 3000);
      } else {
        setStatus('✗ Upload failed');
      }
    } catch (error) {
      setStatus('✗ Error uploading file');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
        isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
      }`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p className="text-blue-600">Drop files here...</p>
      ) : (
        <div>
          <p className="text-gray-700 font-medium">Drag & drop PDFs or DOCX files here</p>
          <p className="text-gray-500 text-sm">or click to select files</p>
        </div>
      )}
      {uploading && <p className="text-blue-600 mt-2">Uploading...</p>}
      {status && <p className="text-gray-700 mt-2">{status}</p>}
    </div>
  );
}