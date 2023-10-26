const crypto = require('crypto');

const apiKey = "4bzrNwxsQn2x7kKDfS3utn";
const apiSecret = "wyX0/y7vo/qq39REOD4KGwI007F3OH2cH5n/4nfx";

const jwtBody = {
    "uid": apiKey,
    "exp": Math.floor(new Date().getTime() / 1000) + 600,
    "iat": Math.floor(new Date().getTime() / 1000)
};

const jwtToken = generateJWT(jwtBody, apiSecret);

console.log('JWT Token:', jwtToken);

function generateJWT(body, secret) {
    const header = {
        "alg": "HS256",
        "typ": "JWT"
    };

    const token = [];
    token[0] = base64url(JSON.stringify(header));
    token[1] = base64url(JSON.stringify(body));
    token[2] = genTokenSign(token, secret);

    return token.join(".");
}

function genTokenSign(token, secret) {
    if (token.length != 2) {
        return;
    }

    const hash = crypto.createHmac('sha256', secret)
                    .update(token.join("."))
                    .digest('base64');

    return urlConvertBase64(hash);
}

function base64url(input) {
    const base64String = Buffer.from(input).toString('base64');
    return urlConvertBase64(base64String);
}

function urlConvertBase64(input) {
    let output = input.replace(/=+$/, '');
    output = output.replace(/\+/g, '-');
    output = output.replace(/\//g, '_');

    return output;
}
