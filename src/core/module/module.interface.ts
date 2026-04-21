
export interface Module {
  register(): void;
  boot(): void;
}
export type ModuleClass = new () => Module;
