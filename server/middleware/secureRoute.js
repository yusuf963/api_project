import jwToken from 'jsonwebtoken'
import User from '../model/userSchema.js'
import { secret } from '../db/enviroment.js'

const secureRoute = async (req, res, next) => {
  const authToken = req.headers.authorization
  try {
    if (!authToken || !authToken.startsWith('Bearer')) {
      return res.status(401).send('Unauthorized')
    }
    const token = authToken.replace('Bearer ', '')
    // the data is the payload
    jwToken.verify(token, secret, async (err, data) => {
      if (err) {
        return res.status(401).send('Unauthorized')
      }
      const user = await User.findById(data.payLoad)
      if (!user) {
        return res.status(401).send('Unauthorized')
      }
      //this for object level permission
      req.currentUser = user
      next()
    })
  } catch (err) {
    res.status(401).send({ message: 'Unauthorized' })
  }

}
export default secureRoute
