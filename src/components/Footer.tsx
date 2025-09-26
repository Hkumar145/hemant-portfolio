import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import BackToTop from "./BackToTop";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10 relative">
      <div className="container mx-auto px-6 text-center">
        <p className="text-lg">
          &copy; {new Date().getFullYear()} Hemant Kumar. All rights reserved.
        </p>

        <div className="flex justify-center space-x-8 mt-6">
          <a
            href="https://github.com/Hkumar145"
            aria-label="GitHub"
            className="hover:text-blue-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaGithub size={28} />
          </a>
          <a
            href="https://www.linkedin.com/in/hemant-e"
            aria-label="LinkedIn"
            className="hover:text-blue-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin size={28} />
          </a>
          <a
            href="mailto:hkumar1698.hk@gmail.com"
            aria-label="Email"
            className="hover:text-blue-400 transition-colors"
          >
            <FaEnvelope size={28} />
          </a>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <BackToTop />
    </footer>
  );
}
