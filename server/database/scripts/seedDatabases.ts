const fs = require("node:fs")
const { pipeline } = require("node:stream/promises")
const path = require("path")
const { from: copyFrom } = require("pg-copy-streams")
import client from "../index"

function seedDBs() {
  client.connect(async (err, client, done) => {
    if (err) console.log(err)
    await seedQuestions(client)
    await seedAnswers(client)
    await seedAnswerPhotos(client)
    done()
  })
}

async function seedQuestions(client) {
  const targetTable = client.query(copyFrom("COPY Questions FROM STDIN DELIMITER ',' CSV HEADER"))
  const sourceFile = fs.createReadStream("server/database/datafiles/questions.csv")
  sourceFile.on('error', (err) => {console.log(err)})
  targetTable.on('error', (err) => {console.log(err)})
  targetTable.on('finish', () => {console.log("Questions database seeded")})
  await sourceFile.pipe(targetTable)
  await client.query("CREATE SEQUENCE questions_id_seq;")
  await client.query("ALTER TABLE Questions ALTER COLUMN question_id SET DEFAULT nextval('questions_id_seq');")
  await client.query("ALTER TABLE Questions ALTER COLUMN question_id SET NOT NULL;")
  await client.query("ALTER SEQUENCE questions_id_seq OWNED BY Questions.question_id;")

  const result = await client.query("SELECT MAX(question_id) FROM Questions;")
  const initialRows = result.rows[0].max
  await client.query(`SELECT setval('questions_id_seq', ${initialRows});`)
}

async function seedAnswers(client) {
  const targetTable = client.query(copyFrom("COPY Answers FROM STDIN DELIMITER ',' CSV HEADER"))
  const sourceFile = fs.createReadStream("server/database/datafiles/answers.csv")
  sourceFile.on('error', (err) => {console.log(err)})
  targetTable.on('error', (err) => {console.log(err)})
  targetTable.on('finish', () => {console.log("Answers database seeded")})
  await sourceFile.pipe(targetTable)
  await client.query("CREATE SEQUENCE answers_id_seq;")
  await client.query("ALTER TABLE Answers ALTER COLUMN answer_id SET DEFAULT nextval('answers_id_seq');")
  await client.query("ALTER TABLE Answers ALTER COLUMN answer_id SET NOT NULL;")
  await client.query("ALTER SEQUENCE answers_id_seq OWNED BY Answers.answer_id;")

  const result = await client.query("SELECT MAX(answer_id) FROM Answers;")
  const initialRows = result.rows[0].max
  await client.query(`SELECT setval('answers_id_seq', ${initialRows});`)
}

async function seedAnswerPhotos(client) {
  const targetTable = client.query(copyFrom("COPY AnswerPhotos FROM STDIN DELIMITER ',' CSV HEADER"))
  const sourceFile = fs.createReadStream("server/database/datafiles/answers_photos.csv")
  sourceFile.on('error', (err) => {console.log(err)})
  targetTable.on('error', (err) => {console.log(err)})
  targetTable.on('finish', () => {console.log("Photos database seeded")})
  await sourceFile.pipe(targetTable)
  await client.query("CREATE SEQUENCE answerPhotos_id_seq;")
  await client.query("ALTER TABLE AnswerPhotos ALTER COLUMN photo_id SET DEFAULT nextval('answerPhotos_id_seq');")
  await client.query("ALTER TABLE AnswerPhotos ALTER COLUMN photo_id SET NOT NULL;")
  await client.query("ALTER SEQUENCE answerPhotos_id_seq OWNED BY AnswerPhotos.photo_id;")

  const result = await client.query("SELECT MAX(photo_id) FROM AnswerPhotos;")
  const initialRows = result.rows[0].max
  await client.query(`SELECT setval('answerPhotos_id_seq', ${initialRows});`)
}

seedDBs();