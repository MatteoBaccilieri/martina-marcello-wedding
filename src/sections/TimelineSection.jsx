import React , {useState, useEffect} from 'react';
import { Heart, CarFront, Utensils, Music, CakeSlice } from 'lucide-react';
import '../App.css';
import '../styles/TimelineSection.css'

const TimelineSection = () => {
  const [isVisible, setIsVisible] = useState({});
  
  useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      }, { threshold: 0.1 });
  
      document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
      
      return () => observer.disconnect();
    }, []);

    return (
    <section className="section section-light">
      <div className="card">
        <h2 className="section-title">Programma della Giornata</h2>
          <div className="timeline">
            {[
              { time: '17:00', title: 'Arrivo degli invitati', icon: CarFront },
              { time: '17:30', title: 'Cerimonia', icon: Heart },
              { time: '18:00', title: 'Aperitivo e Cena', icon: Utensils },
              { time: '22:30', title: 'Taglio della Torta', icon: CakeSlice },
              { time: '23:00', title: 'DJ set e Open Bar', icon: Music }
            ].map((item, idx) => (
              <div 
                key={idx} 
                id={`timeline-${idx}`}
                className={`timeline-row animate-on-scroll ${isVisible[`timeline-${idx}`] ? 'visible' : ''}`}
              >
                <div className={`timeline-side ${idx % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  {idx % 2 === 0 && (
                    <>
                      <h4 className="timeline-title">{item.title}</h4>
                      {item.desc && <p className="timeline-desc">{item.desc}</p>}
                    </>
                  )}
                </div>
                
                <div className="timeline-center">
                  <div className="timeline-node">
                    <item.icon className="timeline-icon" />
                  </div>
                  <span className="timeline-time">{item.time}</span>
                </div>
                
                <div className={`timeline-side ${idx % 2 === 0 ? 'text-left' : 'text-right'}`}>
                  {idx % 2 !== 0 && (
                    <>
                      <h4 className="timeline-title">{item.title}</h4>
                      {item.desc && <p className="timeline-desc">{item.desc}</p>}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      );
};

export default TimelineSection