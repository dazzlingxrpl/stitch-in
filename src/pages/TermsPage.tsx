import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl mr-auto text-left">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          <Link
            to={{ pathname: '/', hash: '#contact' }}
            className="text-midnight dark:text-white underline hover:no-underline"
          >
            ← Back to Contact
          </Link>
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-midnight dark:text-white mb-2">
          Terms & Conditions, Privacy & Marketing Consent
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">Last updated: March 2026</p>

        <div className="space-y-8 text-gray-700 dark:text-gray-300 text-base leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-midnight dark:text-white mb-3">1. Introduction</h2>
            <p>
              Stitch In Architecture (“we”, “us”, “our”) respects your privacy and is committed to protecting your personal
              data. This page explains how we collect, use, store, and protect information you provide when you contact us
              or use our website, and the terms on which you agree to receive communications from us.
            </p>
            <p className="mt-3">
              By submitting a contact form, enquiry, or similar communication, you confirm that you have read and
              understood this notice and, where applicable, agree to the marketing and communications terms in section 4.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-midnight dark:text-white mb-3">2. Information we collect</h2>
            <p>We may collect and process the following categories of personal data when you interact with us:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Identity and contact details: name, email address, telephone number, and any details you include in your message.</li>
              <li>Project-related information: project type, location, and other details you choose to share to help us respond to your enquiry.</li>
              <li>Technical data: limited information about your visit to our website (such as browser type and general location) where collected through standard web technologies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-midnight dark:text-white mb-3">3. How we use your information</h2>
            <p>We use your personal data to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Respond to your enquiries and provide information about our services.</li>
              <li>Manage our relationship with you and improve our website and services.</li>
              <li>Comply with legal obligations and protect our legitimate business interests, where applicable.</li>
            </ul>
            <p className="mt-3">
              We process personal data on the basis of your consent (where you have given it), our legitimate interests in
              operating our business and responding to enquiries, and where necessary to perform a contract or comply with law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-midnight dark:text-white mb-3">4. Marketing, updates, and promotional communications</h2>
            <p>
              Where you have ticked the consent box on our contact or enquiry forms, you agree that we may use your contact
              details to send you occasional communications about Stitch In Architecture, including:
            </p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Promotional material relating to our services, projects, and events.</li>
              <li>Newsletters, company updates, and announcements.</li>
              <li>Industry trends, insights, and related content we believe may be relevant to you.</li>
            </ul>
            <p className="mt-3">
              This consent is voluntary and separate from our ability to respond to your specific enquiry. You may withdraw
              consent or unsubscribe from marketing communications at any time (see section 7).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-midnight dark:text-white mb-3">5. Sharing and disclosure of personal data</h2>
            <p className="font-medium text-midnight dark:text-white">
              We do not sell your personal data. We do not give away or trade your personal information to third parties for
              their own marketing purposes.
            </p>
            <p className="mt-3">
              We may share data only with trusted service providers who assist us in operating our website, hosting, email
              delivery, or professional services, strictly under confidentiality and data-processing terms. We may also
              disclose information if required by law, regulation, court order, or to protect our rights, property, or
              safety.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-midnight dark:text-white mb-3">6. Data retention and security</h2>
            <p>
              We retain personal data only for as long as necessary to fulfil the purposes described in this notice, including
              legal, accounting, or reporting requirements. We implement appropriate technical and organisational measures to
              protect your data against unauthorised access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-midnight dark:text-white mb-3">7. Your rights and unsubscribing</h2>
            <p>Depending on applicable law, you may have the right to:</p>
            <ul className="list-disc pl-6 mt-3 space-y-2">
              <li>Access, correct, or update your personal data.</li>
              <li>Request deletion or restriction of processing in certain circumstances.</li>
              <li>Object to processing based on legitimate interests, where applicable.</li>
              <li>Withdraw consent at any time, without affecting the lawfulness of processing based on consent before withdrawal.</li>
            </ul>
            <p className="mt-3">
              <strong className="text-midnight dark:text-white">Unsubscribe:</strong> You may opt out of marketing emails and
              updates at any time by using the unsubscribe link in our emails (where provided) or by contacting us directly at{' '}
              <a href="mailto:juliet@stitch-in-architecture.com" className="underline text-midnight dark:text-white">
                juliet@stitch-in-architecture.com
              </a>
              . We will process your request without undue delay.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-midnight dark:text-white mb-3">8. International transfers</h2>
            <p>
              If we transfer personal data outside your country of residence, we will ensure appropriate safeguards are in
              place in line with applicable data protection requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-midnight dark:text-white mb-3">9. Changes to this notice</h2>
            <p>
              We may update this page from time to time. The “Last updated” date at the top will change when we do. Continued
              use of our website or forms after changes constitutes acceptance of the revised terms, where permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-midnight dark:text-white mb-3">10. Contact</h2>
            <p>
              For any questions about this policy, your personal data, or to exercise your rights, please contact us at{' '}
              <a href="mailto:juliet@stitch-in-architecture.com" className="underline text-midnight dark:text-white">
                juliet@stitch-in-architecture.com
              </a>
              .
            </p>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              This document is provided for transparency and does not constitute legal advice. If you require a formal legal
              instrument for your jurisdiction, you should consult a qualified professional.
            </p>
          </section>
        </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsPage;
