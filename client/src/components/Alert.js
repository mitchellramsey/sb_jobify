import { useSelector } from 'react-redux';

const Alert = () => {
  const user = useSelector((store) => store.user);
  const job = useSelector((store) => store.job);
  const alertType = user.alertType || job.alertType;
  const alertText = user.alertText || job.alertText;
  return <div className={`alert alert-${alertType}`}>{alertText}</div>;
};

export default Alert;
