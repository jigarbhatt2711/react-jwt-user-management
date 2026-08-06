// src/pages/About/index.jsx

import { FaUsers, FaBullseye, FaEye, FaHandshake } from "react-icons/fa";

const About = () => {
  const stats = [
    { number: "10+", label: "Years Experience" },
    { number: "500+", label: "Projects Completed" },
    { number: "100+", label: "Happy Clients" },
    { number: "50+", label: "Team Members" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg max-w-3xl mx-auto">
            We are passionate about building innovative digital solutions that
            help businesses grow and succeed in today's competitive world.
          </p>
        </div>
      </section>

      {/* Company Info */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt="Our Team"
              className="rounded-xl shadow-lg"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Who We Are</h2>

            <p className="text-gray-600 leading-8 mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus accusamus dignissimos molestiae nostrum adipisci
              deserunt asperiores rem pariatur laboriosam, quae illum minus
              veniam consequatur neque.
            </p>

            <p className="text-gray-600 leading-8">
              Our dedicated team focuses on delivering high-quality web
              applications, mobile solutions, and cloud-based services that
              exceed customer expectations.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Vision Values */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">

          <div className="bg-gray-50 rounded-xl shadow p-8 text-center hover:shadow-xl transition">
            <FaBullseye className="text-blue-600 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
            <p className="text-gray-600">
              Deliver innovative technology solutions that empower businesses
              and improve people's lives.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl shadow p-8 text-center hover:shadow-xl transition">
            <FaEye className="text-blue-600 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
            <p className="text-gray-600">
              Become a trusted global technology partner recognized for quality,
              innovation, and customer satisfaction.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl shadow p-8 text-center hover:shadow-xl transition">
            <FaHandshake className="text-blue-600 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-semibold mb-3">Our Values</h3>
            <p className="text-gray-600">
              Integrity, teamwork, innovation, transparency, and continuous
              learning drive everything we do.
            </p>
          </div>

        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((item, index) => (
              <div key={index}>
                <h2 className="text-4xl font-bold">{item.number}</h2>
                <p className="mt-2">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-10">
            Meet Our Team
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            {[1, 2, 3].map((member) => (
              <div
                key={member}
                className="bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
              >
                <img
                  src={`https://i.pravatar.cc/400?img=${member + 10}`}
                  alt="Team Member"
                  className="w-full h-72 object-cover"
                />

                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold">
                    John Doe {member}
                  </h3>

                  <p className="text-blue-600 mb-3">
                    Senior Software Engineer
                  </p>

                  <p className="text-gray-600 text-sm">
                    Passionate about creating scalable, secure, and modern web
                    applications.
                  </p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-6">

          <FaUsers className="text-5xl mx-auto mb-5 text-blue-400" />

          <h2 className="text-4xl font-bold mb-4">
            Let's Build Something Amazing Together
          </h2>

          <p className="mb-8 text-gray-300">
            Whether you're a startup or an enterprise, we're here to help you
            transform your ideas into reality.
          </p>

          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-semibold transition">
            Contact Us
          </button>

        </div>
      </section>
    </div>
  );
};

export default About;