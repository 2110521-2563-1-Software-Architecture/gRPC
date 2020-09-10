"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.__esModule = true;
var axios_1 = require("axios");
var RestClient = /** @class */ (function () {
    function RestClient(host, port) {
        this.client = axios_1["default"].create({ baseURL: host + ":" + port });
    }
    RestClient.prototype.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            var books, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.client.get('/book')];
                    case 1: return [4 /*yield*/, (_a.sent()).data];
                    case 2:
                        books = _a.sent();
                        return [2 /*return*/, books];
                    case 3:
                        e_1 = _a.sent();
                        throw new Error('Cannot list book' + e_1.message);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RestClient.prototype.insert = function (book) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.client.post('/book/create', __assign({}, book))];
                    case 1: return [4 /*yield*/, (_a.sent())
                            .data];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 3:
                        e_2 = _a.sent();
                        throw new Error('Cannot insert book');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RestClient.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var book, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.client.get("/book/" + id)];
                    case 1: return [4 /*yield*/, (_a.sent()).data];
                    case 2:
                        book = _a.sent();
                        return [2 /*return*/, book];
                    case 3:
                        e_3 = _a.sent();
                        throw new Error('Cannot find book');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RestClient.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var res, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.client["delete"]("/book/" + id)];
                    case 1: return [4 /*yield*/, (_a.sent()).data];
                    case 2:
                        res = _a.sent();
                        return [2 /*return*/, res];
                    case 3:
                        e_4 = _a.sent();
                        throw new Error('Cannot delete book');
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return RestClient;
}());
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var processName, scriptName, command, restClient, _a, _b, _c, _d, _e, _f, _g, _h;
        return __generator(this, function (_j) {
            switch (_j.label) {
                case 0:
                    console.log("hoi");
                    processName = process.argv.shift();
                    scriptName = process.argv.shift();
                    command = process.argv.shift();
                    restClient = new RestClient('http://localhost', 3000);
                    if (!(command == 'list')) return [3 /*break*/, 2];
                    _b = (_a = console).log;
                    return [4 /*yield*/, restClient.list()];
                case 1:
                    _b.apply(_a, [_j.sent()]);
                    return [3 /*break*/, 8];
                case 2:
                    if (!(command == 'insert')) return [3 /*break*/, 4];
                    _d = (_c = console).log;
                    return [4 /*yield*/, restClient.insert({
                            id: +process.argv[0],
                            title: process.argv[1],
                            author: process.argv[2]
                        })];
                case 3:
                    _d.apply(_c, [_j.sent()]);
                    return [3 /*break*/, 8];
                case 4:
                    if (!(command == 'get')) return [3 /*break*/, 6];
                    _f = (_e = console).log;
                    return [4 /*yield*/, restClient.findById(+process.argv[0])];
                case 5:
                    _f.apply(_e, [_j.sent()]);
                    return [3 /*break*/, 8];
                case 6:
                    if (!(command == 'delete')) return [3 /*break*/, 8];
                    _h = (_g = console).log;
                    return [4 /*yield*/, restClient["delete"](+process.argv[0])];
                case 7:
                    _h.apply(_g, [_j.sent()]);
                    _j.label = 8;
                case 8: return [2 /*return*/];
            }
        });
    });
}
run();
