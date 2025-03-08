export const isValidLogin = (login: string): boolean => {
  const regex = /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/;
  return regex.test(login);
};

export const isValidPassword = (password: string): boolean => {
  const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/;

  return regex.test(password);
};

export const isValidName = (name: string): boolean => {
  const regex = /^[A-ZА-ЯЁ][a-zа-яё-]*$/u;
  return regex.test(name);
};

export const isValidEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const regex = /^\+?\d{10,15}$/;
  return regex.test(phone);
};
