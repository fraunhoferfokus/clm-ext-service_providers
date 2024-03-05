"use strict";
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
exports.spRelationBDTOInstance = exports.SPRelationBDTO = void 0;
const clm_core_1 = require("clm-core");
// import CouchRelationModel from 'microservice-core/dist/src/models/Relation/CouchRelationModel'
const SPDAO_1 = __importDefault(require("./SPDAO"));
/**
 * Backend DTO for sp-relations. Based on {@link https://gitlab.fokus.fraunhofer.de/learning-technologies/clm-framework/clm-core/-/blob/dev/docs/clm-core.relationmodel.md|RelationModel}
* @public
 * The instance of {@link spRelationBDTOInstance} is provided.
 * Uses as default {@link https://gitlab.fokus.fraunhofer.de/learning-technologies/clm-framework/clm-core/-/blob/dev/docs/clm-core.mariaadapter.md|MariaAdapter}
 */
class SPRelationBDTO {
    /**
     * Adds a service to a group
     * @param groupId - Id of the group
     * @param spId - Id of the service
     * @returns
     */
    addServiceToGroup(groupId, spId) {
        return Promise.all([clm_core_1.groupBDTOInstance.findById(groupId), SPDAO_1.default.findById(spId)])
            .then(([group, sp]) => Promise.all([
            clm_core_1.relationBDTOInstance.createRelationship(new clm_core_1.RelationModel({ fromId: groupId, fromType: 'group', toId: spId, toType: 'service' }), true),
            // relationBDTOInstance.createRelationship(new RelationModel({ fromId: spId, fromType: 'service', toId: groupId, toType: 'group' }), true),
        ]));
    }
    /**
     * Deletes a service from a group
     * @param groupId - Id of the group
     * @param spId - Id of the service
     * @returns
     */
    deleteServiceFromGroup(groupId, spId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([SPDAO_1.default.findById(spId), clm_core_1.groupBDTOInstance.findById(groupId)]);
            const relations = yield clm_core_1.relationBDTOInstance.findAll();
            const groupHasService = relations.find((item) => item.fromId === groupId && item.toId === spId
                && item.fromType === 'group' && item.toType === 'service');
            // const serviceHasGroup = relations.find((item) => item.fromId === spId && item.toId === groupId
            //     && item.fromType === 'service' && item.toType === 'group'
            // )
            return clm_core_1.relationBDTOInstance.bulkDelete([
                Object.assign(Object.assign({}, groupHasService), { _deleted: true }),
                // { ...serviceHasGroup, _deleted: true } as any
            ]);
        });
    }
    /**
     * Gets all services of a user
     * @param userId - Id of the user
     * @returns
     */
    getUsersServices(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [relations, recursiveUserGroups, sps] = yield Promise.all([clm_core_1.relationBDTOInstance.findAll(),
                    clm_core_1.relationBDTOInstance.getUsersGroups(userId), SPDAO_1.default.findAll()]);
                const recursiveGroupsIds = [...new Set(recursiveUserGroups.map((group) => group._id))];
                const userHasServices = relations.filter((relation) => (relation.fromId === userId && relation.toType === 'service')
                    ||
                        (recursiveGroupsIds.includes(relation.fromId) && relation.toType === 'service'));
                const userHasServicesId = userHasServices.map((relation) => relation.toId);
                return sps.filter((sp) => userHasServicesId.includes(sp._id));
            }
            catch (err) {
                throw err;
            }
        });
    }
}
exports.SPRelationBDTO = SPRelationBDTO;
/**
 * @public
 * Instance of {@link SPRelationBDTO}
 */
exports.spRelationBDTOInstance = new SPRelationBDTO();
