import { readdir } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

export default {
    async run(client) {
        try {
            const __filename = fileURLToPath(import.meta.url);
            const __dirname = dirname(__filename);

            const eventDir = join(__dirname, '../../events');
            const folders = await readdir(eventDir);

            for (const folder of folders) {
                const folderPath = join(eventDir, folder);
                const eventFiles = await readdir(folderPath);

                for (const file of eventFiles) {
                    if (!file.endsWith('.js')) continue;

                    const filePath = join(folderPath, file);
                    const event = await import(`file://${filePath}`);

                    if (event.once) {
                        client.once(event.default.name, (...args) => event.default.run(...args, client));
                    } else {
                        client.on(event.default.name, (...args) => event.default.run(...args, client));
                    }
                }
            }
        } catch (err) {
            console.log('Vish, deu erro na EventManager.js', err);
        }
    }
}