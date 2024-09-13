import { useState } from "react";
import { Paragraph, TitleH3 } from "../../texts/Titles/Titles";
import TabButton from "./tabButton";
import "./serviceSection.css";
import{serviceElemsContentEn, serviceElemsContentSr} from "./serviceElemData"

export default function Services({ language }){
    const [content, setContent] = useState("risk")

    const serviceElemsContent = language === "en" ? serviceElemsContentEn : serviceElemsContentSr;

    function handleClick(type){
        setContent(type)
    }
    return(
        <section className="services">
            <div className=" container service-container">
                <TitleH3>{language === "en" ? "What we do_" : "Šta radimo_"}</TitleH3>
                <Paragraph><span>&gt; </span>
                {language === "en"
                    ? "_We offer simple solutions to secure, optimize, and advance complex procurement operations, supply chains, production cycles, sales pipelines, and customer services for different industries."
                    : "_Za različite industrije nudimo jednostavna rešenja za obezbeđivanje, optimizaciju i unapređenje kompleksnih operacija nabavke, lanaca snabdevanja, proizvodnih ciklusa, prodajnih kanala i korisničkih usluga."}
                </Paragraph> 
                <Paragraph><span>&gt; </span>
                {language === "en"
                    ? "_Through customized development and integration of innovative IT and cloud software solutions, we help our customers reinvent their business processes and implement approaches to new levels of innovation and efficiency. This results in the reduction of operational costs and significantly improves the direct flawless management and control of business processes."
                    : "_Through customized development and integration of innovative IT and cloud software solutions, we help our customers reinvent their business processes and implement approaches to new levels of innovation and efficiency. This results in the reduction of operational costs and significantly improves the direct flawless management and control of business processes."}
                </Paragraph>
                <Paragraph><span>&gt; </span>
                {language === "en"
                    ? "_We offer not only off-the-shelf market products but also carefully tailored integrations with turnkey solutions for vital operational processes in businesses. And with our experience and adaptation of new AI technologies and Data Analysis tools, we extend our services and custom solutions to focus on sensitive business matters."
                    : "_Nudimo ne samo gotove proizvode na tržištu, već i pažljivo skrojene integracije sa rešenjima po principu „ključ u ruke“ za vitalne operativne procese u preduzećima. Ipak, sa našim iskustvom i prilagođavanjem novih tehnologija veštačke inteligencije i alata za analizu podataka, proširujemo naše usluge i personalizovana rešenja kako bismo se fokusirali na osetljiva poslovna pitanja."}
                     
                </Paragraph>
                <div className="tabs-buttons-div">
                <TabButton isActive={content === "risk" } onClick={() => handleClick("risk")}>{language === "en" ? "Security and Risk Assessment and Background Checks" : "Procena bezbednosti i rizika i background provera"}</TabButton>
                <TabButton isActive={content === "procurement" } onClick={() => handleClick("procurement")}>{language === "en" ? "Procurement and Sourcing Services" : "Usluge nabavke i snabdevanja"}</TabButton>
                <TabButton isActive={content === "optimization" } onClick={() => handleClick("optimization")}>{language === "en" ? "Production Optimization" : "Optimizacija proizvodnje"}</TabButton>
                <TabButton isActive={content === "CRM" } onClick={() => handleClick("CRM")}>{language === "en" ? "Sales pipeline and CRM" : "Prodaja i CRM"}</TabButton>
                </div>
                <div className="tabscontent">
                    <p>{serviceElemsContent[content]}</p>
                </div>
            </div>
        </section>
    )
}