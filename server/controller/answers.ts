import model from "../model"

export default {
  getAnswers: (req, res) => {
    model.getAnswers(req.params.question_id, req.query.page, req.query.count)
    .then((queryData) => JSON.stringify(queryData))
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err))
  },
  postAnswer: (req, res) => {
    const { question_id, body, name, email } = req.body
    model.postAnswer(question_id, body, name, email)
    .then((queryData) => JSON.stringify(queryData))
    .then((data) => res.status(201).send("Answer posted successfully"))
    .catch((err) => res.status(400).send(err))
  },
  putAnswerHelpful: (req, res) => {
    model.putAnswer(req.params.answer_id, "helpful")
    .then((queryData) => JSON.stringify(queryData))
    .then((data) => res.status(200).send("Answer marked as helpful"))
    .catch((err) => res.status(400).send(err))
  },
  putAnswerReported: (req, res) => {
    model.putAnswer(req.params.answer_id, "reported")
    .then((queryData) => JSON.stringify(queryData))
    .then((data) => res.status(200).send("Answer marked as helpful"))
    .catch((err) => res.status(400).send(err))
  },
}