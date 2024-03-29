"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRandomString = void 0;
const crypto_1 = require("crypto");
const createRandomString = (length) => {
    return (0, crypto_1.randomBytes)(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
};
exports.createRandomString = createRandomString;
//# sourceMappingURL=index.js.map