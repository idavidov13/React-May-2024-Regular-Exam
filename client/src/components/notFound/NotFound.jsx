export default function NotFound() {
  return (
    <div className="not-found-container">
      <h1>404</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <a href="/" className="back-home-link">
        Go Back to Home
      </a>
    </div>
  );
}
