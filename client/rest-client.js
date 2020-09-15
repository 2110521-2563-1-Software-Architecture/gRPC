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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var moment_1 = __importDefault(require("moment"));
function random() {
    return (Math.floor(Math.random() * Math.floor(999999999)) + 1).toString();
}
var Client = /** @class */ (function () {
    function Client() {
        this.api = axios_1.default.create({
            baseURL: 'http://localhost:3000/book',
        });
    }
    Client.prototype.listBooks = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.api.get('/')];
            });
        });
    };
    Client.prototype.getBook = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.api.get("/" + id)];
            });
        });
    };
    Client.prototype.insertBook = function (book) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                console.log(book);
                return [2 /*return*/, this.api.post('/', book)];
            });
        });
    };
    Client.prototype.deleteBook = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.api.delete("/" + id)];
            });
        });
    };
    Client.prototype.insertBookList = function (bookList) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.api.post('/multiple', bookList)];
            });
        });
    };
    return Client;
}());
var scenario = process.argv[2];
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var client, start, end, start, bks, i, bk, end, ran1, ran2, ran3, start, insertB, getB, getBs, deleteB, toWait, end, response, i, start, toWait, c, end, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                client = new Client();
                if (!(scenario == 's1-1')) return [3 /*break*/, 2];
                start = moment_1.default();
                return [4 /*yield*/, client.insertBook({
                        id: process.argv[3],
                        title: process.argv[4],
                        author: process.argv[5],
                    })];
            case 1:
                _c.sent();
                end = moment_1.default();
                console.log('Request took: ' + end.diff(start) + ' ms.');
                return [3 /*break*/, 15];
            case 2:
                if (!(scenario == 's1-2')) return [3 /*break*/, 4];
                start = moment_1.default();
                bks = [];
                for (i = 1; i <= 10; i++) {
                    bk = {
                        id: random(),
                        title: process.argv[4],
                        author: process.argv[5],
                    };
                    bks.push(bk);
                }
                return [4 /*yield*/, client.insertBookList(bks)];
            case 3:
                _c.sent();
                end = moment_1.default();
                console.log('Request took: ' + end.diff(start) + ' ms.');
                return [3 /*break*/, 15];
            case 4:
                if (!(scenario == 's2')) return [3 /*break*/, 8];
                ran1 = random();
                ran2 = random();
                ran3 = random();
                return [4 /*yield*/, client.insertBook({ id: ran1, title: 'Jonh wick', author: 'Adam' })];
            case 5:
                _c.sent();
                return [4 /*yield*/, client.insertBook({ id: ran2, title: 'Jonh wick', author: 'Adam' })];
            case 6:
                _c.sent();
                start = moment_1.default();
                insertB = client.insertBook({ id: ran3, title: 'Jonh wick', author: 'Adam' });
                getB = client.getBook(ran1);
                getBs = client.listBooks();
                deleteB = client.deleteBook(ran2);
                toWait = [insertB, getBs, getB, deleteB];
                return [4 /*yield*/, Promise.all(toWait)];
            case 7:
                _c.sent();
                end = moment_1.default();
                console.log('Request took: ' + end.diff(start) + ' ms.');
                return [3 /*break*/, 15];
            case 8:
                if (!(scenario == 's3')) return [3 /*break*/, 13];
                response = [];
                i = 1;
                _c.label = 9;
            case 9:
                if (!(i <= 4096)) return [3 /*break*/, 12];
                console.log(i);
                start = moment_1.default();
                toWait = [];
                for (c = 1; c <= i; c++) {
                    toWait.push(client.listBooks());
                }
                return [4 /*yield*/, Promise.all(toWait)];
            case 10:
                _c.sent();
                end = moment_1.default();
                response.push(end.diff(start));
                _c.label = 11;
            case 11:
                i = i + 45;
                return [3 /*break*/, 9];
            case 12:
                console.log(response);
                return [3 /*break*/, 15];
            case 13:
                _b = (_a = console).log;
                return [4 /*yield*/, client.listBooks()];
            case 14:
                _b.apply(_a, [(_c.sent()).data]);
                _c.label = 15;
            case 15: return [2 /*return*/];
        }
    });
}); })();
