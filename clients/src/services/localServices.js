export const user = {
  get: () => {
    return localStorage.getItem("profile");
  },
};
