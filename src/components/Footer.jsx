import { motion } from 'framer-motion'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Left Section - Branding/Slogan */}
        <div className="footer-section footer-branding">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="footer-slogan">
              For safe and<br />
              responsible mining
            </h2>
          </motion.div>
        </div>

        {/* Middle-Left Section - Ulaanbaatar Office */}
        <div className="footer-section footer-office">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="footer-office-title">ULAANBAATAR</h3>
            <a href="mailto:info@boroogold.mn" className="footer-link">
              info@boroogold.mn
            </a>
            <a href="tel:+97611317798" className="footer-link">
              +976 11 317798
            </a>
            <p className="footer-address">
              Level 7, Blue Sky Office,<br />
              Sukhbaatar District, 1st Khoroo,<br />
              Peace Avenue 17, Ulaanbaatar – 14240, Mongolia
            </p>
            <a href="#" className="footer-map-link">
              SEE ON MAP ↗
            </a>
          </motion.div>
        </div>

        {/* Middle-Right Section - Mine Site */}
        <div className="footer-section footer-office">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="footer-office-title">Mine Site</h3>
            <a href="mailto:mine@boroogold.mn" className="footer-link">
              mine@boroogold.mn
            </a>
            <a href="tel:+3400" className="footer-link">
              +3400
            </a>
            <p className="footer-address">
              Selenge Province,<br />
              Mongolia
            </p>
            <a href="#" className="footer-map-link">
              SEE ON MAP ↗
            </a>
          </motion.div>
        </div>

        {/* Right Section - Newsletter & Social */}
        <div className="footer-section footer-newsletter">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p className="footer-cta">EVERYBODY WANTS TO BE A CAT?</p>
            <a href="#" className="footer-newsletter-link">
              SIGN UP FOR YOUR TICKET →
            </a>
            
            <div className="footer-social">
              <h4 className="footer-social-title">FOLLOW US</h4>
              <div className="footer-social-icons">
                <a href="https://www.facebook.com/boroogold/" className="footer-social-icon" aria-label="Facebook">
                  <span className="social-icon-text">Facebook</span>
                </a>
                
                <a href="https://www.instagram.com/lifeatboroogold/" className="footer-social-icon" aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="https://x.com/CGMongolia" className="footer-social-icon" aria-label="Twitter">
                  <span className="social-icon-text">X</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

