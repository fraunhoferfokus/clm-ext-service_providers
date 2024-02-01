"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const clm_core_1 = require("clm-core");
const SPRelationBDTO_1 = require("../models/SPRelationBDTO");
// const dto = new RelationBackendDTO()
class MgtmSPGroupExtensionCtrl extends clm_core_1.BaseExtensionCtrl {
    constructor() {
        super();
    }
    addServiceToGroup() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield SPRelationBDTO_1.spRelationBDTOInstance.addServiceToGroup(req.params.id, req.params.serviceId);
                res.json({ message: "Succesfully added service to group!" });
            }
            catch (err) {
                console.log({ err });
                return next(err);
            }
        });
    }
    deleteServiceFromGroup() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield SPRelationBDTO_1.spRelationBDTOInstance.deleteServiceFromGroup(req.params.id, req.params.serviceId);
                return res.json({ message: "Removed group from service!" });
            }
            catch (err) {
                return next(err);
            }
        });
    }
}
const controller = new MgtmSPGroupExtensionCtrl();
controller.router.use(clm_core_1.AuthGuard.requireUserAuthentication());
/**
 * @openapi
 * /services/mgmt/groups/{id}/services/{serviceId}:
 *   post:
 *     tags:
 *       - mgmt-groups
 *       - mgmt-services
 *     summary: "Enroll a group to a service [Minimum role: 'Instructor']"
 *     description: Enrolls a specific group to a particular service using the respective identifiers.
 *     parameters:
 *       - $ref: '#/components/parameters/accessToken'
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: serviceId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully enrolled the group to the service.
 */
controller.router.post('/:id/services/:serviceId', clm_core_1.AuthGuard.permissionChecker('group', [{
        'in': 'path',
        'name': 'id',
    }]), controller.addServiceToGroup());
/**
 * @openapi
 * /services/mgmt/groups/{id}/services/{serviceId}:
 *   delete:
 *     tags:
 *      - mgmt-groups
 *      - mgmt-services
 *     summary: "Delete Enrollment [Minimum role: 'Instructor']"
 *     description: Removes a group's enrollment to a specific service, identified by its serviceId.
 *     parameters:
 *       - $ref: '#/components/parameters/accessToken'
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: serviceId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the group's enrollment to the service.
 */
controller.router.delete('/:id/services/:serviceId', clm_core_1.AuthGuard.permissionChecker('service', [{
        in: 'path',
        name: 'id'
    }]), controller.deleteServiceFromGroup());
exports.default = controller;
