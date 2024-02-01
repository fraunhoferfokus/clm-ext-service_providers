import { BaseBackendDTO } from "clm-core";
import SPModel from "./SPModel";
/**
 * Backend DTO for relations. Based on {@link SPModel}
 * Instance provided by {@link spBDTOInstance}
 * Uses as default MariaAdapter
* @public
 */
export declare class SPBDTO extends BaseBackendDTO<SPModel> {
    createNewMetadaProvider(userId: string, username: string, password: string, baseUrl: string): Promise<[SPModel, boolean]>;
}
/**
 * @public
 * Instance of {@link SPBDTO}
 */
export declare const spBDTOInstance: SPBDTO;
