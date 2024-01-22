import { randomItem } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export function getSequentialData(data_list, iteration_number) {
    return data_list[iteration_number % data_list.length]
}

export function getUniqueData(data_list, iteration_number) {
    return data_list[iteration_number]
}

export function getRandomData(data_list) {
    return randomItem(data_list)
}

export function combineData() {
    const result = {};
    for (const obj of arguments) {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                result[key] = obj[key];
            }
        }
    }
    return result;
}
