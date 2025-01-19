import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
    const naviagte = useNavigate();
function redirectToLogin() {
  naviagte("/app/auth");
}

  return (
    <div className="bg-gray-50 min-h-screen text-gray-800">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Organize Your Digital Life Effortlessly
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Save and organize all your content—text, images, videos, and more—in one place.
        </p>
        <div className="space-x-4">
          <button onClick={redirectToLogin} className="bg-white text-blue-500 font-bold px-6 py-3 rounded shadow hover:bg-gray-100">
            Get Started
          </button>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Create Capsules</h3>
              <p>Easily create capsules to organize your content fragments in a structured way.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Tag and Search</h3>
              <p>Use tags and search functionality to find your content quickly and efficiently.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Browser Extension</h3>
              <p>Save text directly from any webpage into your active capsule effortlessly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problems We Solve Section */}
      <section id="problems" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Problems We Solve</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg shadow-md" style={{ background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)' }}>
              <h3 className="text-xl font-semibold mb-4">Content Overload</h3>
              <p>Store and forget scattered content from blogs, screenshots, or files until you need it.</p>
            </div>
            <div className="p-6 rounded-lg shadow-md" style={{ background: 'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)' }}>
              <h3 className="text-xl font-semibold mb-4">Disorganized Data</h3>
              <p>Organize your content neatly into capsules, making it easier to retrieve later.</p>
            </div>
            <div className="p-6 rounded-lg shadow-md" style={{ background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)' }}>
              <h3 className="text-xl font-semibold mb-4">Manual Text Saving</h3>
              <p>Save text from any webpage directly to any capsule without the hassle of copy-pasting using our extension.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">1. Create an Account</h3>
              <p>Sign up and start creating your capsules to store and organize content.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">2. Add Fragments</h3>
              <p>Save images, videos, notes, and other media as fragments inside capsules.</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">3. Use the Extension</h3>
              <p>Select text on any website and save it directly to an active capsule.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-10 px-4 text-center">
        <p className="mb-4">&copy; 2025 Saveit.tech . All rights reserved.</p>
        <div className="space-x-4">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
          <a href="#" className="hover:underline">
            Contact Us
          </a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
