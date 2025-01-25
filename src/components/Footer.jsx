import React from "react";
import { Github, Twitter, Heart, Film } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Film className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-bold text-white">La Movies</h3>
            </div>
            <p className="text-sm leading-relaxed">
              Your ultimate destination for discovering movies. We provide
              detailed information about the latest and greatest films, helping
              you find your next favorite watch.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Powered By
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.themoviedb.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-blue-500 transition-colors"
                >
                  The Movie Database (TMDB)
                </a>
              </li>
              <li>
                <a
                  href="https://react.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-blue-500 transition-colors"
                >
                  React
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-blue-500 transition-colors"
                >
                  Tailwind CSS
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Mojeeb2002"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/Mojeeb_Dafallah"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-500 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">
              © {currentYear} La Movies. All rights reserved.
            </p>
            <p className="text-sm flex items-center gap-1 mt-4 md:mt-0">
              Made with <Heart className="w-4 h-4 text-red-500" /> by La Movies
              Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
