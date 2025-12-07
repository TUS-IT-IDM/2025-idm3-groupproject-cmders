import React from "react";
import { Link } from "react-router-dom";

const footer = () => {
  return (
    <footer className="bg-[#5B6E99] text-white py-6 mt-auto">
      {/* Main footer row: logo + 2 columns */}
      <div className="w-full px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        {/* Left: logo + copyright, aligned to same vertical line as headings */}
        <div className="flex flex-col items-start gap-2">
          <img
            src="/mosaic.svg"
            alt="Mosaic Logo"
            className="h-16 w-auto"
          />
          <span className="text-xs tracking-wide">
            © 2025 TUS GALLERY
          </span>
        </div>

        {/* Right: two centered columns (MORE INFO + SOCIAL LINKS) */}
        <div className="flex flex-col sm:flex-row gap-12 text-sm">
          {/* MORE INFO column */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-base font-semibold mb-2 tracking-wide">
              MORE INFO
            </h3>
            <ul className="space-y-1">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* SOCIAL LINKS column */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-base font-semibold mb-2 tracking-wide">
              SOCIAL LINKS
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="Facebook"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 30 30"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.56 0-.65.28-.65.71v1.19h2l-.3 2h-1.7v6h-3v-6h-2v-2h2v-1.72c0-2.04 1.13-3.18 3.15-3.18h1.85v3z" />
                  </svg>
                </a>
              </li>
              {/* X (Twitter) */}
            <li>
            <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80 transition-opacity"
                aria-label="X (Twitter)"
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 30 30"
                fill="currentColor"
                >
                {/* Simple X logo */}
                <path d="M4 3l6.5 7.5L4 21h2.5L11 12.75 16.5 21H20l-6.5-7.5L20 3h-2.5L13 10.25 7.5 3H4z" />
                </svg>
            </a>
            </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="Instagram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 30 30"
                    fill="currentColor"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.07 1.645.07 4.85s-.012 3.584-.07 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.251-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.85s.012-3.584.07-4.85c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.07 4.85-.07zm0-2.163c-3.259 0-3.668.014-4.949.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.271-.073 1.649-.073 4.948 0 3.259.014 3.668.072 4.949.2 4.358 2.618 6.78 6.98 6.98 1.271.058 1.649.073 4.948.073s3.668-.014 4.949-.072c4.354-.2 6.782-2.618 6.979-6.98.059-1.271.073-1.649.073-4.948 0-3.259-.014-3.668-.072-4.949-.199-4.358-2.618-6.78-6.979-6.98-1.271-.059-1.649-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.44-.645 1.44-1.44s-.645-1.44-1.44-1.44z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default footer;