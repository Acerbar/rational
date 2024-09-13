import { useEffect, useState, useRef } from "react";
import { TitleH3, TitleH4 } from "../../texts/Titles/Titles";
import IntlTelInput from "intl-tel-input/reactWithUtils";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/styles";
import "./feedback.css";
import Dialog from "./dialog";

export default function Feedback({ language }) {
  const form = useRef();
  const phoneInputRef = useRef();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [number, setNumber] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [feedbackKey, setFeedbackKey] = useState(Date.now()); 

  const feedbackTexts = {
    en: {
        questions: 'Have questions?',
        writeToUs: 'Write to us!',
        name: 'Name',
        phone: 'Phone',
        email: 'E-mail',
        message: 'Your message',
        submit: 'Submit',
        minTwoSymbols: 'Minimum two symbols',
        correctEmail: 'Type in correct email',
        minTenSymbols: 'Minimum ten symbols',
        typeName: 'Type in your name',
        typeMail: 'Type in your e-mail',
        typeText: 'Type in your message',
    },
    sr: {
        questions: 'Imate pitanja?',
        writeToUs: 'Pišite nam!',
        name: 'Ime',
        phone: 'Telefon',
        email: 'E-mail',
        message: 'Vaša poruka',
        submit: 'Pošaljite',
        minTwoSymbols: 'Minimalno dva simbola',
        correctEmail: 'Unesite ispravan e-mail',
        minTenSymbols: 'Minimalno deset simbola',
        typeName: 'Unesite svoje ime',
        typeMail: 'Unesite svoj e-mail',
        typeText: 'Unesite svoju poruku',
    }
};
 const currentTexts = feedbackTexts[language] || feedbackTexts.en;
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const validateForm = () => {
    const nameValid = name.length >= 2;
    const emailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const messageValid = message.length >= 10;

    setNameError(nameValid ? '' : currentTexts.minTwoSymbols);
        setEmailError(emailValid ? '' : currentTexts.correctEmail);
        setMessageError(messageValid ? '' : currentTexts.minTenSymbols);

    return nameValid && emailValid && messageValid && isValid;
  };

  const handleName = (event) => {
    const value = event.target.value.trim();
    setName(value);
    if (isSubmitted) {
      setNameError(value.length < 2 ? currentTexts.minTwoSymbols : '');
    }
  };

  const handleEmail = (event) => {
    const value = event.target.value.trim();
    setEmail(value);
    if (isSubmitted) {
      setEmailError(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? currentTexts.correctEmail : '');
    }
  };

  const handleMessage = (event) => {
    const value = event.target.value.trim();
    setMessage(value);
    if (isSubmitted) {
      setMessageError(value.length < 10 ? currentTexts.minTenSymbols : '');
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/send-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message, phone: number }),
        });

        const data = await response.json();
        if (data.success) {
          setName('');
          setEmail('');
          setMessage('');
          setNumber('');
          setIsSubmitted(false);
          setStatus('');
          setFeedbackKey(Date.now()); 
          openModal(); 
        } else {
          setStatus('Failed to send email');
        }
      } catch (error) {
        console.error('Error sending email:', error);
        setStatus('Error sending email');
      }
    }
  };

  return (
    <section className="feedback" key={feedbackKey}> 
      <div className="container">
        <TitleH3>{currentTexts.questions}</TitleH3>
        <TitleH4>{currentTexts.writeToUs}</TitleH4>
        <form id="form" className="feedback-form" ref={form} onSubmit={sendEmail}>
          <label htmlFor="name">{currentTexts.name}</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder={currentTexts.typeName}
            value={name}
            onChange={handleName}
            required
            style={{ border: nameError ? '1px solid red' : null }}
          />
          {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
          
          <label htmlFor="phone">{currentTexts.phone}</label>
          <IntlTelInput
            ref={phoneInputRef}
            name="phone"
            id="phone"
            value={number}
            onChangeNumber={setNumber} 
            onChangeValidity={setIsValid}
            initOptions={{ initialCountry: "us" }}
          />
          
          <label htmlFor="email">{currentTexts.email}</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder={currentTexts.typeMail}
            value={email}
            onChange={handleEmail}
            required
            style={{ border: emailError ? '1px solid red' : null }}
          />
          {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
          
          <label htmlFor="textarea">{currentTexts.message}</label>
          <textarea
            name="message"
            id="textarea"
            rows="10"
            placeholder={currentTexts.typeText}
            value={message}
            onChange={handleMessage}
            required
            style={{ border: messageError ? '1px solid red' : null }}
          />
          {messageError && <div style={{ color: 'red' }}>{messageError}</div>}
          
          <button className="feedback-button" type="submit">
          {currentTexts.submit}
          </button>
          {status && <p>{status}</p>}
        </form>
      </div>
      <Dialog open={isModalOpen} onClose={closeModal} />
    </section>
  );
}
