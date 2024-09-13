import logo from "/logo.jpg"
import serbianFlag from "/SerbiaFlag.svg"
import britishFlag from "/british-flag.svg"
import './header.css'
import MobileNav from "../mobileNav/mobileNav"
import { useState, useEffect } from "react"


export default function Header({ language, setLanguage }){
    const [isFixed, setIsFixed] = useState(false);
        useEffect(() => {
            const handleScroll = () => {
              if (window.scrollY > 50) {
                setIsFixed(true);
              } else {
                setIsFixed(false);
              }
            };
        
            window.addEventListener('scroll', handleScroll);
            
            return () => {
              window.removeEventListener('scroll', handleScroll);
            };
          }, []);

        const scrollToSection = (selector) => {
            const section = document.querySelector(selector);
            if (section) {
              section.scrollIntoView({ behavior: 'smooth' });
            }
          };

          const navTexts = {
            en: {
                whyUs: 'Why Us',
                whatWeDo: 'What We Do',
                writeToUs: 'Write to Us'
            },
            sr: {
                whyUs: 'Zašto Mi',
                whatWeDo: 'Šta Radimo',
                writeToUs: 'Pišite Nam'
            }
        };
          const currentNavTexts = navTexts[language] || navTexts.en;
          const handleLanguageChange = () => {
            setLanguage(prevLang => (prevLang === 'en' ? 'sr' : 'en'));
        };
    return (
        <>
        <header className={isFixed ? "header_fixed" : ""}>
            <div className={ isFixed ? "header-inner container" : "header-inner header-inner_no-logo container"}>
              <div className="header-inner-left">
                  <div className={isFixed ? "header__logo" : "header__logo_hidden"}>
                    <a className="header-nav__link" onClick={() => scrollToSection('.intro')}>
                      <img src={logo} alt="logo" />
                    </a>
                  </div>
                  <a className="lang-change" onClick={handleLanguageChange}>
                  <img src={language === 'en' ? serbianFlag : britishFlag} alt="Flag" />
                    <p className="lang-link">{language === 'en' ? 'Srpska' : 'English'}</p>
                  </a>
              </div>
                <div className="header-inner__content">
                    <nav className="header-nav">
                      <a className="header-nav__link" id="nav-link-one" onClick={() => scrollToSection('.preferences')}>{currentNavTexts.whyUs}<span className="nav-span"></span>
                      </a>
                      <a className="header-nav__link" id="nav-link-two" onClick={() => scrollToSection('.services')}>{currentNavTexts.whatWeDo}<span className="nav-span"></span>
                      </a>
                      <a className="header-nav__link" id="nav-link-three" onClick={() => scrollToSection('.feedback')}>{currentNavTexts.writeToUs}<span className="nav-span"></span>
                      </a>
                    </nav>
                </div>
            </div>
            <MobileNav language={language} setLanguage={setLanguage}/>
        </header>
        </>
    )
    
}