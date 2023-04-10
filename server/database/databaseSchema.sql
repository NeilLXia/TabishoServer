DROP DATABASE hr2302_sdc;
CREATE DATABASE hr2302_sdc;

\c hr2302_sdc;

CREATE TABLE IF NOT EXISTS Questions (
question_id INT PRIMARY KEY,
product_id INT NOT NULL,
question_body TEXT NOT NULL,
question_date NUMERIC,
asker_name TEXT,
asker_email VARCHAR(320),
question_reported BOOLEAN,
question_helpfulness INT);

CREATE INDEX questionsindex
ON Questions (product_id);

CREATE TABLE IF NOT EXISTS Answers (
answer_id INT PRIMARY KEY,
question_id INT NOT NULL,
body TEXT NOT NULL,
date_written NUMERIC,
answerer_name TEXT,
answerer_email VARCHAR(320),
reported BOOLEAN,
helpful INT,
CONSTRAINT fk_question
  FOREIGN KEY(question_id)
  REFERENCES Questions(question_id)
);

CREATE INDEX answersindex
ON Answers (question_id);

CREATE TABLE IF NOT EXISTS AnswerPhotos (
photo_id INT PRIMARY KEY,
answer_id INT NOT NULL,
url TEXT NOT NULL,
CONSTRAINT fk_answer
  FOREIGN KEY(answer_id)
  REFERENCES Answers(answer_id)
);

CREATE INDEX apindex
ON AnswerPhotos (answer_id);