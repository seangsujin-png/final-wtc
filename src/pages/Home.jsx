import { Link } from 'react-router-dom';
import './Home.css';
import latteImg from '../Images/latte.jpg';
import mochaImg from '../Images/mocha.jpg';
import matchaImg from '../Images/matcha.jpg';

const popularPicks = [
  { name: 'Iced Latte', price: '2.80', img: latteImg },
  { name: 'Iced Mocha', price: '3.20', img: mochaImg },
  { name: 'Matcha Latte', price: '3.50', img: matchaImg },
];

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Welcome to Jinny Coffee</h1>
        <p>Enjoy the best fresh coffee and relaxing atmosphere</p>
        
        <img 
          src={latteImg}
          alt="Iced latte" 
          className="hero-image" 
        />
        
        <Link to="/services" className="cta-btn">Explore Menu</Link>
      </section>

      <section className="popular-picks">
        <h2>Popular Picks</h2>
        <div className="picks-grid">
          {popularPicks.map((item) => (
            <div className="pick-card" key={item.name}>
              <img src={item.img} alt={item.name} />
              <h3>{item.name}</h3>
              <span className="pick-price">${item.price}</span>
            </div>
          ))}
        </div>
      </section>
      
      <section className="features">
        <div className="feature-card">
          <h3>☕ Fresh Coffee</h3>
          <p>Made from premium coffee beans every single day</p>
        </div>
        <div className="feature-card">
          <h3>🌿 Cozy Vibe</h3>
          <p>Perfect place for studying, working, and chilling</p>
        </div>
        <div className="feature-card">
          <h3>⚡ Fast Service</h3>
          <p>Quick preparation with friendly staff members</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
