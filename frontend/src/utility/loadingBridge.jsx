let startLoading;
let stopLoading;
let requestCount = 0;

export const axiosBridge = (start, stop) => {
    startLoading = start;
    stopLoading = stop;
}

export const showLoading = () => {
    requestCount++;
    startLoading?.();
}

export const hideLoading = () => {
    requestCount--;
    if (requestCount <= 0) {
        stopLoading?.();
        requestCount = 0;
    }
}