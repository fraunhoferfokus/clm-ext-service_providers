"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spRelationBDTOInstance = exports.spBDTOInstance = exports.SPModel = exports.SPRelationBDTO = exports.SPBDTO = exports.AuthType = exports.ServiceType = void 0;
const SPBDTO_1 = require("../models/SPBDTO");
Object.defineProperty(exports, "SPBDTO", { enumerable: true, get: function () { return SPBDTO_1.SPBDTO; } });
Object.defineProperty(exports, "spBDTOInstance", { enumerable: true, get: function () { return SPBDTO_1.spBDTOInstance; } });
const SPModel_1 = __importStar(require("../models/SPModel"));
exports.SPModel = SPModel_1.default;
Object.defineProperty(exports, "AuthType", { enumerable: true, get: function () { return SPModel_1.AuthType; } });
Object.defineProperty(exports, "ServiceType", { enumerable: true, get: function () { return SPModel_1.ServiceType; } });
const SPRelationBDTO_1 = require("../models/SPRelationBDTO");
Object.defineProperty(exports, "SPRelationBDTO", { enumerable: true, get: function () { return SPRelationBDTO_1.SPRelationBDTO; } });
Object.defineProperty(exports, "spRelationBDTOInstance", { enumerable: true, get: function () { return SPRelationBDTO_1.spRelationBDTOInstance; } });
