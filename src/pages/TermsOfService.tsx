import React from 'react';
import { FileText, Users, Shield, AlertTriangle, Scale, Mail } from 'lucide-react';

const TermsOfService: React.FC = () => {
  const sections = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'User Accounts',
      content: [
        'You must be at least 13 years old to create an account',
        'You are responsible for maintaining the security of your account',
        'You must provide accurate and complete information',
        'One person may not maintain multiple accounts'
      ]
    },
    {
      icon: <FileText className="h-6 w-6" />,
      title: 'Content Guidelines',
      content: [
        'You retain ownership of content you create and publish',
        'Content must not violate any laws or infringe on others\' rights',
        'No spam, harassment, or abusive content is allowed',
        'We reserve the right to remove content that violates our guidelines'
      ]
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Acceptable Use',
      content: [
        'Use our services only for lawful purposes',
        'Do not attempt to hack, disrupt, or damage our platform',
        'Respect other users and their content',
        'Do not use our platform for commercial spam or unauthorized advertising'
      ]
    },
    {
      icon: <AlertTriangle className="h-6 w-6" />,
      title: 'Prohibited Activities',
      content: [
        'Posting illegal, harmful, or offensive content',
        'Impersonating others or providing false information',
        'Attempting to gain unauthorized access to accounts or systems',
        'Using automated tools to scrape or harvest data'
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
              <Scale className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
            <p className="text-xl text-blue-100">
              Please read these terms carefully before using BlogPro. By using our service, you agree to these terms.
            </p>
            <p className="text-blue-200 mt-4">Last updated: January 15, 2024</p>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            These Terms of Service ("Terms") govern your use of BlogPro's website and services. 
            By accessing or using our platform, you agree to be bound by these Terms and our Privacy Policy.
          </p>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you disagree with any part of these terms, then you may not access or use our services. 
            These Terms apply to all visitors, users, and others who access or use our service.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-800 font-medium">
              Important: These terms constitute a legally binding agreement between you and BlogPro.
            </p>
          </div>
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

        {/* Service Availability */}
        <div className="bg-white rounded-lg shadow-sm p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Availability</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Uptime</h3>
              <p className="text-gray-700">
                We strive to maintain 99.9% uptime, but cannot guarantee uninterrupted service availability.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Maintenance</h3>
              <p className="text-gray-700">
                We may perform scheduled maintenance that temporarily affects service availability.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Updates</h3>
              <p className="text-gray-700">
                We regularly update our platform to improve functionality and security.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Support</h3>
              <p className="text-gray-700">
                Technical support is available through our contact channels during business hours.
              </p>
            </div>
          </div>
        </div>

        {/* Intellectual Property */}
        <div className="bg-white rounded-lg shadow-sm p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Intellectual Property Rights</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Content</h3>
              <p className="text-gray-700 leading-relaxed">
                You retain all rights to the content you create and publish on BlogPro. By publishing content, 
                you grant us a non-exclusive license to display, distribute, and promote your content on our platform.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Platform</h3>
              <p className="text-gray-700 leading-relaxed">
                BlogPro and its original content, features, and functionality are owned by us and are protected 
                by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Respect Others' Rights</h3>
              <p className="text-gray-700 leading-relaxed">
                You must not publish content that infringes on others' intellectual property rights. 
                We will respond to valid DMCA takedown notices and may terminate accounts of repeat infringers.
              </p>
            </div>
          </div>
        </div>

        {/* Limitation of Liability */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitation of Liability</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            BlogPro is provided "as is" without warranties of any kind. We do not guarantee that our service 
            will be uninterrupted, secure, or error-free. To the fullest extent permitted by law, we disclaim 
            all warranties and limit our liability for any damages arising from your use of our service.
          </p>
          <div className="bg-yellow-100 rounded-lg p-4">
            <p className="text-yellow-800 font-medium">
              This limitation of liability applies to all claims, whether based on warranty, contract, tort, or any other legal theory.
            </p>
          </div>
        </div>

        {/* Termination */}
        <div className="bg-white rounded-lg shadow-sm p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Termination</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">By You</h3>
              <p className="text-gray-700">
                You may terminate your account at any time through your account settings. 
                Upon termination, your right to use our service will cease immediately.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">By Us</h3>
              <p className="text-gray-700">
                We may terminate or suspend your account immediately if you violate these Terms, 
                engage in prohibited activities, or for any other reason at our sole discretion.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Effect of Termination</h3>
              <p className="text-gray-700">
                Upon termination, your published content may remain publicly available, but you will 
                lose access to your account and the ability to manage your content.
              </p>
            </div>
          </div>
        </div>

        {/* Changes to Terms */}
        <div className="bg-white rounded-lg shadow-sm p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to These Terms</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We reserve the right to modify or replace these Terms at any time. If a revision is material, 
            we will try to provide at least 30 days notice prior to any new terms taking effect.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Your continued use of our service after any changes to these Terms constitutes acceptance 
            of those changes. If you do not agree to the new terms, you must stop using our service.
          </p>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mt-8 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Mail className="h-6 w-6" />
            <h2 className="text-2xl font-bold">Questions About These Terms?</h2>
          </div>
          <p className="text-blue-100 mb-6">
            If you have any questions about these Terms of Service, please contact us. 
            We're here to help clarify any concerns you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div>
              <p className="font-semibold mb-1">Email Us</p>
              <p className="text-blue-200">legal@blogpro.com</p>
            </div>
            <div>
              <p className="font-semibold mb-1">Mail Us</p>
              <p className="text-blue-200">BlogPro Legal Team<br />New York, NY 10001</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;