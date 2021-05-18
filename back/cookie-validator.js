export function cookieValidator(req, res, next) {
  const cookie = parseCookie(req.headers.cookie);
  if (validate(cookie)) {
    next();
  } else {
    res.status(401).send('Unauthorized');
  }
}

export function parseCookie(str) {
  const cookiePairs = str && str.split(';');

  return (cookiePairs || [])
    .map(s => s.split('='))
    .reduce((acum, cur) => {
      acum[cur[0].trim()] = cur[1].trim();
      return acum;
    }, {});
}

function validate(obj) {
  return obj && obj.hasOwnProperty('session') && obj.hasOwnProperty('platformId');
}
