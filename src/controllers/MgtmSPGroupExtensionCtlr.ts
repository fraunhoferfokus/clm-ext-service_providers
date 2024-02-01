/* -----------------------------------------------------------------------------
 *  Copyright (c) 2023, Fraunhofer-Gesellschaft zur Förderung der angewandten Forschung e.V.
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published by
 *  the Free Software Foundation, version 3.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program. If not, see <https://www.gnu.org/licenses/>.  
 *
 *  No Patent Rights, Trademark Rights and/or other Intellectual Property
 *  Rights other than the rights under this license are granted.
 *  All other rights reserved.
 *
 *  For any other rights, a separate agreement needs to be closed.
 *
 *  For more information please contact:  
 *  Fraunhofer FOKUS
 *  Kaiserin-Augusta-Allee 31
 *  10589 Berlin, Germany
 *  https://www.fokus.fraunhofer.de/go/fame
 *  famecontact@fokus.fraunhofer.de
 * -----------------------------------------------------------------------------
 */
import express from 'express'
import { BaseExtensionCtrl, AuthGuard } from "clm-core"
import { spRelationBDTOInstance } from '../models/SPRelationBDTO'
// const dto = new RelationBackendDTO()

class MgtmSPGroupExtensionCtrl extends BaseExtensionCtrl {
    constructor() {
        super()
    }

    addServiceToGroup(): express.Handler {
        return async (req, res, next) => {
            try {
                await spRelationBDTOInstance.addServiceToGroup(req.params.id, req.params.serviceId)
                res.json({ message: "Succesfully added service to group!" })
            } catch (err) {
                console.log({ err })
                return next(err)
            }
        }
    }

    deleteServiceFromGroup(): express.Handler {
        return async (req, res, next) => {
            try {
                await spRelationBDTOInstance.deleteServiceFromGroup(req.params.id, req.params.serviceId)
                return res.json({ message: "Removed group from service!" })
            } catch (err) {
                return next(err)
            }
        }
    }





}

const controller = new MgtmSPGroupExtensionCtrl();
controller.router.use(AuthGuard.requireUserAuthentication())



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
controller.router.post('/:id/services/:serviceId', AuthGuard.permissionChecker('group', [{
    'in': 'path',
    'name': 'id',
}]), controller.addServiceToGroup())

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
controller.router.delete('/:id/services/:serviceId', AuthGuard.permissionChecker('service', [{
    in: 'path',
    name: 'id'
}]), controller.deleteServiceFromGroup())

export default controller