import client from "../database/index"

const getQuestions = async (productID, page = 1, count = 5) => {
  await client.connect()
  try {
    const response = await client.query(`SELECT * from Questions WHERE product_id = ${productID} LIMIT ${count};`)
    console.log(response.rows)
  } finally {
    client.end()
  }
}

getQuestions(1, 1, 5);