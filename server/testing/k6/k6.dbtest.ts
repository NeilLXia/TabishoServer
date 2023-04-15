import { sleep, check } from 'k6';
import http from 'k6/http';
import sql from 'k6/x/sql';

export let options = {
  ext: {
    loadimpact: {
      projectID: 3635334,
      name: "DB Load Test"
    }
  }
}

const db = sql.open("postgres", "postgres://postgres:postgres@localhost:5432");

export function teardown() { db.close(); }

export default function () {
  const product_id = Math.round(Math.random() * 400) + 563871
  let results = sql.query(db, `SELECT * FROM questions WHERE product_id = ${product_id};`)
}