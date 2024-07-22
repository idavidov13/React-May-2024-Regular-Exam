export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-image">
          <img
            src="https://assets.coingecko.com/coins/images/32578/standard/IMG_6957.jpeg?1698558686"
            alt="TradeVault Logo"
          />
        </div>
        <div className="footer-section">
          <h2>About</h2>
          <p>
            <strong>TradeVault</strong> is a comprehensive platform for tracking
            your trades. Our goal is to provide traders with the tools they need
            to succeed.
          </p>
        </div>
        <div className="footer-section">
          <h2>Mission</h2>
          <p>
            Our mission is to empower traders by providing a reliable and
            user-friendly platform that tracks their trading and helps them
            achieve their financial goals.
          </p>
        </div>
        <div className="footer-section">
          <h2>Contact Us</h2>
          <p>
            Email:{" "}
            <a href="mailto:support@tradevault.com">support@tradevault.com</a>
          </p>
          <p>Phone: +123-456-7890</p>
          <p>Address: 123 Trade Street, Trading City, TR 45678</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          The Web Application is created by <strong>Ivan Davidov</strong>, as an
          exam project for SoftUni course ReactJS-May 2024.
        </p>
      </div>
    </footer>
  );
}
