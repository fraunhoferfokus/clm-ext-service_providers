import { BaseBackendDTO } from "clm-core";
import SPModel from "./SPModel";
/**
 * Backend DTO for relations. Based on {@link SPModel}
 * Instance provided by {@link spBDTOInstance}
 * Uses as default MariaAdapter
* @public
 */
export declare class SPBDTO extends BaseBackendDTO<SPModel> {
    createNewMetadaProvider(username: string, password: string, baseUrl: string, displayName: string, _id?: string): Promise<SPModel>;
}
/**
 * @public
 * Instance of {@link SPBDTO}
 */
export declare const spBDTOInstance: SPBDTO;
