import express from "express";
import { bootstrap } from "./bootstrap";
import { Server as SocketIOServer } from "socket.io";


export class Server {
  app: express.Application;
  router: express.Router;
  io: SocketIOServer;
  httpServer: any;
  API_PREFIX = "/api";


  async start() {
    
    await bootstrap().then(() => {
      console.log("Modules bootstrapped successfully");
    }).catch((error) => {
      console.error("Error bootstrapping modules:", error);
      process.exit(1);
    });

    const port = process.env.PORT || 5000;

    this.app.get("/health", (req, res) => {
      res.send("OK");
    });

    this.httpServer.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}
