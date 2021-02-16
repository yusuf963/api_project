const buildObjectLog = (obj) => {
  if (!Object.keys(obj).length) return 'None'
  return JSON.stringify(obj, null, 4)
}

const logger = (req, _res, next) => {
  console.log(`--------------------------------
🔴 INCOMING REQUEST!
🔴 Request Method: ${req.method}
🔴 Request URl: ${req.url}
😺‍ Request Headers: ${buildObjectLog(req.headers)}
📦 Request Body: ${buildObjectLog(req.body)}
❓ Request Query: ${buildObjectLog(req.query)}
--------------------------------`)

  // ! next is a function that we call
  // ! to tell express that we're finished
  // ! with this particular middleware.
  next()
}

export default logger