import { useEffect, useState, useRef } from "react";
import { TitleH3, TitleH4 } from "../../texts/Titles/Titles";
import IntlTelInput from "intl-tel-input/reactWithUtils";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/styles";
import "./feedback.css";
import Dialog from "./dialog";

export default function Feedback() {
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
  const [feedbackKey, setFeedbackKey] = useState(Date.now()); // New state for rerender

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const validateForm = () => {
    const nameValid = name.length >= 2;
    const emailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
    const messageValid = message.length >= 10;

    setNameError(nameValid ? '' : 'Minimum two symbols');
    setEmailError(emailValid ? '' : 'Type in correct email');
    setMessageError(messageValid ? '' : 'Minimum ten symbols');

    return nameValid && emailValid && messageValid && isValid;
  };

  const handleName = (event) => {
    const value = event.target.value.trim();
    setName(value);
    if (isSubmitted) {
      setNameError(value.length < 2 ? 'Minimum two symbols' : '');
    }
  };

  const handleEmail = (event) => {
    const value = event.target.value.trim();
    setEmail(value);
    if (isSubmitted) {
      setEmailError(!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? 'Type in correct email' : '');
    }
  };

  const handleMessage = (event) => {
    const value = event.target.value.trim();
    setMessage(value);
    if (isSubmitted) {
      setMessageError(value.length < 10 ? 'Minimum ten symbols' : '');
    }
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    if (validateForm()) {
      try {
        const response = await fetch('https://github.com/Acerbar/rational/blob/main/server.js/api/send-email', {
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
          setFeedbackKey(Date.now()); // Force rerender
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
    <section className="feedback" key={feedbackKey}> {/* Trigger rerender when feedbackKey changes */}
      <div className="container">
        <TitleH3>Have questions?</TitleH3>
        <TitleH4>Write to us!</TitleH4>
        <form id="form" className="feedback-form" ref={form} onSubmit={sendEmail}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Type in your name"
            value={name}
            onChange={handleName}
            required
            style={{ border: nameError ? '1px solid red' : null }}
          />
          {nameError && <div style={{ color: 'red' }}>{nameError}</div>}
          
          <label htmlFor="phone">Phone</label>
          <IntlTelInput
            ref={phoneInputRef}
            name="phone"
            id="phone"
            value={number}
            onChangeNumber={setNumber} 
            onChangeValidity={setIsValid}
            initOptions={{ initialCountry: "us" }}
          />
          
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Type in your e-mail"
            value={email}
            onChange={handleEmail}
            required
            style={{ border: emailError ? '1px solid red' : null }}
          />
          {emailError && <div style={{ color: 'red' }}>{emailError}</div>}
          
          <label htmlFor="textarea">Your message</label>
          <textarea
            name="message"
            id="textarea"
            rows="10"
            placeholder="Type in your message"
            value={message}
            onChange={handleMessage}
            required
            style={{ border: messageError ? '1px solid red' : null }}
          />
          {messageError && <div style={{ color: 'red' }}>{messageError}</div>}
          
          <button className="feedback-button" type="submit">
            Submit
          </button>
          {status && <p>{status}</p>}
        </form>
      </div>
      <Dialog open={isModalOpen} onClose={closeModal} />
    </section>
  );
}