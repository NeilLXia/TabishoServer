import { sleep, check } from 'k6';
import http from 'k6/http';

export let options = {
  ext: {
    loadimpact: {
      projectID: 3635128,
      name: "Get Questions Load Test"
    }
  }
}

export default function () {
  const product_id = Math.round(Math.random() * 1000011)
  const response = http.get(`http://localhost:5430/qa/questions?product_id=${product_id}`);
}