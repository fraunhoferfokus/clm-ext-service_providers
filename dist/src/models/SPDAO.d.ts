import { BaseDAO } from "clm-core";
import SPModel from "./SPModel";
declare class SPDAO extends BaseDAO<SPModel> {
    deleteById(id: string): Promise<boolean | void>;
}
declare const _default: SPDAO;
export default _default;
