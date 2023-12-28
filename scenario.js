import { scenario } from 'k6/execution'
import { SharedArray } from 'k6/data';
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js'
import { GetData } from './utils/data.js'
import { action as testT001 } from './scripts/T001_get_product.js'

// Options
export const options = {
  scenarios: {
    T001_Scenario: {
      exec: 'scenarioT001',

      // For scenario: run immediately with max iteration each VUs
      executor: 'per-vu-iterations',
      vus: 5,
      iterations: 1,

      // // For scenario: run immediately for a period of time
      // executor: 'constant-vus',
      // vus: 10,
      // duration: '30s',

      // // For scenario: ramp-up, duration, ramp-down
      // executor: 'ramping-vus',
      // startVUs: 0,
      // stages: [
      //   { duration: '20s', target: 10 },
      //   { duration: '1m', target: 10 },
      //   { duration: '10s', target: 0 },
      // ],
      // gracefulRampDown: '10s',
    },
  },
};

// Data Parameterization
const userParameters = new SharedArray('users', function () {
  return papaparse.parse(open('./data/users.csv'), { header: true }).data;
});
const productParameters = new SharedArray('products', function () {
  return papaparse.parse(open('./data/products.csv'), { header: true }).data;
});

function dataParameterize(iterationInTest) {
  const dataRetriver = new GetData(iterationInTest);

  const userData = dataRetriver.getUniqueData(userParameters);
  const productData = dataRetriver.getSequentialData(productParameters); // For demo only

  return dataRetriver.combineData(userData, productData);
}

// Actions for VU
export function scenarioT001() {
  const data = dataParameterize(scenario.iterationInTest);
  testT001(data);
}
