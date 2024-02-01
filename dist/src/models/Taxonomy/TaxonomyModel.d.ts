import { BaseDatamodel, iBaseDatamodel } from "clm-core";
interface iTaxonomyModel extends iBaseDatamodel {
    displayName: string;
    taxonomies: {
        [key: string]: {
            [key: string]: {};
        };
    };
}
export default class TaxonomyModel extends BaseDatamodel implements iTaxonomyModel {
    constructor(payload: iTaxonomyModel);
    taxonomies: {
        [key: string]: {
            [key: string]: {};
        };
    };
    displayName: string;
}
export {};
