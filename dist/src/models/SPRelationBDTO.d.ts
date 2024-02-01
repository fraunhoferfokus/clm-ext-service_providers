/**
 * Backend DTO for sp-relations. Based on {@link https://gitlab.fokus.fraunhofer.de/learning-technologies/clm-framework/clm-core/-/blob/dev/docs/clm-core.relationmodel.md|RelationModel}
* @public
 * The instance of {@link spRelationBDTOInstance} is provided.
 * Uses as default {@link https://gitlab.fokus.fraunhofer.de/learning-technologies/clm-framework/clm-core/-/blob/dev/docs/clm-core.mariaadapter.md|MariaAdapter}
 */
export declare class SPRelationBDTO {
    /**
     * Adds a service to a group
     * @param groupId - Id of the group
     * @param spId - Id of the service
     * @returns
     */
    addServiceToGroup(groupId: string, spId: string): Promise<[boolean]>;
    /**
     * Deletes a service from a group
     * @param groupId - Id of the group
     * @param spId - Id of the service
     * @returns
     */
    deleteServiceFromGroup(groupId: string, spId: string): Promise<boolean>;
    /**
     * Gets all services of a user
     * @param userId - Id of the user
     * @returns
     */
    getUsersServices(userId: string): Promise<import("./SPModel").default[]>;
}
/**
 * @public
 * Instance of {@link SPRelationBDTO}
 */
export declare const spRelationBDTOInstance: SPRelationBDTO;
