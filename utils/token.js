import jwt from "jsonwebtoken";

const Token = (token) => {
  if (!token) return null;

  try {
    const restoken = jwt.verify(token.split(" ")[1], "SECRET_KEY");
    return restoken;
  } catch (e) {
    throw new AuthenticationError("Authentication token is invalid, please log in");
  }
};

export default Token;
