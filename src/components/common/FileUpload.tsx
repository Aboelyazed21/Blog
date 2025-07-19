import React, { useState, useRef } from 'react';
import { Upload, X, File, Image as ImageIcon, FileText, Video, Music } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (fileUrl: string, fileType: string, fileName: string) => void;
  currentFile?: { url: string; type: string; name: string };
  acceptedTypes?: string;
  maxSize?: number; // in MB
  className?: string;
  label?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileSelect, 
  currentFile, 
  acceptedTypes = "image/*,video/*,audio/*,.pdf,.doc,.docx,.txt",
  maxSize = 10,
  className = '',
  label = 'Upload File'
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <ImageIcon className="h-8 w-8" />;
    if (type.startsWith('video/')) return <Video className="h-8 w-8" />;
    if (type.startsWith('audio/')) return <Music className="h-8 w-8" />;
    if (type.includes('pdf') || type.includes('document')) return <FileText className="h-8 w-8" />;
    return <File className="h-8 w-8" />;
  };

  const getFileTypeColor = (type: string) => {
    if (type.startsWith('image/')) return 'text-green-500';
    if (type.startsWith('video/')) return 'text-purple-500';
    if (type.startsWith('audio/')) return 'text-blue-500';
    if (type.includes('pdf')) return 'text-red-500';
    return 'text-gray-500';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = async (file: File) => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`);
      return;
    }

    setUploading(true);
    
    try {
      // Convert file to base64 for demo purposes
      // In a real app, you would upload to a cloud service
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onFileSelect(result, file.type, file.name);
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
      setUploading(false);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    onFileSelect('', '', '');
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptedTypes}
        onChange={handleChange}
        className="hidden"
      />
      
      {currentFile?.url ? (
        <div className="relative group">
          <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg p-4 bg-white dark:bg-gray-800">
            <div className="flex items-center space-x-3">
              <div className={`${getFileTypeColor(currentFile.type)}`}>
                {getFileIcon(currentFile.type)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {currentFile.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {currentFile.type}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleButtonClick}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 p-2 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-300"
                  disabled={uploading}
                  title="Change file"
                >
                  <Upload className="h-4 w-4" />
                </button>
                <button
                  onClick={removeFile}
                  className="bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 p-2 rounded-full hover:bg-red-200 dark:hover:bg-red-800 transition-colors duration-300"
                  title="Remove file"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Preview for images */}
            {currentFile.type.startsWith('image/') && (
              <div className="mt-3">
                <img
                  src={currentFile.url}
                  alt="Preview"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
            dragActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          } ${uploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={handleButtonClick}
        >
          <div className="flex flex-col items-center space-y-3">
            {uploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            ) : (
              <Upload className="h-8 w-8 text-gray-400" />
            )}
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {uploading ? (
                'Uploading...'
              ) : (
                <>
                  <span className="font-medium text-blue-600 dark:text-blue-400">Click to {label.toLowerCase()}</span>
                  {' or drag and drop'}
                </>
              )}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Images, Videos, Audio, Documents up to {maxSize}MB
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded-full">Images</span>
              <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs px-2 py-1 rounded-full">Videos</span>
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs px-2 py-1 rounded-full">Audio</span>
              <span className="bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs px-2 py-1 rounded-full">Documents</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;