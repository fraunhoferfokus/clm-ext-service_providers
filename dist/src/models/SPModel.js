"use strict";
/* -----------------------------------------------------------------------------
 *  Copyright (c) 2023, Fraunhofer-Gesellschaft zur Förderung der angewandten Forschung e.V.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published by
 *  the Free Software Foundation, version 3.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program. If not, see <https://www.gnu.org/licenses/>.  
 *
 *  No Patent Rights, Trademark Rights and/or other Intellectual Property
 *  Rights other than the rights under this license are granted.
 *  All other rights reserved.
 *
 *  For any other rights, a separate agreement needs to be closed.
 *
 *  For more information please contact:  
 *  Fraunhofer FOKUS
 *  Kaiserin-Augusta-Allee 31
 *  10589 Berlin, Germany
 *  https://www.fokus.fraunhofer.de/go/fame
 *  famecontact@fokus.fraunhofer.de
 * -----------------------------------------------------------------------------
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthType = exports.ServiceType = void 0;
const clm_core_1 = require("clm-core");
/**
 * Subpayload of {@link iSPModel}
 * @public
 */
var ServiceType;
(function (ServiceType) {
    /**
     * Learning Record Store
     */
    ServiceType["LRS"] = "LRS";
    /**
     * Generic ProviderF
     */
    ServiceType["PROVIDER"] = "PROVIDER";
    /**
     * Learning Object Repository
     */
    ServiceType["METADATA"] = "METADATA";
})(ServiceType = exports.ServiceType || (exports.ServiceType = {}));
/**
 * Subpayload of {@link iSPModel}
 * @public
 */
var AuthType;
(function (AuthType) {
    /**
     * Bearer authentication
     */
    AuthType["BEARER"] = "BEARER";
    /**
     * Basic authentication
     */
    AuthType["BASIC"] = "BASIC";
})(AuthType = exports.AuthType || (exports.AuthType = {}));
/**
 * @public
 * Service Provider datamodel which is used by {@link SPBDTO}
 */
class SPModel extends clm_core_1.BaseDatamodel {
    constructor(payload) {
        super(payload);
        this.type = payload.type;
        this.baseUrl = payload.baseUrl;
        this.username = payload.username;
        this.password = payload.password;
        this.authType = payload.authType;
        this.displayName = payload.displayName;
        this.token = payload.token;
        this.metadataType = payload.metadataType;
    }
}
exports.default = SPModel;
