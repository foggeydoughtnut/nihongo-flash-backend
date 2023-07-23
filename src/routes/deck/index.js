const router = require('express').Router();
const shared = require('../../shared');
const { InvalidRequestError, UnauthenticatedError, UnauthorizedError } = require('../../shared/error');
const { verify } = require('../../auth');

router.get('/', shared.asyncWrapper(async (req, res) => {
  const { Deck } = res.locals.models;


  if (!req.headers.authorization) {
    throw new UnauthenticatedError("Your session has expired, please login again")
  }
  const decodedAuth = verify(req.headers.authorization);
  if (!decodedAuth){
    throw new UnauthenticatedError("Your session has expired, please login again");
  }



  if (req.query.id) {
    const reg = new RegExp(/^\d*$/);
    if (!reg.test(req.query.id)) {
      throw new InvalidRequestError("Id is not a number");
    }
    if (parseInt(req.query.id) <= 0) {
      throw new InvalidRequestError("Invalid query");
    }
    const deck = await Deck.findOne({
      where: {
        UserId: decodedAuth.id,
        id: req.query.id
      }
    })
    return res.json(shared.makeResponse(deck));
  } else {
    const decks = await Deck.findAll({
      where: {
        UserId: decodedAuth.id
      }
    })
    return res.json(shared.makeResponse(decks));
  }

}));

router.post('/', shared.asyncWrapper(async (req, res) => {
  const { Deck } = res.locals.models;
  if (!req.headers.authorization) {
    throw new UnauthenticatedError("Your session has expired, please login again")
  }
  const decodedAuth = verify(req.headers.authorization);
  if (!decodedAuth){
    throw new UnauthenticatedError("Your session has expired, please login again");
  }
  if (!req.body.name || !req.body.UserId) {
    throw new InvalidRequestError("Missing information");
  }
  if (decodedAuth.id !== parseInt(req.body.UserId)){
    throw new UnauthorizedError("Cannot create a deck for an account which is not yours.")
  }

  const deck = await Deck.create({...req.body});
  return res.json(shared.makeResponse(deck));
}));


router.patch('/', shared.asyncWrapper(async (req, res) => {
  const { Deck } = res.locals.models;
  if (!req.headers.authorization) {
    throw new UnauthenticatedError("Your session has expired, please login again")
  }
  const decodedAuth = verify(req.headers.authorization);
  if (!decodedAuth){
    throw new UnauthenticatedError("Your session has expired, please login again");
  }
  if (!req.body.id) {
    throw new InvalidRequestError("Missing deck id");
  }
  const reg = new RegExp(/^\d*$/);
  if (!reg.test(req.body.id)) {
    throw new InvalidRequestError("Id is not a number");
  }
  if (parseInt(req.body.id) <= 0) {
    throw new InvalidRequestError("Invalid query");
  }
  

  try {
    const deck = await Deck.update({...req.body}, {
      where: {
        id: req.body.id,
        UserId: decodedAuth.id,
      }
    });
    return res.json(shared.makeResponse('Success'));
  } catch (error) {
    return new InvalidRequestError(error);
  }
}));

router.delete('/', shared.asyncWrapper(async (req, res) => {
  const { Deck } = res.locals.models;
  if (!req.headers.authorization) {
    throw new UnauthenticatedError("Your session has expired, please login again")
  }
  const decodedAuth = verify(req.headers.authorization);
  if (!decodedAuth){
    throw new UnauthenticatedError("Your session has expired, please login again");
  }
  if (!req.body.id) {
    throw new InvalidRequestError("Missing deck id");
  }
  const reg = new RegExp(/^\d*$/);
  if (!reg.test(req.body.id)) {
    throw new InvalidRequestError("Id is not a number");
  }
  if (parseInt(req.body.id) <= 0) {
    throw new InvalidRequestError("Invalid query");
  }
  try {
    const deck = await Deck.destroy({
      where: {
        id: req.body.id,
        UserId: decodedAuth.id,
      }
    });
    return res.json(shared.makeResponse('Success'));
  } catch (error) {
    return new InvalidRequestError(error);
  }
}));


/**
 * Gets the number of new cards, review cards, and inProgress cards for this deck
 */
router.get('/info', shared.asyncWrapper(async (req, res) => {
  const { Card } = res.locals.models;


  if (!req.headers.authorization) {
    throw new UnauthenticatedError("Your session has expired, please login again")
  }
  const decodedAuth = verify(req.headers.authorization);
  if (!decodedAuth){
    throw new UnauthenticatedError("Your session has expired, please login again");
  }

  if (!req.query.DeckId) {
    throw new InvalidRequestError("No Deck Id was included");
  }

  // TODO add a number of reviews and number of new cards to Deck model
  // This will allow there to be a limit for the amount of cards to get
  // For now I will just get all of the available ones
  try {
    const newAmount = await Card.count({
      where: {
        new: true,
        inProgress: false,
        UserId: decodedAuth.id,
        DeckId: req.query.DeckId,
      }
    });
  
    const reviewAmount = await Card.count({
      where: {
        review: true,
        inProgress: false,
        UserId: decodedAuth.id,
        DeckId: req.query.DeckId,
      }
    });
  
    const inProgressAmount = await Card.count({
      where: {
        inProgress: true,
        UserId: decodedAuth.id,
        DeckId: req.query.DeckId,
      }
    });
    return res.json(shared.makeResponse({
      new: newAmount,
      review: reviewAmount,
      inProgress: inProgressAmount,
    }));
  } catch (error) {
    throw new InvalidRequestError(error)
  }
}));


module.exports = router;
