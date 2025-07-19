import React from 'react';
import { Shield, Eye, Lock, Users, FileText, Mail } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  const sections = [
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Information We Collect',
      content: [
        'Personal information you provide when creating an account (name, email address)',
        'Content you create and publish on our platform',
        'Usage data and analytics to improve our services',
        'Device and browser information for security and optimization'
      ]
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: 'How We Use Your Information',
      content: [
        'To provide and maintain our blogging platform services',
        'To personalize your experience and improve our platform',
        'To communicate with you about your account and our services',
        'To ensure platform security and prevent fraud'
      ]
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: 'Data Security',
      content: [
        'We use industry-standard encryption to protect your data',
        'Regular security audits and updates to our systems',
        'Secure data centers with 24/7 monitoring',
        'Limited access to personal data on a need-to-know basis'
      ]
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Information Sharing',
      content: [
        'We do not sell your personal information to third parties',
        'Published content is publicly visible as intended',
        'We may share data with service providers under strict agreements',
        'Legal compliance may require disclosure in certain circumstances'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-blue-200 mt-4">Last updated: January 15, 2024</p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            At BlogPro, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
            blogging platform and related services.
          </p>
          <p className="text-gray-700 leading-relaxed">
            By using BlogPro, you agree to the collection and use of information in accordance with this policy. 
            If you do not agree with our policies and practices, please do not use our services.
          </p>
        </div>

        {/* Main Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.content.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Your Rights */}
        <div className="bg-white rounded-lg shadow-sm p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Rights and Choices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Access and Update</h3>
              <p className="text-gray-700">
                You can access and update your personal information through your account settings at any time.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Data Portability</h3>
              <p className="text-gray-700">
                You can export your content and data from our platform in standard formats.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Account Deletion</h3>
              <p className="text-gray-700">
                You can delete your account and associated data at any time through your account settings.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Communication Preferences</h3>
              <p className="text-gray-700">
                You can control what communications you receive from us through your notification settings.
              </p>
            </div>
          </div>
        </div>

        {/* Cookies */}
        <div className="bg-white rounded-lg shadow-sm p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use cookies and similar tracking technologies to enhance your experience on our platform. 
            Cookies help us remember your preferences, analyze site traffic, and provide personalized content.
          </p>
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Types of Cookies We Use:</h3>
            <ul className="space-y-1 text-gray-700">
              <li>• Essential cookies for platform functionality</li>
              <li>• Analytics cookies to understand usage patterns</li>
              <li>• Preference cookies to remember your settings</li>
              <li>• Security cookies to protect your account</li>
            </ul>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mt-8 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Mail className="h-6 w-6" />
            <h2 className="text-2xl font-bold">Questions About Privacy?</h2>
          </div>
          <p className="text-blue-100 mb-6">
            If you have any questions about this Privacy Policy or our data practices, 
            please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <p className="font-semibold mb-1">Email Us</p>
              <p className="text-blue-200">privacy@blogpro.com</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Mail Us</p>
              <p className="text-blue-200">BlogPro Privacy Team<br />New York, NY 10001</p>
            </div>
          </div>
        </div>

        {/* Updates */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Policy Updates</h3>
          <p className="text-gray-700">
            We may update this Privacy Policy from time to time. We will notify you of any changes by 
            posting the new Privacy Policy on this page and updating the "Last updated" date. 
            We encourage you to review this Privacy Policy periodically for any changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;