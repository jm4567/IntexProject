// Import the stylesheet for this page
import '../css/Privacy.css';

// Import the navigation bar component
import NavBar from '../components/NavBar'; // ✅ adjust path as needed

// PrivacyPolicy page component
const PrivacyPolicy = () => {
  return (
    <>
      {/* NavBar component with dummy props for genre selection */}
      <NavBar selectedGenres={[]} setSelectedGenres={() => {}} />{' '}
      <div className="privacy-wrapper">
        {/* Header section with main title and contact link */}
        <div className="privacy-header">
          <h1>Privacy Policy</h1>
          <p>
            To learn more about privacy at CineNiche, please contact us at{' '}
            <a href="mailto:contact@cineniche.com">contact@cineniche.com</a>.
          </p>
        </div>

        {/* Main content split into a sidebar and content area */}
        <div className="privacy-content-container">
          {/* Sidebar: Table of Contents for internal anchor navigation */}
          <div className="privacy-sidebar">
            <h4>Table of Contents</h4>
            <ul className="toc-list">
              {/* List of in-page navigation links */}
              <li>
                <a href="#data-we-collect">What data do we collect?</a>
              </li>
              <li>
                <a href="#how-we-collect">How do we collect your data?</a>
              </li>
              <li>
                <a href="#how-we-use">How will we use your data?</a>
              </li>
              <li>
                <a href="#data-storage">How do we store your data?</a>
              </li>
              <li>
                <a href="#marketing">Marketing</a>
              </li>
              <li>
                <a href="#rights">Your data protection rights</a>
              </li>
              <li>
                <a href="#cookies">What are cookies?</a>
              </li>
              <li>
                <a href="#cookie-use">How do we use cookies?</a>
              </li>
              <li>
                <a href="#cookie-types">Types of cookies</a>
              </li>
              <li>
                <a href="#manage-cookies">How to manage cookies</a>
              </li>
              <li>
                <a href="#other-policies">Other privacy policies</a>
              </li>
              <li>
                <a href="#changes">Changes</a>
              </li>
              <li>
                <a href="#contact">Contact us</a>
              </li>
              <li>
                <a href="#authority">Contact authorities</a>
              </li>
            </ul>
          </div>

          {/* Main body of the privacy policy text */}
          <div className="privacy-main-content">
            {/* Each section corresponds to an anchor target */}
            <h2 id="data-we-collect">What data do we collect?</h2>
            <ul>
              <li>
                Personal identification information (Name, email, phone, etc.)
              </li>
            </ul>

            <h2 id="how-we-collect">How do we collect your data?</h2>
            <ul>
              <li>Registering or using our services</li>
              <li>Using our website via cookies</li>
            </ul>

            <h2 id="how-we-use">How will we use your data?</h2>
            <ul>
              <li>Manage your account and activity</li>
              <li>Send updates and offers</li>
              <li>Recommend movies or shows</li>
            </ul>

            <h2 id="data-storage">How do we store your data?</h2>
            <p>CineNiche securely stores your data in Provo, UT.</p>
            <p>Watch history is stored for 2 years before deletion.</p>

            <h2 id="marketing">Marketing</h2>
            <p>We may send you offers unless you opt out at any time.</p>

            <h2 id="rights">Your data protection rights</h2>
            <ul>
              <li>
                <strong>Access</strong> your personal data
              </li>
              <li>
                <strong>Rectify</strong> incorrect data
              </li>
              <li>
                <strong>Erase</strong> your data (in some cases)
              </li>
              <li>
                <strong>Restrict</strong> or <strong>object</strong> to
                processing
              </li>
              <li>
                <strong>Portability</strong> – receive data or send to another
                org
              </li>
            </ul>

            <h2 id="cookies">What are cookies?</h2>
            <p>
              Cookies are small text files that collect visitor behavior info.
            </p>

            <h2 id="cookie-use">How do we use cookies?</h2>
            <ul>
              <li>To keep you signed in</li>
              <li>Understand how you use our site</li>
            </ul>

            <h2 id="cookie-types">Types of cookies we use</h2>
            <ul>
              <li>
                <strong>Functionality</strong> – to remember your preferences
              </li>
            </ul>

            <h2 id="manage-cookies">How to manage cookies</h2>
            <p>You can set your browser not to accept cookies.</p>

            <h2 id="other-policies">Other websites' privacy policies</h2>
            <p>Our policy applies only to our site, not linked sites.</p>

            <h2 id="changes">Changes to this policy</h2>
            <p>Last updated: April 7, 2025. We review regularly.</p>

            <h2 id="contact">How to contact us</h2>
            <p>Email: contact@cineniche.com</p>
            <p>Phone: 801-555-5555</p>

            <h2 id="authority">How to contact the appropriate authority</h2>
            <p>
              If unsatisfied, contact the Information Commissioner’s Office.
            </p>
            <p>Email: support@cineniche.com</p>

            {/* Back to top link */}
            <p className="mt-4">
              <a href="#top">Back to top</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
