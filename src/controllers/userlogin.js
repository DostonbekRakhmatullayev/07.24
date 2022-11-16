import { errorHandler } from "../errors/errorsHandler.js";
import { read } from "../utils/FS.js";
import { adminPost } from "../validate/validaye.js";
import jwt from "../utils/jwt.js";
import sha256 from "sha256";

const LOGIN = async (req, res, next) => {
  const { error, value } = adminPost.validate(req.body);

  if (error) {
    return next(new errorHandler(error.message, 400));
  }
  const { username, password } = value;

  const admin = await read("admin.model.json").catch((error) =>
    next(new errorHandler(error, 401))
  );

  const newAdmin = admin.find(
    (e) => e.username == username && e.password == sha256(password)
  );

  if (!newAdmin) {
    return next(new errorHandler("Name and password did not match", 500));
  }

  if (newAdmin) {
    res.status(200).json({
      message: "Success",
      token: jwt.sing({ userId: newAdmin.user_id }),
      status: 200,
    });
  }
};

export { LOGIN };
