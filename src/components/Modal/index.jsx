import styles from "./Modal.module.css";
// import { IoClose } from "react-icons/io5";
const Modal = ({
  modalOpen,
  setModalOpen,
  modalTitle,
  modalBody,
  handleSave,
}) => {
  return (
    <div className={styles.modal}>
      <div className={styles["modal-content"]}>
        <div className={styles["modal-header"]}>
          <div className={styles["modal-title"]}>{modalTitle}</div>
          {/* <IoClose
            className={styles.close}
            onClick={() => {
              setModalOpen(!modalOpen);
            }}
          /> */}
        </div>
        <div className={styles["modal-body"]}>{modalBody}</div>
        <div className={styles["modal-footer"]}>
          <div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
          <div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => {
                setModalOpen(!modalOpen);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
