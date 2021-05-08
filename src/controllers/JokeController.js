const trivias = require('../../blagues.json')
const { random } = require('../utils')

const typesRefs = {
  anime: "anime",
}

const randomTrivia = disallow => {
  const typesForbidden = Array.isArray(disallow) ? disallow : Array.of(disallow)
  if (
    disallow &&
    typesForbidden.some(type => !Object.keys(typesRefs).includes(type))
  ) {
    return {
      error: true,
      message: 'Mauvais type fourni',
    }
  }
  return {
    error: false,
    response: random(
      disallow
        ? trivias.filter(trivia => !typesForbidden.includes(trivia.type))
        : trivias,
    ),
  }
}

const triviaById = id => {
  const searchedTrivia = trivias.find(trivia => trivia.id == id)
  return {
    error: searchedTrivia == undefined,
    response: searchedTrivia,
  }
}

const randomTriviaByType = type => {
  if (!Object.keys(typesRefs).includes(type)) {
    return {
      error: true,
      message: 'Mauvais type fourni',
    }
  }
  return {
    error: false,
    response: random(trivias.filter(trivia => trivia.type === type)),
  }
}

const triviasCount = () => {
  return trivias.length
}

module.exports = {
  randomTrivia,
  randomTriviaByType,
  triviaById,
  triviasCount,
  typesRefs,
}
