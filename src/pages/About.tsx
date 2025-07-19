import React from 'react';
import { Users, Target, Award, Heart, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://m.media-amazon.com/images/I/81qUxvoes+L.png',
      bio: 'Passionate about creating platforms that empower writers and readers alike.'
    },
    {
      name: 'Mike Chen',
      role: 'CTO',
      image: 'https://wallpapers.com/images/hd/anime-boy-pictures-uw1q8r48xulhmkkk.jpg',
      bio: 'Technology enthusiast with 10+ years of experience in web development.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Content',
      image: 'https://www.papirmass.com/wp-content/uploads/2024/06/anime-girl-names.jpg',
      bio: 'Former journalist with a passion for quality content and storytelling.'
    },
    {
      name: 'David Kim',
      role: 'Lead Designer',
      image: 'https://wallpapers-clan.com/wp-content/uploads/2024/06/anime-boy-dark-hair-casual-look-desktop-wallpaper-cover.jpg',
      bio: 'Creative designer focused on user experience and beautiful interfaces.'
    }
  ];

  const values = [
    {
      icon: <Heart className="h-8 w-8" />,
      title: 'Passion for Quality',
      description: 'We believe in creating content that matters and platforms that inspire.'
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Community First',
      description: 'Our community of writers and readers is at the heart of everything we do.'
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Innovation',
      description: 'We continuously evolve to provide the best blogging experience possible.'
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Excellence',
      description: 'We strive for excellence in every aspect of our platform and service.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About BlogPro</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to democratize publishing and give everyone a voice. 
              Our platform empowers writers to share their stories and connect with readers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                 Blog started with one simple idea:
                  Everyone has a story worth sharing.

                 Launched in 2020 by a small group of writers and developers, we were tired of clunky, complicated blogging tools. So we built our own — one that’s simple for beginners and powerful for pros.

                  Fast forward to today, BlogPro supports thousands of creators and reaches millions of readers around the world.


                </p>
                <p>
                  We wanted to create something different – a platform that was both powerful 
                  for experienced writers and accessible for beginners. Today, we're proud to 
                  serve thousands of writers and millions of readers worldwide.
                </p>
                <p>
                  Our journey has been driven by our community's feedback and our commitment 
                  to continuous improvement. Every feature we build, every design decision we 
                  make, is guided by one question: "How can we better serve our writers and readers?"
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Team working together"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              These core values guide everything we do and shape the culture of our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-white">
                    {value.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The passionate individuals behind BlogPro who work tirelessly to make your blogging experience exceptional.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">BlogPro by the Numbers</h2>
            <p className="text-xl text-gray-600">Our growing community and impact</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">5k+</div>
              <div className="text-gray-600">Active Writers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">1K+</div>
              <div className="text-gray-600">Published Articles</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">1k+</div>
              <div className="text-gray-600">Monthly Readers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">5+</div>
              <div className="text-gray-600">Countries</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Join Our Community?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Whether you're a seasoned writer or just starting your journey, 
            BlogPro provides the tools and community you need to succeed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 inline-flex items-center justify-center">
              Start Writing Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 inline-flex items-center justify-center">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;