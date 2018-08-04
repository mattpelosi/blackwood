let index = 0;

export const addErrorMessages = errors => ({
  type: "ADD_ERROR_MESSAGES",
  errors,
  index: index++
});

export const shouldDisplayErrors = shouldDisplayErrors => ({
  type: "SHOULD_DISPLAY_ERRORS",
  shouldDisplayErrors,
  index: index++
});
