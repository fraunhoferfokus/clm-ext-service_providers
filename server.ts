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
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import { AuthGuard, errHandler, pathBDTOInstance } from "clm-core"
import EntryPointCtrl from './src/controllers/EntryPointCtrl'
import SPDAO from './src/models/SPDAO'
import TaxonomyDAO from './src/models/Taxonomy/TaxonomyDAO'

const basePath = process.env.BASE_PATH || '/services'
const app = express()
const PORT = process.env.PORT
console.log(basePath)
const ECLUDED_PATHS: string[] = [
    '/health',
    `${basePath}/swagger`,
]

app.use(function (req, res, next) {
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token, x-token-renewed, x-api-key'
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    );
    next();
});

app.use(cors())
app.use(express.json())

app.get('/health', (req, res) => {
    res.send('OK')
})

app.use(AuthGuard.requireAPIToken(ECLUDED_PATHS))

app.use('/', EntryPointCtrl)
app.use(basePath, EntryPointCtrl)

app.use(errHandler)

Promise.all([
    pathBDTOInstance.registerRoutes(app, ECLUDED_PATHS),
]).then(() => {
    app.listen(PORT, () => {
        console.log("Service Providers Service is running on port " + PORT)
    })
}).catch(err => console.log(err))


