import { User } from "./model.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const auth = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      roles: req.body.roles
    });

    await auth.save();
    res.sendStatus(200);
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send("Error adding user");
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const auth = await User.findOne({ username });

    if (!auth) {
      return res.status(400).json({
        message: "User not found",
        user: null,
      });
    }

    const match = await bcrypt.compare(password, auth.password);
    if (!match) {
      return res.status(401).json({
        message: "Incorrect password",
        user: null,
      });
    }

    const accessToken = jwt.sign(
      { "username": auth.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '30s' }
    );
    const refreshToken = jwt.sign(
      { "username": auth.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );

    auth.refreshToken = refreshToken;
    await auth.save();

    res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
    return res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        id: auth._id,
        username: auth.username,
        roles: auth.roles,
        // Include any other necessary user data
      },
    });
  } catch (error) {
    console.error("Error in login process:", error);
    return res.status(500).json({
      message: "Error in login process",
      user: null,
    });
  }
};


const handleRefreshToken = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;


  const auth =  User.findOne(person=>person.refreshToken===refreshToken);
  if (!foundUser) return res.sendStatus(403); //Forbidden 
  // evaluate jwt 
  jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
          if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
          const accessToken = jwt.sign(
              { "username": decoded.username },
              process.env.ACCESS_TOKEN_SECRET,
              { expiresIn: '30d' }
          );
          res.json({ accessToken })
      }
  );
}


export { signup, login ,handleRefreshToken};
 