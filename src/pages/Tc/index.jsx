// src/pages/Terms/index.jsx

import { FaFileContract } from "react-icons/fa";

const Tc = () => {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using this website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, please discontinue use of the website immediately.",
    },
    {
      title: "2. Use of Services",
      content:
        "You agree to use our services only for lawful purposes. You must not misuse the website, interfere with its functionality, or attempt unauthorized access to our systems.",
    },
    {
      title: "3. User Accounts",
      content:
        "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
    },
    {
      title: "4. Intellectual Property",
      content:
        "All content, including text, graphics, logos, images, and software, is the property of the company and is protected by applicable copyright and intellectual property laws.",
    },
    {
      title: "5. Privacy",
      content:
        "Your use of our services is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information.",
    },
    {
      title: "6. Limitation of Liability",
      content:
        "The company shall not be liable for any indirect, incidental, or consequential damages arising from your use of the website or services.",
    },
    {
      title: "7. Changes to Terms",
      content:
        "We reserve the right to modify these Terms and Conditions at any time. Continued use of the website after changes are posted constitutes your acceptance of the updated terms.",
    },
    {
      title: "8. Contact Information",
      content:
        "If you have any questions regarding these Terms and Conditions, please contact us at support@example.com.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <FaFileContract className="text-6xl mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold">
            Terms & Conditions
          </h1>
          <p className="mt-4 text-lg text-blue-100">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-sm text-gray-500 mb-8">
            <strong>Effective Date:</strong> August 3, 2026
          </p>

          {sections.map((section, index) => (
            <div key={index} className="mb-8 border-b border-gray-200 pb-6 last:border-none">
              <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-8">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm">
            © 2026 Your Company Name. All rights reserved.
          </p>
          <p className="mt-2 text-sm">
            For questions regarding these Terms & Conditions, contact
            <span className="text-blue-400"> support@example.com</span>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Tc;