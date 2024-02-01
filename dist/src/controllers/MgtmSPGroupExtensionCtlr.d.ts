import express from 'express';
import { BaseExtensionCtrl } from "clm-core";
declare class MgtmSPGroupExtensionCtrl extends BaseExtensionCtrl {
    constructor();
    addServiceToGroup(): express.Handler;
    deleteServiceFromGroup(): express.Handler;
}
declare const controller: MgtmSPGroupExtensionCtrl;
export default controller;
