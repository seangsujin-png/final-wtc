import './Services.css';

function Services() {
  const services = [
    { title: 'Web Development', desc: 'Building modern web applications' },
    { title: 'Mobile Apps', desc: 'Cross-platform mobile solutions' },
    { title: 'UI/UX Design', desc: 'Beautiful and intuitive interfaces' },
  ];

  return (
    <div className="services">
      <h2>Our Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;