require("../../config");

module.exports = {
    type: 'convert',
    command: ['textmaker'],
    operate: async (context) => {
        const { sam, m, q, prefix, command, reaction, sleep, reply, toTelegra, quoted } = context;
        
        if (!q) {
            await reply(`Add input, Example: *${prefix + command} Text*`);
            await reaction(m.chat, "❗");
            return;
        }
        
        let [peenis, pepekk] = q.split("|");
        pepekk = pepekk ? pepekk : " ";

/*        if (!peenis || !pepekk) {
            await reply(`Invalid input. Ensure you have both top and bottom text separated by '|'. Example: *${prefix + command} teks atas|teks bawah*`);
            await reaction(m.chat, "❗");
            return;
        }*/

        try {
            let dwnld = await sam.downloadAndSaveMediaMessage(quoted)
            let Bjirka = await toTelegra(dwnld);
            let smeme = `https://api.memegen.link/images/custom/${encodeURIComponent(peenis)}/${encodeURIComponent(pepekk)}.png?background=${Bjirka}`;

            await reaction(m.chat, "🪄");
//            await sleep(1500)
            await sam.sendMessage(m.chat, {
                image: { url: smeme },
                caption: '© Suzzy - 2024'
            }, { quoted: m });

            await reaction(m.chat, "🦄");
        } catch (error) {
            console.error('Error:', error);
            await reply('Failed to generate meme. Please try again later.');
            await reaction(m.chat, "❌");
        }
    }
}
