export const validatePassword = (password: string, confirmPassword: string) => {
  return password === confirmPassword;
}