import { TechnicianStrategy } from './strategies/technician.strategy';
import { AdminStrategy } from './strategies/admin.strategy';
import { AuthStrategy } from './strategies/auth.strategy';
import { GuardRole } from '../../core/guards/roles.guard';

export class AuthFactory {
  private strategies: Record<GuardRole, AuthStrategy>;
  constructor(
    private readonly adminStrategy: AdminStrategy,
    private readonly technicianStrategy: TechnicianStrategy,
  ) {
    this.strategies = {
      technician: this.technicianStrategy,
      admin: this.adminStrategy,
    };
  }

  get(role: GuardRole): AuthStrategy {
    return this.strategies[role];
  }

  register(role: GuardRole, strategy: AuthStrategy) {
    (this.strategies as any)[role] = strategy;
  }
}
