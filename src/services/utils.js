export const getFileFromInput = input => {
  return input && input.files && input.files[0] ? input.files[0] : null;
};
