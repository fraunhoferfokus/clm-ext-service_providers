import { BaseFrontendDTO, iBaseFrontendDTO } from "clm-core";
interface iTaxonomyFDTO extends iBaseFrontendDTO {
    displayName: string;
    taxonomies: {
        [key: string]: {
            [key: string]: {};
        };
    };
}
export default class TaxonomyFDTO extends BaseFrontendDTO implements iTaxonomyFDTO {
    constructor(payload: iTaxonomyFDTO);
    taxonomies: {
        [key: string]: {
            [key: string]: {};
        };
    };
    displayName: string;
}
export {};
