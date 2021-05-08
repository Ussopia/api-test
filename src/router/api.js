const express = require('express')
const router = express.Router()

const { generateKey, generateAPIToken } = require('../utils')

const auth = require('../middlewares/auth-api')

const { Users } = require('../models')

const {
  randomTrivia,
  randomTriviaByType,
  triviaById,
  typesRefs,
} = require('../controllers/JokeController')

//router.use(auth())

router.get('/types', (req, res) => {
  const keys = Object.keys(typesRefs)
  return res.json({
    count: keys.length,
    accepted_types: keys,
    keys: typesRefs,
  })
})

router.get('/random', (req, res) => {
  const trivia = randomTrivia(req.query.disallow)
  if (trivia.error) {
    return res.status(400).json({
      status: 400,
      error: 'Mauvaise demande',
      message: trivia.message,
    })
  }
  return res.status(200).json(trivia.response)
})

router.get('/type/:type/random', (req, res) => {
  const trivia = randomTriviaByType(req.params.type)
  if (trivia.error) {
    return res.status(400).json({
      status: 400,
      error: 'Mauvaise demande',
      message: trivia.message,
    })
  }
  return res.status(200).json(trivia.response)
})

router.get('/id/:id', (req, res) => {
  const trivia = triviaById(req.params.id)
  if (trivia.error) {
    return res.status(400).json({
      status: 400,
      error: 'Mauvaise demande',
      message: trivia.message,
    })
  }
  return res.status(200).json(trivia.response)
})

router.post('/regenerate', async (req, res) => {
  if (!req.body || req.body.key !== req.auth.key) {
    return res.status(400).json({
      status: 400,
      error: 'Mauvaise demande',
      message: 'Key is missing',
    })
  }

  try {
    const key = generateKey()
    const token = await generateAPIToken(req.auth.user_id, key, 100)

    await Users.update(
      {
        token_key: key,
        token: token,
      },
      {
        where: { user_id: req.auth.user_id },
      },
    )

    return res.status(200).json(token)
  } catch (error) {
    return res.status(400).json({
      status: 500,
      error: 'Erreur Interne du Serveur',
      message: 'Un problème est survenu',
    })
  }
})

router.get('*', (req, res) => {
  return res.send('Check documentation: https://www.blagues-api.fr/')
})

module.exports = router
