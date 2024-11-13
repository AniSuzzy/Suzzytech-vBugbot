const axios = require("axios");
const { G4F } = require("g4f");
let g4f = new G4F();
require("../../config");

module.exports = {
    type: 'openai',
    command: ['jinx-ai'],
    operate: async (context) => {
        const { sam, m, q, prefix, command, reply } = context;
        if (!q) return xreply(`*Example*:\n${prefix + command} Hello Suzzy?`);
        
        async function chat(prompt) {
            const messages = [
                { role: "system", content: `you are Suzzy ai` },
                { role: "assistant", content: `Hello Im Suzzy-Ai the most powerful ai.` },
                { role: "user", content: prompt }
            ];
            let res = await g4f.chatCompletion(messages);
            return res;
        }

        try {
            await m.reply(mess.wait);
            let response = await chat(q);
            await sam.sendMessage(m.chat, {
                text: response,
                contextInfo: {
                    externalAdReply: {
                        title: "Suzzy - 2024",
                        body: "By-k𝖎𝖓𝖌 𝑺𝒖𝒛𝒛𝒚",
                        thumbnailUrl: 'https://i.ibb.co/kXrN1hq/Profile.jpg',
                        thumbnail: { url: 'https://i.ibb.co/kXrN1hq/Profile.jpg' },
                        sourceUrl: 'https://whatsapp.com/channel/0029VafW1f44o7qD1ZwJWW3P',
                        previewType: "VIDEO",
                        showAdAttribution: true,
                        mediaType: 1,
                        renderLargerThumbnail: true
                    }
                }
            }, { quoted: m });
        } catch (error) {
            console.error(error);
            await m.reply("An error occurred while processing your request.");
        }
    }
};
