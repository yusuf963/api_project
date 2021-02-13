import express from 'express'
import controller from '../controller/user.js'


const router = express.Router()

router.route('/register')
  .post(controller.addUser)

router.route('/songs')
  .get(controller.getAllSongs)

router.route('/song:id')
  .get(controller.getOneSong)
  .put(controller.replaceOneSong)
  .patch(controller.editOneSong)
  .delete(controller.deleteOneSong)

export default router