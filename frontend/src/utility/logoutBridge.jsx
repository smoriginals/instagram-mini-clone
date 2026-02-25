let logoutHandler;

export const registerLogout = (fn) => {
    logoutHandler = fn;
};

export const triggerLogout = () => {
    if (logoutHandler) logoutHandler();
};