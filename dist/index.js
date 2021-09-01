"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const alpaca_1 = require("@master-chief/alpaca");
const express_1 = __importDefault(require("./express"));
const client = new alpaca_1.AlpacaClient({
    credentials: {
        key: process.env.ALPACA_KEY_ID,
        secret: process.env.ALPACA_SECRET_KEY,
        paper: true
    },
    rate_limit: true
});
express_1.default.get("/", (_req, res) => {
    res.send("Atomax is functional!");
});
express_1.default.post("/webhook", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        if (data.secret !== process.env.SECRET) {
            return res.status(401).send("Unauthorized");
        }
        const account = yield client.getAccount();
        console.log(account);
        return res.status(200).json(account);
    }
    catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}));
//# sourceMappingURL=index.js.map