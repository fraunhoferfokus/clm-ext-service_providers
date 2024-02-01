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
import MgtmSPController from './MgtmSPController'
import MgtmSPGroupExtensionCtrl from './MgtmSPGroupExtensionCtlr'
import TaxonomyController from './TaxonomyController'
import swaggerJsdoc from 'swagger-jsdoc'
/**
 * @openapi
 * components:
 *   schemas:
 *     relation:
 *       type: object
 *       properties:
 *         fromType:
 *           type: string
 *           description: The type of the node
 *           default: fromTypeNode
 *         toType:
 *           type: string
 *           description: The type of the target node
 *           default: toTypeNode
 *         fromId:
 *           type: string
 *           description: The id of the node
 *           default: fromNodeId
 *         toId:
 *           type: string
 *           description: The id of the target node
 *           default: toNodeId
 *         order:
 *           type: number
 *           description: The order of the relation. Used for example ordering the enrollments of a group/user
 *           default: 0
 *   parameters:
 *     accessToken:
 *       name: x-access-token
 *       in: header
 *       description: The access token
 *       required: true
 *       example: exampleAccessToken
 *       schema:
 *         type: string
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *     refreshAuth:
 *       type: apiKey
 *       in: header
 *       name: x-refresh-token
 */
const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CLM-EXT-Services API',
            version: '1.0.0',
            description: 'API endpoints the clm-ext-services module offers',
        },
        servers: [
            {
                "url": "{scheme}://{hostname}:{port}{path}",
                "description": "The production API server",
                "variables": {
                    "hostname": {
                        "default": "localhost",
                    },
                    "port": {
                        "default": `${process.env.PORT}`
                    },
                    "path": {
                        "default": ""
                    },
                    "scheme": {
                        "default": "http",
                    }
                }
            }
        ],
        security: [{
            bearerAuth: [],
        }]
    },
    apis: [
        './src/controllers/*.ts'
    ]
}

const swaggerSpecification = swaggerJsdoc(options)
const router = express.Router()
router.get('/swagger', (req, res) => {
    return res.json(swaggerSpecification)
})
router.use('/mgmt/services', MgtmSPController.router)
router.use('/mgmt/groups', MgtmSPGroupExtensionCtrl.router)
router.use('/mgmt/taxonomies', TaxonomyController.router)


export default router