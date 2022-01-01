const https = require('https');

async function testSsl(host, ip, port) {
    return new Promise((resolve, reject) => {
        port = port || 443;
        let result = null;
        let hostName = port === 443 ? host : `${host}:${port}`;
        https
            .get(
                `https://${ip}:${port}`,
                {
                    headers: {
                        host: hostName,
                    },
                    servername: hostName,
                },
                (resp) => {
                    result = {
                        suc: true,
                        error: null,
                        errMsg: resp.statusMessage,
                        status: resp.statusCode,
                    };
                    resolve(result);
                }
            )
            .on('error', (error) => {
                result = {
                    suc: !!error?.response?.status,
                    error: error.code,
                    errMsg: error?.response?.status ? null : error + '',
                    status: error?.response?.status,
                };
                resolve(result);
            })
            .end();
    });
}

// uncomment to run the simple test 
//testSsl('incomplete-chain.badssl.com', '104.154.89.105').then((x) =>    console.log(x));

module.exports = {
    testSsl: testSsl,
};
