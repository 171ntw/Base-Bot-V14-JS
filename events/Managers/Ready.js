import { Events } from "discord.js";

export default {
    name: Events.ClientReady,

    run: async (client) => {
        console.clear();
        console.log(`\x1b[30m[GITHUB]\x1b[0m https://github.com/noahwx`)
        console.log(`\x1b[36m[SISTEMA]\x1b[0m Bot Iniciado com Sucesso!`)
    }
}