import express from 'express'
import controller from '../controller/user.js'
import secureRoute from '../middleware/secureRoute.js'


const router = express.Router()
// user rigesteration
router.route('/register')
  .post(controller.userRegirter)
// user LOGIN
router.route('/login')
  .post(controller.userLogIn)


//all songs
router.route('/songs')
  .get(controller.getAllSongs)
  //secureroute for route level permission
  .post(secureRoute, controller.postSong)

//one song
router.route('/song/:id')
  .get(controller.getOneSong)
  .put(secureRoute, controller.replaceOneSong)
  .patch(secureRoute, controller.editOneSong)
  .delete(secureRoute, controller.deleteOneSong)

export default router