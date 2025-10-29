import Fastify from "fastify";
import websocketPlugin from "@fastify/websocket";
import { Connection, PublicKey } from "@solana/web3.js";

const fastify = Fastify();
fastify.register(websocketPlugin);

const connection = new Connection("https://api.devnet.solana.com");
const subscribers = new Map();

fastify.get("/ws", { websocket: true }, (connection, req) => {
  const socket = connection.socket;
  socket.on("message", async (msg) => {
    try {
      const { type, programId } = JSON.parse(msg.toString());
      if (type === "subscribe" && programId) {
        console.log("Subscribed to", programId);
        if (!subscribers.has(programId)) subscribers.set(programId, []);
        subscribers.get(programId).push(connection);

        const listener = connection._rpcWebSocket?.on
        // create an onLogs listener using RPC connection object
        const listenerId = connection.onLogs(new PublicKey(programId), (logs) => {
          const payload = JSON.stringify({ type: "tx", data: logs });
          const clients = subscribers.get(programId) || [];
          for (const c of clients) {
            try { c.socket.send(payload); } catch (e) {}
          }
        });

        socket.on("close", () => {
          try { connection.removeOnLogsListener(listenerId); } catch (e) {}
        });
      }
    } catch (e) {
      console.error("Invalid WS message", e);
    }
  });
});

fastify.listen({ port: 3001 }, (err) => {
  if (err) throw err;
  console.log("✅ Decasol Server running at http://localhost:3001");
});
