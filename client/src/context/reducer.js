import { CLEAR_ALERT, DISPLAY_ALERT } from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: action.payload.type,
        alertText: action.payload.message,
      };
    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: '',
        alertText: '',
      };
    default:
      throw new Error(`no such action :${action.type}`);
  }
};

export default reducer;
