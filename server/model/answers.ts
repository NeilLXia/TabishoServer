import client from "../database/"

export default {
  getAnswers: (question_id, page = 1, count = 5) => new Promise(async (resolve, reject) => {
    try {
      const offset = (page - 1) * count
      const answers = await client.query(`SELECT * from Answers WHERE question_id = ${question_id} LIMIT ${count} OFFSET ${offset};`)
      resolve(answers.rows)
    } catch (err) {
      reject(err)
    }
  }),
  postAnswer: (question_id, body, name, email) => new Promise(async (resolve, reject) => {
    try {
      const valuesString = `${question_id}, '${body}', ${Date.now()}, '${name}', '${email}', FALSE, 0`
      const response = await client.query(
        `INSERT INTO Answers (
          question_id,
          body,
          date_written,
          answerer_name,
          answerer_email,
          reported,
          helpful
        )
        VALUES (${valuesString});`
      )
      console.log(response)
      resolve(null);
    } catch (err) {
      console.log(err)
      reject(err)
    }
  }),
  putAnswer: (answer_id, modifier) => new Promise(async (resolve, reject) => {
    try {
      let updateString = ""
      if (modifier === "reported") { updateString = "reported=TRUE" }
      if (modifier === "helpful") {
        const helpfulCount = await client.query(`SELECT helpful FROM Answers WHERE answer_id=${answer_id}`)
        updateString = `helpful=${helpfulCount.rows[0].helpful + 1}`
      }
      const response = await client.query(
        `UPDATE Answers
        SET ${updateString}
        WHERE answer_id=${answer_id};`
      )
      resolve(null);
    } catch (err) {
      reject(err)
    }
  }),
}