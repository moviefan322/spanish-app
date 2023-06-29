import React, { useState } from "react";
import Link from "next/link";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import styles from "./confirmModal.module.css";

function ConfirmModal({ open, setOpen, onOpenModal }: any) {
  const onCloseModal = () => setOpen(false);

  return (
    <div>
      <Modal open={open} onClose={onCloseModal} center>
        <h2>Whoa there, amigo!</h2>
        <br />
        <p>
          Españolified is a language learning application available for anybody
          to use, you are not required to create an account to use it. However,
          if you continue without creating an account, your progress will not be
          saved, and you will not be able to save flashcards. Que lastima!
        </p>
        <div className={styles.buttonDiv}>
          <Link href="/login" className={styles.link}>
            Register
          </Link>
          <Link href="/lessons/1-1" className={styles.link2}>
            No, Thanks
          </Link>
        </div>
      </Modal>
    </div>
  );
}

export default ConfirmModal;
