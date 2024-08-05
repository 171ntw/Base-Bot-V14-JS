import { ApplicationCommandType, EmbedBuilder } from "discord.js";
import ping from 'ping';

export default {
    name: "pingx",
    category: "testPing",
    description: "Veja meu ping atual..",
    type: ApplicationCommandType.ChatInput,

    run: async (client, interaction) => {
        await interaction.deferReply();

        const pingBot = client.ws.ping;

        const pingDiscordResult = await ping.promise.probe('discord.com');
        const pingDiscord = pingDiscordResult.time;

        const pingEmbed = new EmbedBuilder()
            .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
            .setTitle('Ping')
            .setColor('#000000')
            .setDescription(`Ei, ${interaction.user}\n> Atualmente esses são meus pings`)
            .addFields({ name: 'Ping Bot', value: `\`${pingBot} ms\``, inline: true })
            .addFields({ name: 'Ping Discord', value: `\`${pingDiscord} ms\``, inline: true })

        await interaction.editReply({ embeds: [pingEmbed] });
    }
}
