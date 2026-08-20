import './About.css';

function About() {
  return (
    <div className="about">
      <h2>About Us</h2>
      <p>We are a team of passionate developers creating amazing web experiences.</p>
      <div className="team">
        <div className="team-member">👨‍💻 Developer 1</div>
        <div className="team-member">👩‍💻 Developer 2</div>
        <div className="team-member">🧑‍💻 Developer 3</div>
      </div>
    </div>
  );
}

export default About;