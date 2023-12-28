export function printErrorLog(response) {
    console.error(
        `
        Request: ${JSON.stringify(response.request)}
        Response: ${JSON.stringify(response)}
        `
    );
}