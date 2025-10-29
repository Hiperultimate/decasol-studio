import { spawn } from "child_process";
import open from "open";
import { Command } from "commander";
import path from "path";

const program = new Command();

program
  .name("decasol")
  .description("Local Solana Program Testing Studio - CLI starter")
  .version("0.1.0");

program
  .command("start")
  .description("Start the Decasol Studio locally (dev mode)")
  .action(() => {
    const root = process.cwd();
    const server = spawn("bun", ["run", "dev"], { cwd: path.join(root, "..", "server"), stdio: "inherit" });
    const studio = spawn("bun", ["run", "dev"], { cwd: path.join(root, "..", "studio"), stdio: "inherit" });

    console.log("🚀 Decasol Studio is starting...");
    open("http://localhost:5173");

    process.on("SIGINT", () => {
      server.kill();
      studio.kill();
      process.exit();
    });
  });

program.parse(process.argv);
