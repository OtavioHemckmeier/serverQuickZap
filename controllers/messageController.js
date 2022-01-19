const wppconnect = require('@wppconnect-team/wppconnect');

const sendMessage = async (req, res) => {
    try {
        const {msg, token, number} = req.body

        wppconnect
            .create({
                session: 'sessionName',
                tokenStore: {
                    getToken: (sessionName) =>
                        new Promise((resolve, reject) => {
                            resolve(token);
                        }),
                    setToken: (sessionName, tokenData) =>
                        new Promise((resolve) => {
                            return resolve(true);
                        }),
                    removeToken: (sessionName) =>
                        new Promise((resolve) => {
                            return resolve(true);
                        }),
                    listTokens: () =>
                        new Promise((resolve) => {
                            return resolve([]);
                        }),
                },
                catchQR: (base64Qr, asciiQR) => {
                    res.json({
                        success: false,
                        message: "Sessão não esta mais ativa.",
                    });
                },
                logQR: false,
            })
            .then(async (client) => {
                const device = await client.getHostDevice()
                const dataPicture = await client.getProfilePicFromServer(device.wid._serialized)

                await client.sendText(`${number}@c.us`, msg);

                // await client.sendText('554799828278@c.us', 'A simple message with buttons', {
                //     buttons: [
                //         {
                //             id: 'your custom id 1',
                //             text: 'Some text'
                //         },
                //         {
                //             id: 'another id 2',
                //             text: 'Another text'
                //         }
                //     ],
                //     title: 'Title text', // Optional
                //     footer: 'Footer text' // Optional
                // });

                await client.close()

                res.json({
                    success: true,
                    message: "Conseguiu",
                });

            })
            .catch((error) => {
                res.json({
                    success: false,
                    message: "Ocorreu um erro ao conectar!"
                });
            });

    } catch (error) {
        console.log("Error with adding message: ", error);
        return res.json({
            success: false,
            message: "Error with adding message.",
        });
    }
};

module.exports = {
    sendMessage
};
