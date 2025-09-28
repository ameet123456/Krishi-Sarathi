import React, { useState, useRef } from 'react'
import { Upload, FileImage, AlertCircle, CheckCircle, X } from 'lucide-react'

function Disease_detection() {
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  const sampleResults = [
    {
      id: 1,
      name: 'Tomato Leaf Spot',
      diagnosis: 'Identified leaf spot disease in your tomato crop.',
      solution: 'Apply a fungicide spray and ensure proper ventilation to prevent further spread.',
      image: 'tomato',
      severity: 'moderate'
    },
    {
      id: 2,
      name: 'Rice Blast',
      diagnosis: 'Detected rice blast disease, a common fungal infection.',
      solution: 'Use resistant rice varieties and apply appropriate fungicides at the first sign of infection.',
      image: 'rice',
      severity: 'high'
    },
    {
      id: 3,
      name: 'Sugarcane Red Rot',
      diagnosis: 'Identified red rot disease in your sugarcane crop.',
      solution: 'Immediately remove and destroy infected plants. Use disease-free seeds for future planting.',
      image: 'sugarcane',
      severity: 'high'
    }
  ]

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.type.startsWith('image/')) {
        setUploadedFile(file)
      }
    }
  }

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.type.startsWith('image/')) {
        setUploadedFile(file)
      }
    }
  }

  const handleUpload = async () => {
    if (!uploadedFile) return
    
    setIsUploading(true)
    setShowError(false)
    
    // Simulate API call delay
    setTimeout(() => {
      setIsUploading(false)
      setShowError(true)
    }, 2000)
  }

  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }

  const removeFile = () => {
    setUploadedFile(null)
    setShowError(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const closeError = () => {
    setShowError(false)
  }

  const CropImage = ({ type, className }) => {
    const images = {
      tomato: (
        <div className={`${className} bg-gradient-to-br from-red-100 to-green-200 flex items-center justify-center relative overflow-hidden`}>
          <div className="w-16 h-16 bg-red-400 rounded-full relative">
            <div className="absolute top-2 left-2 w-3 h-3 bg-green-500 rounded-full"></div>
            <div className="absolute top-1 right-3 w-2 h-6 bg-green-600 rounded-full"></div>
          </div>
        </div>
      ),
      rice: (
        <div className={`${className} bg-gradient-to-br from-yellow-100 to-green-300 flex items-center justify-center relative overflow-hidden`}>
          {[...Array(6)].map((_, i) => (
            <div key={i} className="absolute bg-green-500 rounded-full"
                 style={{
                   width: '4px',
                   height: '60%',
                   left: `${20 + i * 10}%`,
                   top: '20%',
                   transform: `rotate(${-10 + Math.random() * 20}deg)`
                 }} />
          ))}
        </div>
      ),
      sugarcane: (
        <div className={`${className} bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center relative overflow-hidden`}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="absolute bg-green-600 rounded"
                 style={{
                   width: '8px',
                   height: '80%',
                   left: `${25 + i * 10}%`,
                   top: '10%',
                   background: `linear-gradient(to top, #16a34a, #22c55e, #dcfce7)`
                 }} />
          ))}
        </div>
      )
    }
    return images[type] || <div className={className}></div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Crop Disease Diagnosis
          </h1>
          <p className="text-gray-600 text-lg">
            Upload an image of your crop, and we'll provide a quick diagnosis and actionable solutions.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-12">
          <div
            className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
              dragActive 
                ? 'border-green-400 bg-green-50' 
                : uploadedFile 
                ? 'border-green-300 bg-green-50' 
                : 'border-gray-300 bg-gray-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            {uploadedFile ? (
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <FileImage className="text-green-500" size={24} />
                  <span className="text-gray-700 font-medium">{uploadedFile.name}</span>
                  <button 
                    onClick={removeFile}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="w-32 h-32 mx-auto bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src={URL.createObjectURL(uploadedFile)} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white px-8 py-3 rounded-lg font-medium transition-colors inline-flex items-center space-x-2"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <span>Analyze Image</span>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="text-green-500" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-700 mb-2">
                    Drag & drop files or browse
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    Supported formats: JPG, PNG, GIF (Max 10MB)
                  </p>
                  <button
                    onClick={handleBrowseClick}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                  >
                    Browse Files
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {showError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <AlertCircle className="text-red-500" size={20} />
              <div>
                <h4 className="text-red-800 font-medium">Could not connect to server</h4>
                <p className="text-red-600 text-sm">Please check your internet connection and try again.</p>
              </div>
            </div>
            <button 
              onClick={closeError}
              className="text-red-400 hover:text-red-600 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Sample Results */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Sample Diagnosis Results</h2>
          <div className="space-y-6">
            {sampleResults.map((result) => (
              <div key={result.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-48 h-48 md:h-auto">
                    <CropImage type={result.image} className="w-full h-full" />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-gray-800">{result.name}</h3>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        result.severity === 'high' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {result.severity === 'high' ? 'High Risk' : 'Moderate Risk'}
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm font-medium text-gray-600">Diagnosis: </span>
                        <span className="text-gray-700">{result.diagnosis}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-600">Solution: </span>
                        <span className="text-gray-700">{result.solution}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default Disease_detection