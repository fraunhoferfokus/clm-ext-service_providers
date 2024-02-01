import { BaseFrontendDTO, iBaseFrontendDTO } from "clm-core";
export declare enum ServiceType {
    "LRS" = "LRS",
    "PROVIDER" = "PROVIDER"
}
export declare enum AuthType {
    "BEARER" = "BEARER",
    "BASIC" = "BASIC"
}
interface iCouchSPFDTO extends iBaseFrontendDTO {
    baseUrl: string;
    username: string;
    password: string;
    token?: string;
    authType: AuthType;
    type: ServiceType;
    displayName: string;
    metadataType?: string;
}
export default class CouchSPFDTO extends BaseFrontendDTO implements iCouchSPFDTO {
    constructor(payload: iCouchSPFDTO);
    metadataType?: string;
    baseUrl: string;
    username: string;
    password: string;
    token?: string | undefined;
    authType: AuthType;
    type: ServiceType;
    displayName: string;
}
export {};
