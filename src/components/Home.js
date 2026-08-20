import './Home.css';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to My Website</h1>
        <p>Building amazing React applications</p>
        <button className="cta-btn">Get Started</button>
      </section>
      <section className="features">
        <div className="feature-card">
          <h3>🚀 Fast</h3>
          <p>Lightning fast performance with React</p>
        </div>
        <div className="feature-card">
          <h3>📱 Responsive</h3>
          <p>Works on all devices</p>
        </div>
        <div className="feature-card">
          <h3>🔒 Secure</h3>
          <p>Built with best practices</p>
        </div>
      </section>
    </div>
  );
}

export default Home;