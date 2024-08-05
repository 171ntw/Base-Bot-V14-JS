import { Events, InteractionType } from "discord.js";

export default {
    name: Events.InteractionCreate,

    run: async (interaction, client) => {
        if (interaction.type == InteractionType.ApplicationCommand) {
            const command = client.slashCommands.get(interaction.commandName);
            if (!command) return;

            if (interaction.guild) {
                interaction.member = interaction.guild.members.cache.get(interaction.user.id);
            }

            try {
                await command.run(client, interaction);
            } catch (err) {
                console.error(`Erro ao executar o comando ${interaction.commandName}:`, err);
            }
        }

        if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
            const command = client.slashCommands.get(interaction.commandName);

            if (!command || !command.autocomplete) return;

            try {
                await command.autocomplete(client, interaction);
            } catch (err) {
                console.error(`Erro ao executar o autocomplete para o comando ${interaction.commandName}:`, err);
            }
        }
    }
}