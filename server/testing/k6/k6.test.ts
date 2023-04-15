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
}

export default function () {
  const product_id = Math.round(Math.random() * 100000) + 563871
  const response = http.get(`http://localhost:${process.env.SERVER_PORT}/qa/questions?product_id=${product_id}`);
}