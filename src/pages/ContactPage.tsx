import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const ContactPage = () => {
  return (
    <div className="min-h-screen pt-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-4xl font-bold text-midnight dark:text-white mb-4">Get in Touch</h1>
            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>Have a project in mind? We'd love to hear from you.</p>
              <div>
                <h3 className="font-medium">Address</h3>
                <p>123 Architecture Street, Design District, City, Country</p>
              </div>
              <div>
                <h3 className="font-medium">Email</h3>
                <p>info@stitchin.com</p>
              </div>
              <div>
                <h3 className="font-medium">Phone</h3>
                <p>+1 234 567 890</p>
              </div>
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-midnight dark:text-white mb-8">Contact Us</h1>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full rounded-xl bg-white dark:bg-gray-800 border-0 ring-1 ring-inset ring-gray-200 dark:ring-gray-700 shadow-sm focus:ring-2 focus:ring-midnight dark:focus:ring-white text-midnight dark:text-white sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-xl bg-white dark:bg-gray-800 border-0 ring-1 ring-inset ring-gray-200 dark:ring-gray-700 shadow-sm focus:ring-2 focus:ring-midnight dark:focus:ring-white text-midnight dark:text-white sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="mt-1 block w-full rounded-xl bg-white dark:bg-gray-800 border-0 ring-1 ring-inset ring-gray-200 dark:ring-gray-700 shadow-sm focus:ring-2 focus:ring-midnight dark:focus:ring-white text-midnight dark:text-white sm:text-sm"
                ></textarea>
              </div>
              <div className="flex items-start gap-3">
                <input
                  id="contact-terms"
                  name="terms_consent"
                  type="checkbox"
                  value="accepted"
                  required
                  className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 text-midnight focus:ring-midnight dark:border-gray-600 dark:bg-gray-800 dark:focus:ring-white"
                />
                <label htmlFor="contact-terms" className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  I have read and agree to the{' '}
                  <Link to="/terms" className="font-medium text-midnight dark:text-white underline hover:no-underline">
                    Terms & Conditions
                  </Link>
                  . I consent to Stitch In Architecture using my details to respond to this enquiry and, where applicable, to
                  send me promotional material, updates, and industry-related content. I understand my personal data will
                  not be sold or shared with third parties for their marketing, and that I may unsubscribe at any time.
                </label>
              </div>
              <button
                type="submit"
                className="inline-flex items-center px-6 py-2.5 border border-transparent text-base font-medium rounded-2xl text-white bg-midnight hover:bg-zinc-800 dark:bg-white dark:text-midnight dark:hover:bg-gray-100 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
