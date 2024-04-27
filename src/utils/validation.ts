

export const validatePassword = (password: string) => {
    if (password.length < 6) {
        return "Password must be at least 6 characters long";
    }
    return '';
};

export const validateEmail = (email: string) => {
    
    if (String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )) {
        return '';
      } else {
        return 'Invalid email';
      }
  };