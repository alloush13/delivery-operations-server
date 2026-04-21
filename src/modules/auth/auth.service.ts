import bcrypt from "bcrypt";
import { AuthFactory } from "./auth.factory";
import { GuardRole } from "../../core/guards/roles.guard";
import { JwtService } from "../../core/services/jwt.service";

export default class AuthService {
  constructor(
    private readonly authFactory: AuthFactory,
    private readonly jwtService: JwtService,
  ) {}

  async register(data: any, role: GuardRole) {
    const strategy = this.authFactory.get(role);
    const user = await strategy.register(data);
    const token = this.jwtService.sign({
      id: user.id,
      role: role,
    });
    return {
      user,
      token,
    };
  }

  //   async login(email: string, password: string) {
  //     const user = await this.userService.findByEmail(email);
  //     if (!user) {
  //       throw new Error('User not found');
  //     }
  //     const isPasswordValid = await bcrypt.compare(password, user.password);
  //     if (!isPasswordValid) {
  //       throw new Error('Invalid password');
  //     }

  //     const token = this.generateToken({ id: user.id, email: user.email });
  //     return { token };
  //   }
}
