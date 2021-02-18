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
  .put(secureRoute, controller.updateOneSong)
  .delete(secureRoute, controller.deleteOneSong)

//comment router
router.route('/song/:songId/comment')
  .post(secureRoute, controller.postComment)

export default router


// consta
//{
//   "email": "sonji@gmail.com",
// 	"password": "111"
// }
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlMb2FkIjoiNjAyZDljNjQyZWUwMzczZWRjNDE5ZDRlIiwiaWF0IjoxNjEzNjAyMjMyLCJleHAiOjE2MTM2ODg2MzJ9.DqR_xm-C9kQZkUTwLYo0LxkiEPR2ihrUZlW9DHHEhkU