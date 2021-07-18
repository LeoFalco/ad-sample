const express = require('express')
require('express-async-errors')
const cors = require('cors')
const { decode, verify } = require('jsonwebtoken')
const app = express()

const JksClient = require('jwks-rsa')

const jksClient = JksClient({
  jwksUri: `https://login.microsoftonline.com/common/discovery/v2.0/keys`
})

app.use(cors())
app.use(express.json())

app.post('/', async (req, res) => {
  return res.send({
    ok: true
  })

})

app.post('/authenticate', async (req, res) => {
  try {
    const { idToken } = req.body || {}

    if (!idToken) {
      throw new Error('No token provided')
    }

    const { header, payload } = decode(idToken, {
      complete: true,
    })

    console.log('head', header)
    console.log('payload', payload)

    const key = await jksClient.getSigningKey(header.kid)


    const verified = verify(idToken, key.getPublicKey(), {
      algorithms: header.alg
    })

    return res.status(200).json({
      name: verified.name,
      email: verified.preferred_username,

    })
  } catch (err) {
    console.log('err', err)
    return res.status(401).send({
      message: err.message
    })
  }
})

module.exports = app