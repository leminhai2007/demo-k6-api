import { randomItem } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export class GetData {
    constructor(iteration_number) {
        this.iteration_number = iteration_number;
    }

    getSequentialData(data_list) {
        return data_list[this.iteration_number % data_list.length]
    }

    getUniqueData(data_list) {
        return data_list[this.iteration_number]
    }

    getRandomData(data_list) {
        return randomItem(data_list)
    }

    combineData() {
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
}
