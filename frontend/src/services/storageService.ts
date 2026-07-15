const TOKEN_KEY = 'jwt';

export const setJwtToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
}

export const getJwtToken = () => {
  return localStorage.getItem(TOKEN_KEY);
}

export const removeJwtToken = () => {
  localStorage.removeItem(TOKEN_KEY);
}