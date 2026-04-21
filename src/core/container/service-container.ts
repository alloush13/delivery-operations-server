type Factory<T> = (container: ServiceContainer) => T;

type Constructor<T = any> = new (...args: any[]) => T;

type ServiceEntry<T = any> = {
  factory: Factory<T>;
  singleton: boolean;
  instance?: T;
};

export class ServiceContainer {
  private services = new Map<Constructor, ServiceEntry>();

  bind<T>(token: Constructor<T>, factory: Factory<T>) {
    this.services.set(token, {
      factory,
      singleton: false,
    });
  }

  singleton<T>(token: Constructor<T>, factory: Factory<T>) {
    this.services.set(token, {
      factory,
      singleton: true,
      instance: undefined,
    });
  }

  resolve<T>(token: Constructor<T>): T {
    const entry = this.services.get(token) as ServiceEntry<T> | undefined;

    if (!entry) {
      throw new Error(`Service not found: ${token.name}`);
    }

    if (entry.singleton && entry.instance) {
      return entry.instance;
    }

    const instance = entry.factory(this);

    if (entry.singleton) {
      entry.instance = instance;
    }

    return instance;
  }
}
export const Container = new ServiceContainer();