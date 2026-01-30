const countdownPromise = () => {
    return new Promise((res) => {
        let count = 1;

        const interval = setInterval(() => {
            if (count > 3) {
                clearInterval(interval);
                res(count); // Resolve the promise
            } else {
                console.log(count);
                count++;
            }
        }); // Reduced to 1s for testing purposes
    });
};

const syncTimer = (message: string = "") => {
    setTimeout(() => {
        console.log(message);
    }, 1000); // Reduced to 3s for testing purposes
};

export { countdownPromise, syncTimer };
