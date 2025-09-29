import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  Bug,
  Leaf,
  Sun,
  TrendingUp,
  Wheat,
  MessageCircle,
} from "lucide-react";
const API_KEY = process.env.REACT_APP_WEATHER_API;

const Dashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("Delhi");
  const navigate = useNavigate();

  // Fetch weather from WeatherAPI
  useEffect(() => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.current) setWeatherData(data.current);
      })
      .catch((err) => console.error("Weather fetch error:", err));
  }, [location]);

  // Generate dynamic farming tips
  const getFarmingTips = (weather) => {
    if (!weather) return [];

    const tips = [];

    // Rainy conditions
    if (weather.condition.text.includes("Rain")) {
      tips.push(
        {
          type: "do",
          text: "Use rainwater harvesting for irrigation — Barsaat ka paani ikattha kar, future ke liye save kar.",
        },
        {
          type: "dont",
          text: "Avoid spraying pesticides before rain — Barsaat se pehle dawai mat chhidak, sab beh jayegi bekaar mein.",
        }
      );
    }
    // Hot conditions
    else if (weather.temp_c > 32) {
      tips.push(
        {
          type: "do",
          text: "Irrigate crops early morning or late evening — Subah ya shaam paani daal, dhoop mein mat.",
        },
        {
          type: "dont",
          text: "Avoid midday watering — Dopehar mein paani dena waste hai bhai!",
        }
      );
    }
    // Humid conditions
    else if (weather.humidity > 75) {
      tips.push(
        {
          type: "do",
          text: "Check crops for fungus — Fungal disease dekho aur turant handle karo.",
        },
        {
          type: "dont",
          text: "Avoid storing wet harvested crops — Geela anaj mat store kar, kharab ho jayega.",
        }
      );
    }
    // Windy conditions
    else if (weather.wind_kph > 20) {
      tips.push(
        {
          type: "do",
          text: "Secure lightweight plants and mulch — Hawa zyada hai, sab ko sambhal ke rakh.",
        },
        {
          type: "dont",
          text: "Don't spray pesticides in strong wind — Dawai hawa mein udd jayegi, bekaar hai.",
        }
      );
    }
    // Default tips
    else {
      tips.push(
        {
          type: "do",
          text: "Monitor soil moisture regularly — Mitti ki nami check karte raho.",
        },
        {
          type: "dont",
          text: "Avoid over-fertilizing — Zyada khaad mat daal, mitti kharab ho sakti hai.",
        }
      );
    }

    return tips;
  };

  const tips = getFarmingTips(weatherData);

  return (
    <div className="min-h-screen bg-green-50 text-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section - HOME */}
        <section id="home" className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-6xl md:text-7xl font-bold mb-6 text-gray-900 leading-snug">
                Welcome to
                <br />
                Krishi Sarathii
              </h1>

              {/* Weather Display */}
              <p className="text-gray-600 text-lg mb-6">
                {weatherData
                  ? `Today: ${weatherData.condition.text} · ${weatherData.temp_c}°C · Humidity ${weatherData.humidity}%`
                  : "Fetching weather..."}
              </p>
            </div>

            {/* Dynamic Do's & Don'ts */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                Farming Do's & Don'ts
              </h3>
              <ul className="space-y-3 text-sm">
                {tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start">
                    {tip.type === "do" ? (
                      <CheckCircle
                        className="text-green-500 mr-3 mt-0.5 flex-shrink-0"
                        size={16}
                      />
                    ) : (
                      <XCircle
                        className="text-red-500 mr-3 mt-0.5 flex-shrink-0"
                        size={16}
                      />
                    )}
                    <span>
                      <span className="font-semibold">
                        {tip.type === "do" ? "Do:" : "Don't:"}
                      </span>{" "}
                      {tip.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Core Features - SERVICES */}
        <section id="services" className="mb-16">
          <h3 className="text-3xl font-bold text-center mb-10 text-gray-900">
            Core Features
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 md:gap-8">
            <div
              onClick={() => navigate("/crop-advice")}
              className="bg-white p-6 rounded-2xl shadow-lg text-center flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-105"
            >
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Wheat className="text-green-600" size={32} />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-900">
                Crop Advice
              </h4>
            </div>
            <div
              onClick={() => navigate("/disease-detection")}
              className="bg-white p-6 rounded-2xl shadow-lg text-center flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-105"
            >
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Bug className="text-green-600" size={32} />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-900">
                Disease Detection
              </h4>
            </div>

            <div
              onClick={() => navigate("/soil-test")}
              className="bg-white p-6 rounded-2xl shadow-lg text-center flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-105"
            >
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Leaf className="text-green-600" size={32} />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-900">
                Soil Health Monitoring
              </h4>
            </div>

            <div
              onClick={() => navigate("/weather")}
              className="bg-white p-6 rounded-2xl shadow-lg text-center flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-105"
            >
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Sun className="text-green-600" size={32} />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-900">
                Weather Forecasting
              </h4>
            </div>

            <div
              onClick={() => navigate("/market-price")}
              className="bg-white p-6 rounded-2xl shadow-lg text-center flex flex-col items-center justify-center hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-105"
            >
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <TrendingUp className="text-green-600" size={32} />
              </div>
              <h4 className="font-semibold text-lg mb-2 text-gray-900">
                Market Prices
              </h4>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section id="support" className="mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h3 className="text-3xl font-bold text-center mb-6 text-gray-900">
              Need Help?
            </h3>
            <div className="text-center">
              <p className="text-gray-600 text-lg mb-6 max-w-2xl mx-auto">
                Our team of agricultural experts is here to help you 24/7. Get
                personalized advice for your farming needs.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-lg mb-2 text-gray-900">
                    Phone Support
                  </h4>
                  <p className="text-gray-600">1800-123-FARM</p>
                </div>
                <div className="bg-green-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-lg mb-2 text-gray-900">
                    Email Support
                  </h4>
                  <p className="text-gray-600">help@krishisarathi.com</p>
                </div>
                <div className="bg-green-50 p-6 rounded-xl">
                  <h4 className="font-semibold text-lg mb-2 text-gray-900">
                    Chat Support
                  </h4>
                  <p className="text-gray-600">Available 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="mb-16">
          <div className="bg-gradient-to-r from-green-100 to-green-200 rounded-2xl p-12">
            <h3 className="text-3xl font-bold text-center mb-6 text-gray-900">
              About Krishi Sarathi
            </h3>
            <div className="text-center max-w-4xl mx-auto">
              <p className="text-gray-700 text-lg mb-6">
                Krishi Sarathi is your digital farming companion, empowering
                farmers with cutting-edge technology and expert knowledge. We
                combine traditional farming wisdom with modern agricultural
                science to help you make informed decisions.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-green-100 to-green-200 rounded-2xl p-12 text-center shadow-lg">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            Take Your Farm to the Next Level
          </h2>
          <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of smart farmers who are using technology to increase
            yield, reduce costs, and build a sustainable future.
          </p>
          <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105">
            Explore Features
          </button>
        </section>

        {/* Fixed Chat Button */}
        <div className="fixed bottom-6 right-6">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center space-x-2 transition-colors">
            <MessageCircle size={20} />
            <span className="font-medium">Sarathi</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
