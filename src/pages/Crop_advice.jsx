import React, { useState } from 'react'
import { ChevronDown, MapPin } from 'lucide-react'

function Crop_advice() {
  const [formData, setFormData] = useState({
    soilType: '',
    location: '',
    season: ''
  })
  const [showRecommendations, setShowRecommendations] = useState(true)

  const soilTypes = [
    'Select Soil Type',
    'Clay Soil',
    'Sandy Soil',
    'Loamy Soil',
    'Silt Soil',
    'Peaty Soil',
    'Chalky Soil'
  ]

  const seasons = [
    'Select Season',
    'Spring (March - May)',
    'Summer (June - August)',
    'Monsoon (June - September)',
    'Post-Monsoon (October - November)',
    'Winter (December - February)'
  ]

  const recommendedCrops = [
    {
      name: 'Wheat',
      profit: 'Rs 50,000/acre',
      status: 'Estimated Profit',
      image: 'wheat',
      bgColor: 'bg-yellow-50'
    },
    {
      name: 'Rice',
      profit: 'Rs 60,000/acre',
      status: 'Estimated Profit',
      image: 'rice',
      bgColor: 'bg-green-50'
    },
    {
      name: 'Cotton',
      profit: 'Rs 70,000/acre',
      status: 'Estimated Profit',
      image: 'cotton',
      bgColor: 'bg-blue-50'
    },
    {
      name: 'Sugarcane',
      profit: 'Rs 80,000/acre',
      status: 'Estimated Profit',
      image: 'sugarcane',
      bgColor: 'bg-green-50'
    }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleGetRecommendations = () => {
    if (formData.soilType && formData.location && formData.season) {
      setShowRecommendations(true)
      // Here you would typically make an API call to get recommendations
      console.log('Getting recommendations for:', formData)
    } else {
      alert('Please fill in all fields')
    }
  }

  const CropImage = ({ type, className }) => {
    const images = {
      wheat: (
        <div className={`${className} bg-gradient-to-br from-yellow-200 to-yellow-400 flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-30">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`absolute w-1 bg-yellow-600 transform rotate-12`} 
                   style={{
                     height: '60%',
                     left: `${15 + i * 12}%`,
                     top: '20%',
                     transformOrigin: 'bottom'
                   }} />
            ))}
          </div>
          <div className="text-yellow-800 text-2xl font-bold">🌾</div>
        </div>
      ),
      rice: (
        <div className={`${className} bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-40">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="absolute w-8 h-16 bg-green-600 rounded-t-full"
                   style={{
                     left: `${10 + i * 10}%`,
                     top: '30%',
                     transform: `rotate(${-15 + Math.random() * 30}deg)`
                   }} />
            ))}
          </div>
          <div className="text-green-800 text-2xl font-bold">🌾</div>
        </div>
      ),
      cotton: (
        <div className={`${className} bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="absolute w-3 h-8 bg-green-400 rounded"
                   style={{
                     left: `${20 + i * 15}%`,
                     top: '40%'
                   }} />
            ))}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="absolute w-4 h-4 bg-white rounded-full border-2 border-gray-200"
                   style={{
                     left: `${25 + i * 15}%`,
                     top: '25%'
                   }} />
            ))}
          </div>
        </div>
      ),
      sugarcane: (
        <div className={`${className} bg-gradient-to-br from-green-300 to-green-500 flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-60">
            {[...Array(7)].map((_, i) => (
              <div key={i} className="absolute bg-green-600 rounded-full"
                   style={{
                     width: '6px',
                     height: '70%',
                     left: `${15 + i * 10}%`,
                     top: '15%',
                     background: `linear-gradient(to top, #16a34a, #22c55e)`
                   }} />
            ))}
          </div>
          <div className="text-green-900 text-2xl font-bold">🎋</div>
        </div>
      )
    }
    return images[type] || <div className={className}></div>
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Get Personalized Crop Recommendations
          </h1>
          <p className="text-gray-600 text-lg">
            Fill in the details below to receive expert advice tailored to your farm
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-12 max-w-2xl mx-auto">
          <div className="space-y-6">
            {/* Soil Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Soil Type
              </label>
              <div className="relative">
                <select
                  value={formData.soilType}
                  onChange={(e) => handleInputChange('soilType', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer text-gray-700"
                >
                  {soilTypes.map((type, index) => (
                    <option key={index} value={index === 0 ? '' : type} disabled={index === 0}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Enter Village/District"
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
                />
              </div>
            </div>

            {/* Season */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Season
              </label>
              <div className="relative">
                <select
                  value={formData.season}
                  onChange={(e) => handleInputChange('season', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer text-gray-700"
                >
                  {seasons.map((season, index) => (
                    <option key={index} value={index === 0 ? '' : season} disabled={index === 0}>
                      {season}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleGetRecommendations}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Get Recommendations
            </button>
          </div>
        </div>

        {/* Recommended Crops */}
        {showRecommendations && (
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 text-center">
              Recommended Crops
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedCrops.map((crop, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                  <CropImage type={crop.image} className="h-48 w-full" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{crop.name}</h3>
                    <p className="text-sm text-gray-600 mb-1">{crop.status}</p>
                    <p className="text-lg font-bold text-green-600">{crop.profit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Crop_advice