import { readdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export default {
    async run(client) {
        try {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);

            const commandsDir = join(__dirname, '../../commands');
            const folders = await readdir(commandsDir);

            for (const folder of folders) {
                const folderPath = join(commandsDir, folder);
                const commandFiles = await readdir(folderPath);

                for (const file of commandFiles) {
                    if (!file.endsWith('.js')) continue;

                    const filePath = join(folderPath, file);
                    const command = await import(`file://${filePath}`);

                    if (!command.default?.name) continue;

                    client.slashCommands.set(command.default.name, command.default);
                }
            }

            client.on('ready', async () => {
                for (const guild of client.guilds.cache.values()) {
                    await guild.commands.set([...client.slashCommands.values()]);
                }
            });
        } catch (err) {
            console.error('Erro na commandSlash.js:', err);
        }
    }
}