import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from "@fortawesome/free-brands-svg-icons";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const LandingPage: React.FC = () => {
  const naviagte = useNavigate();
  function redirectToLogin() {
    naviagte("/app/auth");
  }
  useEffect(() => {
    document.title = "Saveit.tech - Organize Your Digital Life Effortlessly";
  }, []);
  return (
    <>
      <header className="py-5 px-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-xl font-bold">
            <img src="/assets/logo.png" alt="saveit.tech" />
          </div>
          <div>
            <button onClick={redirectToLogin} className="sw-btn">
              Get Started
            </button>
          </div>
        </div>
      </header>
      <div className=" min-h-screen text-gray-800 mt-[30px]">
        <div className="text__head__main text-center mb-5 pb-5">
          <h2 className="display-4 main-heading text-4xl md:text-6xl font-bold mb-6 leading-snug" style={{ fontWeight: "900 !important" }}>
            Organize Your Digital Life Effortlessly
          </h2>
          <p className="caption leading-relaxed">
            Save and organize all your content—text, images, videos, and more—in one place.
          </p>
        </div>



        {/* Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="c-box" style={{ backgroundColor: "#ffdac6" }}>
                <h3 className="text-xl font-semibold mb-4">Create Capsules</h3>
                <p>
                  Easily create capsules to organize your content fragments in a
                  structured way.
                </p>
              </div>
              <div className="c-box" style={{ backgroundColor: "#f6d8ff" }}>
                <h3 className="text-xl font-semibold mb-4">Tag and Search</h3>
                <p>
                  Use tags and search functionality to find your content quickly
                  and efficiently.
                </p>
              </div>
              <div className=" c-box" style={{ backgroundColor: "#d8e5ff" }}>
                <h3 className="text-xl font-semibold mb-4">Browser Extension</h3>
                <p>
                  Save text directly from any webpage into your active capsule
                  effortlessly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Problems We Solve Section */}
        <section id="problems" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Problems We Solve
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div
                className="c-box"
                style={{
                  background: "#ffb7d7",
                }}
              >
                <h3 className="text-xl font-semibold mb-4">Content Overload</h3>
                <p>
                  Store and forget scattered content from blogs, screenshots, or
                  files until you need it.
                </p>
              </div>
              <div
                className="c-box"
                style={{
                  background: "#ebebeb",
                }}
              >
                <h3 className="text-xl font-semibold mb-4">Disorganized Data</h3>
                <p>
                  Organize your content neatly into capsules, making it easier to
                  retrieve later.
                </p>
              </div>
              <div
                className="c-box"
                style={{
                  background: "#baffdc",
                }}
              >
                <h3 className="text-xl font-semibold mb-4">Manual Text Saving</h3>
                <p>
                  Save text from any webpage directly to any capsule without the
                  hassle of copy-pasting using our extension.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="c-box"
                style={{
                  background: "#d8e5ff",
                }}>
                <h3 className="text-xl font-semibold mb-4">
                  1. Create an Account
                </h3>
                <p>
                  Sign up and start creating your capsules to store and organize
                  content.
                </p>
              </div>
              <div className="c-box"
                style={{
                  background: "#ffeb3b",
                }}>
                <h3 className="text-xl font-semibold mb-4">2. Add Fragments</h3>
                <p>
                  Save images, videos, notes, and other media as fragments inside
                  capsules.
                </p>
              </div>
              <div className="c-box"
                style={{
                  background: "#8eddff",
                }}>
                <h3 className="text-xl font-semibold mb-4">
                  3. Use the Extension
                </h3>
                <p>
                  Select text on any website and save it directly to an active
                  capsule.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer-section">
          <div className="footer-main">
            <div className="container mx-auto px-4">
              <div className="footer_logo_secc flex justify-between items-center">
                <div>
                  <img src="/assets/logo.png" />
                </div>
                <div className="footer-widget">
                  <ul>
                    <li><a onClick={() => naviagte("/app/privacy-policy")}
                    >Privacy Policy</a></li>
                    <li><a href="/terms-conditions">Terms & Conditions</a></li>
                    <li><a href="/about-us">About Us</a></li>
                    <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=healthyfoodie4@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer">Contact Us</a></li>
                  </ul>
                </div>
              </div>
              <div className=" py-4">
                <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
                  {/* Copyright Text */}
                  <div className="text-center md:text-left mb-4 md:mb-0">
                    <p className="mb-0">©2025 <a href="#" className="text-blue-400 font-semibold">Saveit.tech</a>. All Rights Reserved</p>
                  </div>
                  {/* Social Icons */}
                  <ul className="flex space-x-4">
                    <li>
                      <a className="text-blue-500 hover:text-blue-400" href="#">
                        <FontAwesomeIcon icon={faFacebookF} />
                      </a>
                    </li>
                    <li>
                      <a className="text-blue-400 hover:text-blue-300" href="#">
                        <FontAwesomeIcon icon={faTwitter} />
                      </a>
                    </li>
                    <li>
                      <a className="text-blue-600 hover:text-blue-500" href="#">
                        <FontAwesomeIcon icon={faLinkedinIn} />
                      </a>
                    </li>
                    <li>
                      <a className="text-pink-500 hover:text-pink-400" href="#">
                        <FontAwesomeIcon icon={faInstagram} />
                      </a>
                    </li>
                  </ul>

                </div>
              </div>
            </div>
          </div>
        </footer>
      </div></>
  );
};

export default LandingPage;
