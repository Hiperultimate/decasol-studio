import { spawn } from "child_process";
import open from "open";
import { Command } from "commander";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const program = new Command();

program
  .name("decasol")
  .description("Local Solana Program Testing Studio - CLI starter")
  .version("0.1.0");

program
  .command("start")
  .description("Start the Decasol Studio locally (dev mode)")
  .action(() => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const cliDir = dirname(__dirname); // cli/
    // const serverDir = join(cliDir, "..", "server");
    const studioDir = join(cliDir, "..", "studio");
    // const server = spawn("bun", ["run", "dev"], { cwd: serverDir, stdio: "inherit" });
    const studio = spawn("bun", ["run", "start"], { cwd: studioDir, stdio: "inherit" });

    console.log("🚀 Decasol Studio is starting...");
    open("http://localhost:5173");

    process.on("SIGINT", () => {
      // server.kill();
      studio.kill();
      process.exit();
    });
  });

program.parse(process.argv);
