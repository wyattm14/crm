"use client";

import { useState } from "react";

interface Customer {
  id: string;
  company_name: string;
}

interface CustomerFilesProps {
  customer: Customer;
}

export default function CustomerFiles({ customer }: CustomerFilesProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [files, setFiles] = useState<Array<{
    id: number;
    name: string;
    size: number;
    type: string;
    uploaded_at: string;
  }>>([]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    setIsUploading(true);
    
    // TODO: Implement file upload to Supabase storage
    // For now, just simulate the upload
    setTimeout(() => {
      const newFiles = Array.from(selectedFiles).map(file => ({
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        uploaded_at: new Date().toISOString(),
      }));
      
      setFiles(prev => [...prev, ...newFiles]);
      setIsUploading(false);
    }, 1000);
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('image')) return '🖼️';
    if (type.includes('text') || type.includes('document')) return '📝';
    if (type.includes('email')) return '📧';
    return '📁';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Files</h3>
        <p className="text-sm text-gray-500 mb-4">
          Upload PDFs, email threads, message threads, and other documents for {customer.company_name}.
        </p>
      </div>

      {/* File Upload */}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="mt-4">
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Upload files
              </span>
              <span className="mt-1 block text-xs text-gray-500">
                PDF, DOC, TXT, or drag and drop
              </span>
            </label>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              multiple
              className="sr-only"
              onChange={handleFileUpload}
              accept=".pdf,.doc,.docx,.txt,.eml,.msg"
            />
          </div>
        </div>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-3"></div>
            <span className="text-sm text-blue-700">Uploading files...</span>
          </div>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-3">Uploaded Files</h4>
          <div className="space-y-2">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{getFileIcon(file.type)}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)} • {new Date(file.uploaded_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 text-sm">View</button>
                  <button className="text-red-600 hover:text-red-800 text-sm">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {files.length === 0 && !isUploading && (
        <div className="text-center py-8">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No files uploaded</h3>
          <p className="mt-1 text-sm text-gray-500">
            Upload files to start building context for AI conversations.
          </p>
        </div>
      )}
    </div>
  );
} 