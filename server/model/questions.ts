import client from "../database/"

export default {
  getQuestions: (productId, page = 1, count = 5) => new Promise(async (resolve, reject) => {
    try {
      const offset = (page - 1) * count
      const result = await client.query(
        `SELECT
          Questions.*,
          (
            SELECT jsonb_agg(nested_answer)
            FROM (
              SELECT *
              FROM Answers
              WHERE question_id = Questions.question_id
            ) as nested_answer
          ) as results
        FROM Questions
        WHERE product_id = ${productId}
        LIMIT ${count}
        OFFSET ${offset};`
      )
      resolve(result.rows)
    } catch (err) { reject(err) }
  }),
  postQuestion: (product_id, body, name, email) => new Promise(async (resolve, reject) => {
    try {
      const valuesString = `${product_id}, '${body}', ${Date.now()}, '${name}', '${email}', FALSE, 0`
      const response = await client.query(
        `INSERT INTO Questions (
          product_id,
          question_body,
          question_date,
          asker_name,
          asker_email,
          question_reported,
          question_helpfulness)
        VALUES (${valuesString});`
      )
      resolve(null);
    } catch (err) { reject(err) }
  }),
  putQuestion: (question_id, modifier) => new Promise(async (resolve, reject) => {
    try {
      let updateString
      if (modifier === "reported") { updateString = "question_reported=TRUE" }
      if (modifier === "helpful") {
        const helpfulCount = await client.query(`SELECT question_helpfulness FROM Questions WHERE question_id=${question_id}`)
        updateString = `question_helpfulness=${helpfulCount.rows[0].question_helpfulness + 1}`
      }
      const response = await client.query(
        `UPDATE Questions
        SET ${updateString}
        WHERE question_id=${question_id};`
      )
      resolve(null);
    } catch (err) { reject(err) }
  }),
}