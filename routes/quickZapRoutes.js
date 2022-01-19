const { sendMessage } = require("../controllers/messageController"),
  express = require("express"),
  router = express.Router();

router.post("/sendMessage", sendMessage);

module.exports = router;
