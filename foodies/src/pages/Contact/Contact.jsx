import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <section className="py-5" style={{ backgroundColor: '#000000', minHeight: '100vh', paddingTop: '100px !important' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="text-center mb-5">
              <h2 className="fw-bold" style={{ color: '#fff', fontSize: '2.5rem' }}>
                Get in <span style={{ color: '#f5a623' }}>Touch</span>
              </h2>
              <p style={{ color: '#8b8b8b' }}>We'd love to hear from you. Send us a message!</p>
            </div>
            <div 
              className="contact-form p-5" 
              style={{ 
                backgroundColor: '#111111', 
                borderRadius: '20px',
                border: '1px solid #2a2a2a'
              }}
            >
              <form>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label" style={{ color: '#8b8b8b', fontSize: '0.9rem' }}>First Name</label>
                    <input
                      type="text"
                      className="form-control custom-input"
                      placeholder="John"
                      style={{ backgroundColor: '#1a1a1a', border: '2px solid #2a2a2a', color: '#fff' }}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label" style={{ color: '#8b8b8b', fontSize: '0.9rem' }}>Last Name</label>
                    <input
                      type="text"
                      className="form-control custom-input"
                      placeholder="Doe"
                      style={{ backgroundColor: '#1a1a1a', border: '2px solid #2a2a2a', color: '#fff' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label" style={{ color: '#8b8b8b', fontSize: '0.9rem' }}>Email Address</label>
                    <input
                      type="email"
                      className="form-control custom-input"
                      placeholder="john@example.com"
                      style={{ backgroundColor: '#1a1a1a', border: '2px solid #2a2a2a', color: '#fff' }}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label" style={{ color: '#8b8b8b', fontSize: '0.9rem' }}>Your Message</label>
                    <textarea
                      className="form-control custom-input"
                      rows="5"
                      placeholder="Tell us what's on your mind..."
                      style={{ backgroundColor: '#1a1a1a', border: '2px solid #2a2a2a', color: '#fff' }}
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button 
                      className="btn w-100" 
                      type="submit"
                      style={{
                        backgroundColor: '#f5a623',
                        color: '#000',
                        borderRadius: '30px',
                        padding: '14px',
                        fontWeight: '600',
                        fontSize: '1rem',
                        border: 'none'
                      }}
                    >
                      <i className="bi bi-send me-2"></i>
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;