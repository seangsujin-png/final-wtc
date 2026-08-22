import './About.css';
import founderImg from '../Images/Founder.png';
import barista1Img from '../Images/barista1.png';
import barista2Img from '../Images/barista2.png';

function About() {
  return (
    <div className="about">
      <h2>About Jinny Coffee</h2>
      <p>We are passionate about serving the highest quality coffee and creating a wonderful space for everyone.</p>
      
      <img 
        src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=800&q=80" 
        alt="Coffee shop interior" 
        className="about-image" 
      />

      <div className="team">
        <div className="team-member">
          <img src={founderImg} alt="Founder & CEO" />
          <h4>Founder & CEO</h4>
          <p>Building more than a brand — building a legacy.</p>
          <a href="https://t.me/Su_Jin_N168" target="_blank" rel="noopener noreferrer" className="telegram-link">
            Telegram: @Su_Jin_N168
          </a>
        </div>
        
        <div className="team-member">
          <img src={barista1Img} alt="Barista" />
          <h4>Barista</h4>
          <p>Good days start with coffee.</p>
          <a href="https://t.me/sinna2312" target="_blank" rel="noopener noreferrer" className="telegram-link">
            Telegram: @sinna2312
          </a>
        </div>
        
        <div className="team-member">
          <img src={barista2Img} alt="Barista" />
          <h4>Barista</h4>
          <p>Be kind. Work hard. Make coffee.</p>
          <a href="https://t.me/L_Y_H_OUR" target="_blank" rel="noopener noreferrer" className="telegram-link">
            Telegram: @L_Y_H_OUR
          </a>
        </div>
      </div>
    </div>
  );
}

export default About;