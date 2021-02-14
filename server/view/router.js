import express from 'express'
import controller from '../controller/user.js'


const router = express.Router()
// user rigesteration
router.route('/rigester')
  .post(controller.userRigerter)

// user LOGIN
router.route('/login')
  .post(controller.userLogIn)

//all songs
router.route('/songs')
  .get(controller.getAllSongs)
  .post(controller.postSong)

//one song
router.route('/song/:id')
  .get(controller.getOneSong)
  .put(controller.replaceOneSong)
  .patch(controller.editOneSong)
  .delete(controller.deleteOneSong)

export default router