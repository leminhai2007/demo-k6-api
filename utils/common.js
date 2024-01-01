export function printErrorLog(response) {
    console.error(
        `
        Request: ${JSON.stringify(response.request)}
        Response: ${JSON.stringify(response)}
        `
    );
}

export function getTestId() {
    const padZero = (value) => (value < 10 ? `0${value}` : `${value}`);
    const currentTime = new Date();
    const testIdValue = `${currentTime.getFullYear()}.${padZero(currentTime.getMonth() + 1)}.${padZero(currentTime.getDay())}_${padZero(currentTime.getHours())}${padZero(currentTime.getMinutes())}`;

    return [testIdValue];
}