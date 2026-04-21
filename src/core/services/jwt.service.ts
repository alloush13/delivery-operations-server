import jwt, { SignOptions, JwtPayload } from "jsonwebtoken";

export class JwtService {
  private readonly secret: string;
  protected readonly JwtPayload: JwtPayload;
  constructor() {
    this.secret = process.env.JWT_SECRET || "secret-key";
  }

  sign(payload: object, expiresIn: SignOptions["expiresIn"] = "7d") {
    return jwt.sign(payload, this.secret, { expiresIn });
  }

  verify<T = JwtPayload>(token: string): T {
    const decoded = jwt.verify(token, this.secret);

    if (typeof decoded === "string") {
      throw new Error("Invalid token payload");
    }

    return decoded as T;
  }
}
