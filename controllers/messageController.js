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
                await client.sendText(`${number}@c.us`, msg);

                await client.sendText(`${number}@c.us`, 'A simple message with buttons', {
                    buttons: [
                        {
                            id: '1',
                            text: 'Opção 1'
                        },
                        {
                            id: '2',
                            text: 'Opção 2'
                        },
                        {
                            id: '3',
                            text: 'Opção 3'
                        }
                    ],
                    title: 'Teste botões', // Optional
                    footer: 'Descrição' // Optional
                });

                await client.close()

                res.json({
                    success: true,
                    message: "Enviado",
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
