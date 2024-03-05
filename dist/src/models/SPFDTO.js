"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthType = exports.ServiceType = void 0;
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
const clm_core_1 = require("clm-core");
var ServiceType;
(function (ServiceType) {
    ServiceType["LRS"] = "LRS";
    ServiceType["PROVIDER"] = "PROVIDER";
})(ServiceType || (exports.ServiceType = ServiceType = {}));
var AuthType;
(function (AuthType) {
    AuthType["BEARER"] = "BEARER";
    AuthType["BASIC"] = "BASIC";
})(AuthType || (exports.AuthType = AuthType = {}));
class CouchSPFDTO extends clm_core_1.BaseFrontendDTO {
    constructor(payload) {
        super(payload);
        this.baseUrl = payload.baseUrl;
        this.username = payload.username;
        this.password = payload.password;
        this.authType = payload.authType;
        this.type = payload.type;
        this.displayName = payload.displayName;
        this.metadataType = payload.metadataType;
    }
}
exports.default = CouchSPFDTO;
