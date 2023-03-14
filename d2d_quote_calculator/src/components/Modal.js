

function Modal(props) {
    if (props.show) {
        return (
            <div>
                <h1>Modal</h1>
            </div>
          );
    } else {
        return null;
    }

}

export default Modal;
