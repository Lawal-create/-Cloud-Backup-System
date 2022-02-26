import { JwtPayload } from "jsonwebtoken";
export interface MulterFile {
  [fieldname: string]: Express.Multer.File[];
}

export interface UploadFile extends Express.Multer.File {
  location: string;
  key: string;
  originalname: string;
}

export interface JWTData extends JwtPayload {
  _id: string;
}

export type role = "admin" | "user" | string;
