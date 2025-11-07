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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const SPValidation_1 = require("../validationSchemas/SPValidation");
const clm_core_1 = require("clm-core");
const SPDAO_1 = __importDefault(require("../models/SPDAO"));
const SPModel_1 = __importDefault(require("../models/SPModel"));
const SPFDTO_1 = __importDefault(require("../models/SPFDTO"));
class MgtmSPController extends clm_core_1.BaseModelController {
    getSPRelations() {
        return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                let relations = (yield clm_core_1.relationBDTOInstance.findAll()).filter((item) => item.fromType === 'service');
                let userPermissions = (_a = req.requestingUser) === null || _a === void 0 ? void 0 : _a.permissions;
                if (!((_b = req.requestingUser) === null || _b === void 0 ? void 0 : _b.isSuperAdmin)) {
                    relations = relations
                        .filter((relation) => userPermissions[relation._id]);
                }
                return res.json(relations);
            }
            catch (err) {
                next(err);
            }
        });
    }
    // findAllDocuments(): express.Handler {
    //     return super.findAllDocuments(undefined, (docs) => {
    //         return (req, res, next) => {
    //             if (req.query.type) docs = docs.filter((doc) => doc.type === req.query.type)
    //             let userPermissions = req.requestingUser?.permissions!
    //             if (!req.requestingUser?.isSuperAdmin && req.requestingUser?.permissions) {
    //                 docs = docs.filter((doc) => userPermissions[doc._id] >= req.minimumRoleStrength!)
    //             }
    //             return res.json(docs)
    //         }
    //     })
    // }
    deleteOneDocument() {
        return super.deleteOneDocument(undefined, () => {
            return (req, res, next) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const relations = (yield clm_core_1.relationBDTOInstance.findAll()).filter((item) => item.fromId === req.params.id || item.toId === req.params.id);
                    yield clm_core_1.relationBDTOInstance.bulkDelete(relations.map((relation) => (Object.assign(Object.assign({}, relation), { _deleted: true }))));
                    return res.status(204).send();
                }
                catch (err) {
                    return next(err);
                }
            });
        });
    }
}
const controller = new MgtmSPController(SPDAO_1.default, SPModel_1.default, SPFDTO_1.default);
// controller.router.use(AuthGuard.requireAdminUser())
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
controller.router.get('/', clm_core_1.AuthGuard.permissionChecker('service'));
controller.router.post('/', clm_core_1.AuthGuard.permissionChecker('service'), SPValidation_1.createSPValidation);
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
controller.router.get('/relations', clm_core_1.AuthGuard.permissionChecker('service'), controller.getSPRelations());
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
controller.router.put('/:id', clm_core_1.AuthGuard.permissionChecker('service'), SPValidation_1.updateSPValidation);
controller.router.patch('/:id', clm_core_1.AuthGuard.permissionChecker('service'), SPValidation_1.updateSPValidation);
controller.router.delete('/:id', clm_core_1.AuthGuard.permissionChecker('service'));
controller.activateStandardRouting();
exports.default = controller;
