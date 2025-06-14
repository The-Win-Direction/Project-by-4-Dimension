import { motion } from 'framer-motion';
import { FaLinkedin, FaFacebook, FaGithub } from 'react-icons/fa';
import Dipaimg from '../../assets/dipaPic.jpg';
import Dipakimg from '../../assets/dipakPic.jpg';
import Dilendraimg from '../../assets/dilendraPic.jpg';
import Sammyimg from '../../assets/sammyPic.jpg';

const teamMembers = [
      {
    name: 'Sameer Bhatt',
    role: 'UI/UX Designer & System Analyst',
    desc: 'Blends system architecture with thoughtful design for smooth product performance.',
    image: Sammyimg,
    socials: {
      linkedin: 'https://www.linkedin.com/in/dipak-raj-giri-970069234/',
      facebook: 'https://www.facebook.com/lokesh.bhatt.4447',
      github: 'https://github.com/sameerbhatta',
    },
  },
  { 
    name: 'Dipa Joshi',
    role: 'Frontend Developer ',
    desc: 'Designs clean, user-centric interfaces and crafts responsive frontend architecture.',
    image: Dipaimg,
    socials: {
      linkedin: 'https://www.linkedin.com/in/dipa-joshi-548a79233/',
      facebook: 'https://www.facebook.com/dipa.joshi.276378/',
      github: 'https://github.com/dipajoshi',
    },
  },
  {
    name: 'Dipak Raj Giri',
    role: 'FullStack Developer & AI Engineer',
    desc: 'Develops APIs and machine learning models for smart crop prediction and decision support.',
    image: Dipakimg,
    socials: {
      linkedin: 'https://www.linkedin.com/in/dipak-raj-giri-970069234/',
      facebook: 'https://www.facebook.com/dipak.rajgiri.393',
      github: 'https://github.com/dipakgiri',
    },
  },
  {
    name: 'Dilendra Singh Thagunna',
    role: 'AI and ML Developer',
    desc: 'Builds and optimizes ML pipelines, with a passion for deep learning in agriculture.',
    image: Dilendraimg,
    socials: {
      linkedin: 'https://www.linkedin.com/in/dipak-raj-giri-970069234/',
      facebook: 'https://www.facebook.com/dilendra.singh.473610',
      github: 'https://github.com/dilenarasingh',
    },
  },

];

function OurTeam() {
  return (
    <section className="bg-white py-16 px-6 md:px-20 lg:px-36">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-green-800">Meet Our Team</h2>
        <p className="text-gray-600 mt-3 text-lg max-w-3xl mx-auto">
          A passionate group of innovators reshaping the future of farming with smart design and AI.
        </p>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-green-50 border border-green-100 rounded-2xl p-5 flex flex-col items-center text-center hover:shadow-xl transition-all group"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-green-300 mb-4 group-hover:scale-105 transition"
            />
            <h3 className="text-lg font-semibold text-green-800">{member.name}</h3>
            <p className="text-sm text-green-700 mb-2">{member.role}</p>
            <p className="text-gray-600 text-sm">{member.desc}</p>

            <div className="flex gap-4 mt-4">
              {member.socials.linkedin && (
                <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="text-green-600 hover:text-blue-700 hover:scale-110 transition-transform duration-200 text-xl" />
                </a>
              )}
              {member.socials.facebook && (
                <a href={member.socials.facebook} target="_blank" rel="noopener noreferrer">
                  <FaFacebook className="text-green-600 hover:text-blue-600 hover:scale-110 transition-transform duration-200 text-xl" />
                </a>
              )}
              {member.socials.github && (
                <a href={member.socials.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="text-green-600 hover:text-gray-800 hover:scale-110 transition-transform duration-200 text-xl" />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default OurTeam;
