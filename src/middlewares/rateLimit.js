let hostsStats = {}

setInterval(() => {
  hostsStats = {}
}, 10000)

module.exports = (req, res, next) => {
  const requester = String(
    req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown',
  )

  const limit = req.auth.limit || 100

  if (!hostsStats[requester]) {
    hostsStats[requester] = 1
  } else {
    hostsStats[requester] = hostsStats[requester] + 1
  }

  if (hostsStats[requester] > limit) {
    res.status(429).send({
      status: 429,
      error: 'Trop de demandes',
      message: `Votre adresse IP a dépassé votre limite de ${limit} requêtes toutes les 10 secondes. Veuillez réessayer.`,
    })
  }

  next()
}
