const fs = require("node:fs")
const { pipeline } = require("node:stream/promises")
const { from: copyFrom } = require("pg-copy-streams")
import client from "../index"

async function seedDBs() {
  await client.connect()
  try {
    await seedQuestions();
    await seedAnswers();
    await seedAnswerPhotos();
  } finally {
    client.end()
  }
}

async function seedQuestions() {
    const targetTable = client.query(copyFrom("COPY Questions FROM STDIN DELIMITER ',' CSV HEADER"))
    const sourceFile = fs.createReadStream("server/database/datafiles/questions.csv")
    await pipeline(sourceFile, targetTable)
    await client.query("CREATE SEQUENCE questions_id_seq;")
    await client.query("ALTER TABLE Questions ALTER COLUMN question_id SET DEFAULT nextval('questions_id_seq');")
    await client.query("ALTER TABLE Questions ALTER COLUMN question_id SET NOT NULL;")
    await client.query("ALTER SEQUENCE questions_id_seq OWNED BY Questions.question_id;")

    const result = await client.query("SELECT MAX(question_id) FROM Questions;")
    const initialRows = result.rows[0].max
    await client.query(`SELECT setval('questions_id_seq', ${initialRows});`)
}

async function seedAnswers() {
  const targetTable = client.query(copyFrom("COPY Answers FROM STDIN DELIMITER ',' CSV HEADER"))
  const sourceFile = fs.createReadStream("server/database/datafiles/answers.csv")
  await pipeline(sourceFile, targetTable)
  await client.query("CREATE SEQUENCE answers_id_seq;")
  await client.query("ALTER TABLE Answers ALTER COLUMN answer_id SET DEFAULT nextval('answers_id_seq');")
  await client.query("ALTER TABLE Answers ALTER COLUMN answer_id SET NOT NULL;")
  await client.query("ALTER SEQUENCE answers_id_seq OWNED BY Answers.answer_id;")

  const result = await client.query("SELECT MAX(answer_id) FROM Answers;")
  const initialRows = result.rows[0].max
  await client.query(`SELECT setval('answers_id_seq', ${initialRows});`)
}

async function seedAnswerPhotos() {
  const targetTable = client.query(copyFrom("COPY AnswerPhotos FROM STDIN DELIMITER ',' CSV HEADER"))
  const sourceFile = fs.createReadStream("server/database/datafiles/answers_photos.csv")
  await pipeline(sourceFile, targetTable)
  await client.query("CREATE SEQUENCE answerPhotos_id_seq;")
  await client.query("ALTER TABLE AnswerPhotos ALTER COLUMN photo_id SET DEFAULT nextval('answerPhotos_id_seq');")
  await client.query("ALTER TABLE AnswerPhotos ALTER COLUMN photo_id SET NOT NULL;")
  await client.query("ALTER SEQUENCE answerPhotos_id_seq OWNED BY AnswerPhotos.photo_id;")

  const result = await client.query("SELECT MAX(photo_id) FROM AnswerPhotos;")
  const initialRows = result.rows[0].max
  await client.query(`SELECT setval('answerPhotos_id_seq', ${initialRows});`)
}

seedDBs();