import { useRef, useEffect } from "react";
import { TitleH6 } from "../../texts/Titles/Titles";
import TabButton from "../services/tabButton";
import { createPortal } from "react-dom";
import styled from "styled-components";

const DialogWrapper = styled.dialog`
  width: min(600px, 90%);
  height: 30dvh;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 10;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  border: 3px solid var(--greenColor);

  &::backdrop {
    background-color: rgba(0, 0, 0, 0.7);
  }
`;

const DialogInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2em;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const ButtonHovered = styled(TabButton)`
  margin: 0 auto;
  width: 40%;
  &:hover {
    transform: scale(1.05);
  }

  @media(width <= 500px){
    margin: 0 15px;
    width: 100%;
  }
`;

const DialogTitle = styled(TitleH6)`
font-size: clamp(13px, 2.5vw, 18px);
`

const Dialog = ({ open, onClose }) => {
  const modal = useRef();

  useEffect(() => {
    if (open) {
      modal.current.showModal();
    } else {
      modal.current.close();
    }

    const handleClickOutside = (event) => {
      if (modal.current && !modal.current.contains(event.target)) {
        onClose();
      }
    };

    if (open) {
      window.addEventListener('click', handleClickOutside);
    }

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, [open, onClose]);

  return createPortal(
    <>
      <DialogWrapper ref={modal}>
        <DialogInner>
          <DialogTitle>
            Thank you for your correspondence, we will respond as soon as
            possible!
          </DialogTitle>
          <ButtonHovered onClick={onClose}>Close</ButtonHovered>
        </DialogInner>
      </DialogWrapper>
    </>,
    document.getElementById('modal')
  );
};

export default Dialog;
