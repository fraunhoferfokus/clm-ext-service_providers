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

import { BaseDatamodel, iBaseDatamodel } from "clm-core";
/**
 * Subpayload of {@link iSPModel}
 * @public
 */
export enum ServiceType {
    /**
     * Learning Record Store
     */
    "LRS" = "LRS",
    /**
     * Generic ProviderF
     */
    "PROVIDER" = "PROVIDER",
    /**
     * Learning Object Repository
     */
    "METADATA" = "METADATA"
}

/**
 * Subpayload of {@link iSPModel}
 * @public
 */
export enum AuthType {
    /**
     * Bearer authentication
     */
    "BEARER" = "BEARER",
    /**
     * Basic authentication
     */
    "BASIC" = "BASIC"
}


/**
 * The payload which is passed to the constructor of {@link SPModel}
 * @public
 */
export interface iSPModel extends iBaseDatamodel {
    /**
     * The base url of the service
     */
    baseUrl: string
    /**
     * The username of the service
     */
    username: string
    /**
     * The password of the service
     */
    password: string
    /**
     * The token of the service
     */
    token?: string
    /**
     * The auth-type of the service
     */
    authType: AuthType
    /**
     * The type of the service
     */
    type: ServiceType
    /**
     * The display name of the service
     */
    displayName: string
    /**
     * The metadata-type of the service
     */
    metadataType?: ('LRMI' | 'LOM')

}

/**
 * @public
 * Service Provider datamodel which is used by {@link SPBDTO}
 */
export default class SPModel extends BaseDatamodel implements iSPModel {

    constructor(payload: iSPModel) {
        super(payload);
        this.type = payload.type
        this.baseUrl = payload.baseUrl
        this.username = payload.username
        this.password = payload.password
        this.authType = payload.authType
        this.displayName = payload.displayName
        this.token = payload.token
        this.metadataType = payload.metadataType
    }

    metadataType?: 'LRMI' | 'LOM' | undefined;
    type: ServiceType;
    baseUrl: string;
    username: string;
    password: string;
    token?: string;
    authType: AuthType;
    displayName: string;

}

