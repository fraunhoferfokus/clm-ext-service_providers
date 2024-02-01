import express from 'express';
import { BaseModelController } from "clm-core";
import SPDAO from '../models/SPDAO';
import SPModel from '../models/SPModel';
import SPFDTO from '../models/SPFDTO';
declare class MgtmSPController extends BaseModelController<typeof SPDAO, SPModel, SPFDTO> {
    getSPRelations(): express.Handler;
    findAllDocuments(): express.Handler;
    deleteOneDocument(): express.Handler;
}
declare const controller: MgtmSPController;
export default controller;
