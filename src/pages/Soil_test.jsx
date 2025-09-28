import React, { useState } from 'react'
import { ChevronDown, FileText, Eye } from 'lucide-react'

function Soil_test() {
  const [formData, setFormData] = useState({
    farmerName: '',
    contactNumber: '',
    address: '',
    pincode: '',
    preferredDate: '',
    preferredTime: ''
  })

  const timeSlots = [
    'Select a time slot',
    '9:00 AM - 11:00 AM',
    '11:00 AM - 1:00 PM',
    '2:00 PM - 4:00 PM',
    '4:00 PM - 6:00 PM'
  ]

  const pastReports = [
    {
      id: 1,
      date: 'Soil Test - 15th March 2023',
      status: 'Good',
      ph: '6.8',
      nitrogen: '280 kg/ha',
      phosphorus: '25 kg/ha',
      potassium: '150 kg/ha'
    },
    {
      id: 2,
      date: 'Soil Test - 10th October 2022',
      status: 'Average',
      ph: '6.5',
      nitrogen: '250 kg/ha',
      phosphorus: '20 kg/ha',
      potassium: '145 kg/ha'
    }
  ]

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    // Validate all fields are filled
    const requiredFields = ['farmerName', 'contactNumber', 'address', 'pincode', 'preferredDate', 'preferredTime']
    const missingFields = requiredFields.filter(field => !formData[field])
    
    if (missingFields.length > 0) {
      alert('Please fill in all fields')
      return
    }
    
    // Submit logic here
    console.log('Booking soil test:', formData)
    alert('Soil test booked successfully!')
  }

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'good':
        return 'text-green-600 bg-green-50'
      case 'average':
        return 'text-yellow-600 bg-yellow-50'
      case 'poor':
        return 'text-red-600 bg-red-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Book a Soil Test
          </h1>
          <p className="text-gray-600 text-lg">
            Simple, easy, and convenient test your soil's health.
          </p>
        </div>

        {/* Booking Form */}
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-12 max-w-2xl mx-auto">
          <div className="space-y-6">
            {/* Farmer's Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Farmer's Name
              </label>
              <input
                type="text"
                value={formData.farmerName}
                onChange={(e) => handleInputChange('farmerName', e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number
              </label>
              <input
                type="tel"
                value={formData.contactNumber}
                onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                placeholder="Enter your mobile number"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="Enter your full address"
                rows={3}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700 resize-none"
              />
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pincode
              </label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                placeholder="Enter your area pincode"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
              />
            </div>

            {/* Date and Time Row */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Preferred Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={formData.preferredDate}
                  onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-700"
                />
              </div>

              {/* Preferred Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Time
                </label>
                <div className="relative">
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => handleInputChange('preferredTime', e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none cursor-pointer text-gray-700"
                  >
                    {timeSlots.map((time, index) => (
                      <option key={index} value={index === 0 ? '' : time} disabled={index === 0}>
                        {time}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Book Test
            </button>
          </div>
        </div>

        {/* Past Soil Health Reports */}
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Past Soil Health Reports
            </h2>
            <p className="text-gray-600">
              Check the health of your soil over time.
            </p>
          </div>

          <div className="space-y-4">
            {pastReports.map((report) => (
              <div key={report.id} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                  {/* Report Info */}
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <FileText className="text-green-600" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-1">{report.date}</h3>
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </div>
                    </div>
                  </div>

                  {/* Report Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-1 lg:max-w-lg">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">pH Level</div>
                      <div className="font-semibold text-gray-800">{report.ph}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Nitrogen (N)</div>
                      <div className="font-semibold text-gray-800">{report.nitrogen}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Phosphorus (P)</div>
                      <div className="font-semibold text-gray-800">{report.phosphorus}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-600 mb-1">Potassium (K)</div>
                      <div className="font-semibold text-gray-800">{report.potassium}</div>
                    </div>
                  </div>

                  {/* View Report Button */}
                  <button className="flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium transition-colors">
                    <Eye size={16} />
                    <span>View Report</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Soil_test
