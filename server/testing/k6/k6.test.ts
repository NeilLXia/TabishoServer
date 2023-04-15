import { sleep, check } from 'k6';
import http from 'k6/http';

export let options = {
  ext: {
    loadimpact: {
      projectID: 3635334,
      name: "Get Questions Load Test"
    }
  },
  vus: 50,
  duration: '30s',
  // stages: [
  //   { target: 50, duration: '1m' },
  // ],
}

export default function () {
  const product_id = Math.round(Math.random() * 400) + 563871
  // const response = http.get(`http://localhost:5430/qa/questions?product_id=${product_id}`);
  const response = http.get(`http://3.17.208.214/qa/questions/?product_id=${product_id}`);
}