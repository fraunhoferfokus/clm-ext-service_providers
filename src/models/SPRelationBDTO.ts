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

import { relationBDTOInstance, groupBDTOInstance, RelationModel } from "clm-core"
// import CouchRelationModel from 'microservice-core/dist/src/models/Relation/CouchRelationModel'



import SPDAO from './SPDAO'

/**
 * Backend DTO for sp-relations. Based on {@link https://gitlab.fokus.fraunhofer.de/learning-technologies/clm-framework/clm-core/-/blob/dev/docs/clm-core.relationmodel.md|RelationModel} 
* @public 
 * The instance of {@link spRelationBDTOInstance} is provided.
 * Uses as default {@link https://gitlab.fokus.fraunhofer.de/learning-technologies/clm-framework/clm-core/-/blob/dev/docs/clm-core.mariaadapter.md|MariaAdapter} 
 */
export class SPRelationBDTO {

    /**
     * Adds a service to a group
     * @param groupId - Id of the group
     * @param spId - Id of the service
     * @returns 
     */
    addServiceToGroup(groupId: string, spId: string) {
        return Promise.all([groupBDTOInstance.findById(groupId), SPDAO.findById(spId)])
            .then(([group, sp]) =>
                Promise.all([
                    relationBDTOInstance.createRelationship(new RelationModel({ fromId: groupId, fromType: 'group', toId: spId, toType: 'service' }), true),
                    // relationBDTOInstance.createRelationship(new RelationModel({ fromId: spId, fromType: 'service', toId: groupId, toType: 'group' }), true),
                ])
            )
    }

    /**
     * Deletes a service from a group
     * @param groupId - Id of the group
     * @param spId - Id of the service
     * @returns 
     */
    async deleteServiceFromGroup(groupId: string, spId: string) {
        await Promise.all([SPDAO.findById(spId), groupBDTOInstance.findById(groupId)])
        const relations = await relationBDTOInstance.findAll()
        const groupHasService = relations.find((item) => item.fromId === groupId && item.toId === spId
            && item.fromType === 'group' && item.toType === 'service'
        )
        // const serviceHasGroup = relations.find((item) => item.fromId === spId && item.toId === groupId
        //     && item.fromType === 'service' && item.toType === 'group'
        // )
        return relationBDTOInstance.bulkDelete([
            { ...groupHasService, _deleted: true } as any,
            // { ...serviceHasGroup, _deleted: true } as any
        ])
    }

    /**
     * Gets all services of a user
     * @param userId - Id of the user
     * @returns 
     */
    async getUsersServices(userId: string) {
        try {
            const [relations, recursiveUserGroups, sps] = await Promise.all([relationBDTOInstance.findAll(),
            relationBDTOInstance.getUsersGroups(userId), SPDAO.findAll()])
            const recursiveGroupsIds = [...new Set(recursiveUserGroups.map((group) => group._id))]

            const userHasServices = relations.filter((relation) =>
                (relation.fromId === userId && relation.toType === 'service')
                ||
                (
                    recursiveGroupsIds.includes(relation.fromId) && relation.toType === 'service')
            )

            const userHasServicesId = userHasServices.map((relation) => relation.toId)
            return sps.filter((sp) => userHasServicesId.includes(sp._id))
        } catch (err) {
            throw err
        }

    }







}

/**
 * @public
 * Instance of {@link SPRelationBDTO}
 */
export const spRelationBDTOInstance = new SPRelationBDTO()


