export const useConfirm = (message = "", onConfirm, onCancel) => {
    if(typeof onConfirm !== "function") {
        // return;
    }
    if(typeof onCancel !== "function") {
        // return;
    }

    const confirmAction = () => {
        if(window.confirm(message)) {
            onConfirm();
        } else {
            onCancel();
        }
    }
    return confirmAction;
}