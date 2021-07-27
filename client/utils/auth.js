// Check whether the user has a token on their request.
// If they have a token, make a DB call.
// Check whether the DB has a token that matches.
// If the DB doesn't have a matching token (no session) then return false
// IF the DB has a matching token, return true.

import Cookies from "js-cookie";

const isLoggedIn = () => {
  const loggedIn = Cookies.get("loggedIn");
  return loggedIn;
};

export default { isLoggedIn };
