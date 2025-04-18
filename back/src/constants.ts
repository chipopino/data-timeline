import multer from "multer";
import * as path from "path";

export const upload = multer({
  dest: path.join(process.env.ROOT_PATH || "", "public/"),
});

