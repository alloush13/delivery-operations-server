import { Server } from "./core/server";
import { Container } from "./core/container";

Container.singleton(Server, () => new Server());
const server = Container.resolve(Server);

server.start();

