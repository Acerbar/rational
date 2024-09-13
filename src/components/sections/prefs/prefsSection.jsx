import { TitleH3, Paragraph } from "../../texts/Titles/Titles";
import PrefElem from "./prefElem.jsx";
import { prefElemsContentEn, prefElemsContentSr } from "./prefElemData"; 
import "./prefsSection.css";

export default function Preferences({ language }) {

  const prefElemsContent = language === "en" ? prefElemsContentEn : prefElemsContentSr;

  return (
    <section className="preferences">
      <div className="prefs-container container">
        <TitleH3>{language === "en" ? "Why us_" : "Zašto mi_"}</TitleH3>
        <Paragraph>
          {language === "en"
            ? "_Even though implementing custom software solutions takes more time than off-the-shelf products, in the long run, you will always feel the effect of your business processes accelerating while saving costs."
            : "_Iako implementacija personalizovanih softverskih rešenja zahteva više vremena od gotovih (off-the-shelf) proizvoda, dugoročno gledano, konstantno ćete osećati efekat ubrzanja poslovnih procesa, uz uštedu troškova."}
        </Paragraph>
        <Paragraph>
          {language === "en"
            ? "_This plays well in all industries, from production to logistics, and other components of different businesses."
            : "_Ovo dobro funkcioniše u svim industrijama, od proizvodnje do logistike i drugih komponenti različitih poslova."}
        </Paragraph>
        <Paragraph>
          {language === "en"
            ? "_Our experienced specialists guarantee that our customized services will be introduced in the minimum time and have maximum efficiency. Our properly deployed and integrated into business operations cloud-based solutions (SaaS, IaaS, PaaS) unveil unique opportunities of limitless automatization and control potential while smoothing workflows and bringing clients many other advantages and benefits:"
            : "_Naši iskusni stručnjaci garantuju da će naše personalizovane usluge (customized services) biti implementirane za minimalno vreme i uz maksimalnu efikasnost. Naša cloud rešenja (SaaS, IaaS, PaaS), pravilno raspoređena i integrisana u poslovne operacije, otkrivaju jedinstvene mogućnosti neograničenog potencijala automatizacije i kontrole, dok istovremeno ravnaju tok rada i donose klijentima mnoge druge prednosti i benefite:"}
        </Paragraph>
        <div className="pref-elements">
          {prefElemsContent.map((prefElem) => (
            <PrefElem key={prefElem.id} image={prefElem.image} title={prefElem.title} />
          ))}
        </div>
      </div>
    </section>
  );
}