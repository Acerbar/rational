import logo from "/logo.jpg"
import {TitleH2, TitleH5} from "../../texts/Titles/Titles"
import "./mainSection.css"
import { useState } from "react";

export default function MainSection ({language}){

    const contentTexts = {
        en: {
            title: "Digital Key to Efficiency",
            leftText: <>We believe that every business is <span className="green-text">unique</span> and has its <span className="green-text">specific needs</span></>,
            rightText: <>That's why our company specializes in developing <span className="green-text">custom IT solutions</span> that respond precisely to <span className="green-text">your organization's demands</span></>
        },
        sr: {
            title: "Digitalni Ključ za Efikasnost",
            leftText: <>Verujemo da je svaki biznis <span className="green-text">jedinstven</span> i da ima svoje <span className="green-text">specifične potrebe</span></>,
            rightText: <>Zato je naša kompanija specijalizovana za razvoj  <span className="green-text">personalizovanih IT rešenja</span> koja precizno odgovaraju  <span className="green-text">zahtevima vaše organizacije</span></>
        }
    };
    const currentContent = contentTexts[language] || contentTexts.en;

    return (
        <section className="intro" >
            <div className="container intro-container">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className="title">
                <TitleH2>{currentContent.title}</TitleH2>
                </div>
                <div className="main-content">
                    <TitleH5 gridClass="left">{currentContent.leftText}<span className="line-span"></span></TitleH5>
                    <TitleH5 gridClass="right">{currentContent.rightText}<span className="line-span"></span></TitleH5>
                </div>
            </div>
        </section>
    );
}

