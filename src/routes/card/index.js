const router = require('express').Router();
const shared = require('../../shared');
const { InvalidRequestError, UnauthenticatedError, UnauthorizedError } = require('../../shared/error');
const { verify } = require('../../auth');

router.get('/', shared.asyncWrapper(async (req, res) => {
  const { Card } = res.locals.models;


  if (!req.headers.authorization) {
    throw new UnauthenticatedError("Your session has expired, please login again")
  }
  const decodedAuth = verify(req.headers.authorization);
  if (!decodedAuth){
    throw new UnauthenticatedError("Your session has expired, please login again");
  }



  if (req.query.id) { // Get a single card by id
    const reg = new RegExp(/^\d*$/);
    if (!reg.test(req.query.id)) {
      throw new InvalidRequestError("Id is not a number");
    }
    if (parseInt(req.query.id) <= 0) {
      throw new InvalidRequestError("Invalid query");
    }
    const card = await Card.findOne({
      where: {
        UserId: decodedAuth.id,
        id: req.query.id
      }
    })
    return res.json(shared.makeResponse(card));
  } else if (req.query.DeckId) { // Get all the cards from a deck
    const cards = await Card.findAll({
      where: {
        UserId: decodedAuth.id,
        DeckId: req.query.DeckId,
      }
    })
    return res.json(shared.makeResponse(cards));
  } else { // Get all of the cards
    const cards = await Card.findAll({
      where: {
        UserId: decodedAuth.id,
      }
    })
    return res.json(shared.makeResponse(cards));
  }

}));

router.post('/', shared.asyncWrapper(async (req, res) => {
  const { Card } = res.locals.models;
  if (!req.headers.authorization) {
    throw new UnauthenticatedError("Your session has expired, please login again")
  }
  const decodedAuth = verify(req.headers.authorization);
  if (!decodedAuth){
    throw new UnauthenticatedError("Your session has expired, please login again");
  }
  if (!req.body.term || !req.body.definition || !req.body.confidence || !req.body.UserId || !req.body.DeckId || !req.body.new || !req.body.inProgress || !req.body.review) {
    throw new InvalidRequestError("Missing information");
  }
  if (decodedAuth.id !== parseInt(req.body.UserId)){
    throw new UnauthorizedError("Cannot create a card for an account which is not yours.")
  }

  const card = await Card.create({...req.body});
  return res.json(shared.makeResponse(card));
}));


router.patch('/', shared.asyncWrapper(async (req, res) => {
  const { Card } = res.locals.models;
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
    const card = await Card.update({...req.body}, {
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
  const { Card } = res.locals.models;
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
    const card = await Card.destroy({
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


module.exports = router;