import "./mobileNav.css"
import gear from "/gear.svg"


export default function MobileNav({ language, setLanguage }) {
    // Define navigation link texts for both languages
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

    const scrollToSection = (selector) => {
        const section = document.querySelector(selector);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="mobNav">
            <div className="mobNav-inner">
                <a className="mobNav-link" onClick={() => scrollToSection('.preferences')}>
                    {currentNavTexts.whyUs}
                </a>
                <a className="mobNav-link" onClick={() => scrollToSection('.services')}>
                    {currentNavTexts.whatWeDo}
                </a>
                <a className="mobNav-link" onClick={() => scrollToSection('.feedback')}>
                    {currentNavTexts.writeToUs}
                </a>
            </div>
            <div className="mobNav-gear">
                <img src={gear} alt="Gear" />
            </div>
        </nav>
    );
}