import client from "../database/"

export default {
  getQuestions: async (productId, page = 1, count = 5) => {
    const offset = (page - 1) * count
    try {
      const result = await client.query(
        // `SELECT json_build_object(
        //   'product_id', ${productId},
        //   'results', (SELECT json_agg(json_build_object(
        //     'question_id', q.question_id,
        //     'question_body', q.question_body,
        //     'question_date', q.question_date,
        //     'asker_name', q.asker_name,
        //     'asker_email', q.asker_email,
        //     'question_reported', q.question_reported,
        //     'question_helpfulness', q.question_helpfulness
        //   ))
        //   FROM Questions q
        //   WHERE product_id = ${productId})
        // );`
        // )
        // return result.rows
        `SELECT Questions.*,
        (
          SELECT jsonb_agg(nested_answer)
          FROM (
            SELECT *,
            (
              SELECT jsonb_agg(nested_photos)
              FROM (
                SELECT *
                FROM AnswerPhotos
                WHERE answer_id = Answers.answer_id
              ) as nested_photos
            ) as photos
            FROM Answers
            WHERE question_id = Questions.question_id
          ) as nested_answer
        ) as answers
        FROM Questions
        WHERE product_id = $1
        LIMIT $2
        OFFSET $3;`, [productId, count, offset]
      )
      return { 'product_id': productId, results: result.rows }
    } catch (err) { console.log(err); throw err }
  },
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