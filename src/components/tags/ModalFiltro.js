import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import styles from './ModalFiltros.module.css';

const ModalFiltro = ({ isShowing, toggle, children }) => {
  useEffect(() => {
    const listener = function (e) {
      if (isShowing && (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27)) {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      }
    };

    window.addEventListener('keyup', listener);

    return () => {
      window.removeEventListener('keyup', listener);
    };
  }, [isShowing, toggle]);

  return isShowing
    ? ReactDom.createPortal(
        <div className={styles.modal_overlay}>
          <div className={styles.modal_wrapper}>
            <div className={styles.modal}>{children}</div>
          </div>
        </div>,
        document.body
      )
    : null;
};

const ModalHeader = ({ toggle, children }) => (
  <div className={styles.modal_header}>
    {children || 'Title'}
    <button className={styles.modal_button_close} aria-label="Close" onClick={toggle}>
      &times;
    </button>
  </div>
);

const ModalBody = ({ children }) => <div className={styles.modal_body}>{children}</div>;

const ModalFooter = ({ children }) => <div className={styles.modal_footer}>{children}</div>;

const useModal = () => {
  const [isShowing, setIsShowing] = React.useState(false);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return {
    isShowing,
    toggle,
  };
};

export { ModalFiltro as default, ModalHeader, ModalBody, ModalFooter, useModal };
