import React from "react";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Introduction</h2>
          <p className="text-gray-600 leading-relaxed">
            Welcome to our website! We value your privacy and are committed to protecting your personal information. This Privacy Policy explains what data we collect, how we use it, and your rights as a user of our website and extension.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Information We Collect</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>
              <strong>User-Provided Data:</strong> When you sign in using Google authentication, we collect your name and email address.
            </li>
            <li>
              <strong>Saved Fragments:</strong> Any data you save, including images, text, videos, and other media, is securely stored in our database.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">How We Use Your Information</h2>
          <p className="text-gray-600 leading-relaxed">
            We use the information you provide solely to enable the functionality of our website and extension. Your data is not shared with any third parties.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">User Rights</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>You can request the deletion of your account and all associated data at any time.</li>
            <li>You can download a copy of your saved data for your records.</li>
            <li>You can deactivate your account if you no longer wish to use our services.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Security</h2>
          <p className="text-gray-600 leading-relaxed">
            We prioritize the security of your data. All sensitive information, including your saved fragments, is encrypted and stored securely. We use industry-standard measures to protect against unauthorized access.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Permissions in the Browser Extension</h2>
          <p className="text-gray-600 leading-relaxed">
            Our browser extension requires certain permissions to function:
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li>
              <strong>Active Tab:</strong> To detect the current website you are visiting.
            </li>
            <li>
              <strong>Cookies:</strong> To maintain your authentication session with the website.
            </li>
            <li>
              <strong>Storage:</strong> To store temporary data for saving fragments.
            </li>
            <li>
              <strong>Scripting:</strong> To enable features like the popup button for saving selected text.
            </li>
            <li>
              <strong>Context Menu:</strong> To provide quick access to your capsules.
            </li>
            <li>
              <strong>Identity:</strong> To link your extension to your website account.
            </li>
            <li>
              <strong>Host Permissions:</strong> To allow saving data from the websites you visit.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Changes to This Privacy Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be reflected on this page, and we encourage you to review it periodically.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us at healthyfoodie4@gmail.com .
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
