import { BaseDatamodel, iBaseDatamodel } from "clm-core";
/**
 * Subpayload of {@link iSPModel}
 * @public
 */
export declare enum ServiceType {
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
export declare enum AuthType {
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
    baseUrl: string;
    /**
     * The username of the service
     */
    username: string;
    /**
     * The password of the service
     */
    password: string;
    /**
     * The token of the service
     */
    token?: string;
    /**
     * The auth-type of the service
     */
    authType: AuthType;
    /**
     * The type of the service
     */
    type: ServiceType;
    /**
     * The display name of the service
     */
    displayName: string;
    /**
     * The metadata-type of the service
     */
    metadataType?: ('LRMI' | 'LOM');
}
/**
 * @public
 * Service Provider datamodel which is used by {@link SPBDTO}
 */
export default class SPModel extends BaseDatamodel implements iSPModel {
    constructor(payload: iSPModel);
    metadataType?: 'LRMI' | 'LOM' | undefined;
    type: ServiceType;
    baseUrl: string;
    username: string;
    password: string;
    token?: string;
    authType: AuthType;
    displayName: string;
}
