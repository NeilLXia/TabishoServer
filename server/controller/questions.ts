import model from "../model"

export default {
  getQuestions: (req, res) => {
    model.getQuestions(req.query.product_id, req.query.page, req.query.count)
    .then((queryData) => JSON.stringify(queryData))
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err))
  },
  postQuestion: (req, res) => {
    const { product_id, body, name, email } = req.body
    model.postQuestion(product_id, body, name, email)
    .then((queryData) => JSON.stringify(queryData))
    .then((data) => res.status(201).send("Question posted successfully"))
    .catch((err) => res.status(400).send(err))
  },
  putQuestionHelpful: (req, res) => {
    model.putQuestion(req.params.question_id, "helpful")
    .then((queryData) => JSON.stringify(queryData))
    .then((data) => res.status(200).send("Question marked as helpful"))
    .catch((err) => res.status(400).send(err))
  },
  putQuestionReported: (req, res) => {
    model.putQuestion(req.params.question_id, "reported")
    .then((queryData) => JSON.stringify(queryData))
    .then((data) => res.status(200).send("Question marked as helpful"))
    .catch((err) => res.status(400).send(err))
  },
}