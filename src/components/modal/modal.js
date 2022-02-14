import './modal.css';

const Modal = () => {
  return (
    <>
      <div className={styles.overlay} onClick={() => setOpen(false)} />
      <div className={styles.modal}>
        <input
          className={styles.input}
          placeholder={props.placeholder}
          type={props.type || "text"}
          value={props.state}
          onChange={(event) => {
            props.setState(event.target.value);
          }}
        />
        <button
          className={styles.button}
          style={props.bgcolor && { backgroundColor: props.bgcolor }}
          onClick={props.callback}
        >
          {props.children || "Submit"}
        </button>
        <button
          className={styles.button}
          style={props.bgcolor && { backgroundColor: props.bgcolor }}
          onClick={props.callback}
        >
          {props.children || "Submit"}
        </button>
      </div>
    </>
  )
}

export default Modal;