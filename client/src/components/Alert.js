import { useAppContext } from '../context/appContext';

const Alert = () => {
  const { alertType, alertText, clearAlert } = useAppContext();
  return (
    <div className={`alert alert-${alertType}`}>
      <button id='close' className={`alert-${alertType}`} onClick={clearAlert}>
        X
      </button>
      {alertText}
    </div>
  );
};

export default Alert;
