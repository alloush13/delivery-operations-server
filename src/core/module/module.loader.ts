import { modules as modulesRegistry } from "./modules";


export const loadModules =  () => {
  const modules = modulesRegistry.map((ModuleClass) => {
    return new ModuleClass();
  });

  modules.forEach((module) => {
    module.register();
  });


  modules.forEach((module) => {
    module.boot();
  });
};