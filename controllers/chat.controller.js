const chatModel = require('../model/chat.model')

const getChats = (req, res) => {
  chatModel.find((err, resp) => {
    if(err) {
      res.status(501).send({status: false, message: "internal Server Error"});
    } else {
      if (resp) {
        res.status(200).send({status: true, message: "success", messages: resp});
      }
    }
  })
}

const postChats = (req, res) => {
  const form = new chatModel(req.body);
  form.save((err, result) => {
    if(err) {
      res.send({status: false, message: "Internal server Error"});
    } else {
      res.send({status: true, message: "success", text: result})
    }
  })
}

module.exports = { getChats, postChats };