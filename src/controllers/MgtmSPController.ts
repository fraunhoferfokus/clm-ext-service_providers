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
import { createSPValidation, updateSPValidation } from '../validationSchemas/SPValidation';
import express from 'express'
import { BaseModelController, AuthGuard, relationBDTOInstance } from "clm-core";
import SPDAO from '../models/SPDAO'
import SPModel from '../models/SPModel';
import SPFDTO from '../models/SPFDTO'
class MgtmSPController extends BaseModelController<typeof SPDAO, SPModel, SPFDTO>{

    getSPRelations(): express.Handler {
        return async (req, res, next) => {
            try {
                let relations = (await relationBDTOInstance.findAll()).filter((item) => item.fromType === 'service')
                let userPermissions = req.requestingUser?.permissions
                if (!req.requestingUser?.isSuperAdmin) {
                    relations = relations
                        .filter((relation) => userPermissions![relation._id])
                }
                return res.json(relations)
            } catch (err) {
                next(err)
            }


        }
    }

    findAllDocuments(): express.Handler {
        return super.findAllDocuments(undefined, (docs) => {
            return (req, res, next) => {
                if (req.query.type) docs = docs.filter((doc) => doc.type === req.query.type)
                let userPermissions = req.requestingUser?.permissions!
                if (!req.requestingUser?.isSuperAdmin && req.requestingUser?.permissions) {
                    docs = docs.filter((doc) => userPermissions['services'][doc._id] >= req.minimumRoleStrength!)
                }

                return res.json(docs)
            }
        })
    }

    deleteOneDocument() {
        return super.deleteOneDocument(undefined, () => {
            return async (req, res, next) => {
                try {
                    const relations = (await relationBDTOInstance.findAll()).filter((item) => item.fromId === req.params.id || item.toId === req.params.id)
                    await relationBDTOInstance.bulkDelete(relations.map((relation) => ({ ...relation, _deleted: true }) as any))
                    return res.status(204).send()
                } catch (err) {
                    return next(err)
                }
            }
        })
    }

}
const controller = new MgtmSPController(SPDAO, SPModel, SPFDTO)
controller.router.use(AuthGuard.requireAdminUser())

/**
 * @openapi
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         baseUrl:
 *           type: string
 *           description: The base url of the service.
 *           example: "https://example.com/api/"
 *         username:
 *           type: string
 *           description: The username of the service.
 *           example: "adminUser"
 *         password:
 *           type: string
 *           description: The password of the service.
 *           format: password
 *         token:
 *           type: string
 *           description: The token of the service.
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         authType:
 *           type: string
 *           enum: ["BASIC", "BEARER", "OTHER"]
 *           description: The auth-type of the service.
 *         type:
 *           type: string
 *           enum: ["SERVICE_TYPE_1", "SERVICE_TYPE_2"] 
 *           description: The type of the service.
 *         displayName:
 *           type: string
 *           description: The display name of the service.
 *           example: "My Service"
 *         metadataType:
 *           type: string
 *           enum: ["LRMI", "LOM"]
 *           description: The metadata-type of the service.
 *           nullable: true
 */


/**
 * @openapi
 * /services/mgmt/services:
 *   get:
 *     tags:
 *       - mgmt-services
 *     summary: 'Retrieve all services the user has access to [Minimum Role: "Learner"]'
 *     description: Retrieve all services the user has access to through the group enrollments.
 *     parameters:
 *      - $ref: '#/components/parameters/accessToken'
 *     responses:
 *       200:
 *         description: Successfully retrieved all services
 *         content:
 *          application/json:
 *           schema:
 *              type: array
 *              items:
 *                  allOf:
 *                     - $ref: '#/components/schemas/Service'
 *                     - type: object
 *                       properties:
 *                          _id:
 *                              type: string
 *                              description: The id of the service.
 *                              example: "5f7b1a7b9b0b8a0017a7b1a7"            
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized 
 *   post:
 *     tags:
 *       - mgmt-services
 *     summary: 'Create a service [Minimum Role: "Admin"]'
 *     description: Create a service
 *     parameters:
 *      - $ref: '#/components/parameters/accessToken'
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                schema:
 *                  $ref: '#/components/schemas/Service'
 *     responses:
 *       200:
 *         description: Successfully created learning object
 *         content:
 *          application/json:
 *           schema:
 *              $ref: '#/components/schemas/Service'
 *       400:
 *         description: Bad request - Invalid input or validation error
 *       401:
 *         description: Unauthorized
 */
controller.router.get('/', AuthGuard.permissionChecker('service'))
controller.router.post('/', AuthGuard.permissionChecker('service'), createSPValidation)

/**
 * @openapi
 * /services/mgmt/services/relations:
 *   get:
 *     tags:
 *          - mgmt-services
 *     summary: "Get the relations from the services the user has access to [Minimum Role : 'Learner']"
 *     description: Retrieve relations between various services that the authenticated user has permissions to view.
 *     parameters:
 *       - $ref: '#/components/parameters/accessToken'
 *     responses:
 *       200:
 *         description: A list of relations between services.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/relation'
 */
controller.router.get('/relations', AuthGuard.permissionChecker('service'), controller.getSPRelations())

/**
 * @openapi
 * 
 * /services/mgmt/services/{id}:
 *   put:
 *     tags:
 *       - mgmt-services
 *     summary: 'Update an existing service [Minimum Role: "Instructor"]'
 *     description: Modify an existing service's attributes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     parameters:
 *       - $ref: '#/components/parameters/accessToken'
 *       - in: path
 *         name: id
 *         description: The id of the service
 *         required: true
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Successfully updated service
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       400:
 *         description: Bad request - Invalid input or validation error
 *       401:
 *         description: Unauthorized 
 * 
 *   patch:
 *     tags:
 *       - mgmt-services
 *     summary: 'Update an existing service [Minimum Role: "Instructor"]'
 *     description:  Modify an existing service's attribute
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Service'
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The id of the service
 *         required: true
 *         schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Successfully partially updated service
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Service'
 *       400:
 *         description: Bad request - Invalid input or validation error
 *       401:
 *         description: Unauthorized
 *   delete:
 *     tags:
 *       - mgmt-services
 *     summary: 'Deletes an existing service [Minimum Role: "Instructor"]'
 *     description:  Delete an existing service
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The id of the service
 *         required: true
 *         schema:
 *          type: string
 *     responses:
 *       204:
 *         description: Successfully deleted service
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized  
 */
controller.router.put('/:id', AuthGuard.permissionChecker('service'), updateSPValidation)
controller.router.patch('/:id', AuthGuard.permissionChecker('service'), updateSPValidation)
controller.router.delete('/:id', AuthGuard.permissionChecker('service'))


controller.activateStandardRouting()

export default controller;


