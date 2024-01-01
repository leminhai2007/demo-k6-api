import { sleep, group, check, fail } from 'k6'
import { Trend } from 'k6/metrics'
import { doLogin } from "../api/auth.js"
import { getProducts, getProductById, searchProducts } from "../api/product.js"
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import { printErrorLog } from '../utils/common.js'

// Define test steps
const steps = [
    'T001_Step01_Login',
    'T001_Step02_ViewProductList',
    'T001_Step03_SearchProduct',
    'T001_Step04_ViewProductById'
];

// Define response time
const responseTimes = steps.map((step) => new Trend(step));

// Define other variable
const thinkTime = 1;

export function action(data) {
    let token;
    group(steps[0], function () {
        const responseTime = responseTimes[0]

        // Think time
        sleep(thinkTime);

        // Actions
        const response = doLogin(data.username, data.password)

        // Verify
        const result = check(response, {
            'Verify login': response.status === 200 && response.json().token != undefined,
        });

        // Get response time
        responseTime.add(response.timings.duration);

        // Exist if failed
        if (!result) {
            printErrorLog(response);
            fail("Request failed");
        }

        // Correlate data
        token = response.json().token;
    })

    group(steps[1], function () {
        const responseTime = responseTimes[1]

        // Think time
        sleep(thinkTime);

        // Actions
        const response = getProducts(token);

        // Verify
        const result = check(response, {
            'Verify get products': response.status === 200 &&
                response.json().products != undefined && 
                response.json().total === 100 &&
                response.json().limit === 30,
        });

        // Get response time
        responseTime.add(response.timings.duration);

        // Exist if failed
        if (!result) {
            printErrorLog(response);
            fail("Request failed");
        }
    })

    let productId;
    let productTitle;
    group(steps[2], function () {
        const responseTime = responseTimes[2]

        // Think time
        sleep(thinkTime);

        // Actions
        const response = searchProducts(token, data.keyword);

        // Verify
        const result = check(response, {
            'Verify search product': response.status === 200 &&
                response.json().total == data.total,
        });

        // Get response time
        responseTime.add(response.timings.duration);

        // Exist if failed
        if (!result) {
            printErrorLog(response);
            fail("Request failed");
        }

        // Correlate data
        const product = randomItem(response.json().products);
        productId = product.id;
        productTitle = product.title;
    })

    group(steps[3], function () {
        const responseTime = responseTimes[3]

        // Think time
        sleep(thinkTime);

        // Actions
        const response = getProductById(token, productId);

        // Verify
        const result = check(response, {
            'Verify get product item': response.status === 200 &&
                response.json().title === productTitle,
        });

        // Get response time
        responseTime.add(response.timings.duration);

        // Exist if failed
        if (!result) {
            printErrorLog(response);
            fail("Request failed");
        }
    })
}