import update from "immutability-helper";

const formData = (state = {}, action) => {
  switch (action.type) {
    case "ADD_ERROR_MESSAGES": {
      const newState = update(state, {
        errorMessages: { $set: action.errors }
      });
      return newState;
    }
    case "SHOULD_DISPLAY_ERRORS": {
      const newState = update(state, {
        shouldDisplayErrors: { $set: action.shouldDisplayErrors }
      });
      return newState;
    }
    default:
      return state;
  }
};
export default formData;
