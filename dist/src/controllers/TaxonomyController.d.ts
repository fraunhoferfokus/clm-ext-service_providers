import { BaseModelController } from "clm-core";
import TaxonomyDAO from "../models/Taxonomy/TaxonomyDAO";
import TaxonomyFDTO from "../models/Taxonomy/TaxonomyFDTO";
import TaxonomyModel from "../models/Taxonomy/TaxonomyModel";
declare class TaxonomyController extends BaseModelController<typeof TaxonomyDAO, TaxonomyModel, TaxonomyFDTO> {
}
declare const controller: TaxonomyController;
export default controller;
