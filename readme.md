
**This microservice is based upon  [clm-core](https://github.com/fraunhoferfokus/clm-core) and extends the basic functionalities with additional features**


## CLM-EXT-SERVICE_PROVIDER

This service is utilized for managing service providers. In the CLM framework, service providers act as an abstraction layer. They are responsible for registering launchable tools with CLM and making these tools accessible to learners through enrollments. A single service provider can encompass a variety of launchable tools. The configuration of the service provider is transmitted to these tools, unless a tool has its own specific configuration defined.

## Requirements
- MariaDB, set up locally.
- Node.js 20.x

### Folder Structure
root

├── api-docs # Open API 3.0.0 definition as .yaml file documenting all routes and data models this service offers.

├── docs # Developer documentation of all functions, classes, interfaces, types this service exposes as an npm package.

├── dist # The built TypeScript project transpiled to JavaScript.

└── src # Business-relevant logic for this web server.

### Architecture
![Entit Relationship Model](assets/clm.EntityRelationshipdiagram.v1p0p0.svg)

The Entity Relationship Model of the Open Core is shown above.

The `clm-ext-service_provider` module includes the management of the following resources:


#### ServiceProvider
- Serves as a container for [tools](https://github.com/fraunhoferfokus/clm-ext-tools) to make general configurations available via them 
- Can be associated to [groups](https://github.com/fraunhoferfokus/clm-core)




This service functions as a web microservice that can be orchestrated through a gateway and as an npm package to provide functionalities to other CLM extensions. A microservice can build upon the classes/types/interfaces of this service to extend basic functionalities.


## Setup for testing the webserver 

1. npm install
2. Copy .env.default to .env and overwrite needed properties

Following table gives an overview of the settings you can change through the environment variables

| Name                 | Example                                                                         | Required (Yes/No) | Description                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| PORT                 | 3005                                                                            | Yes               | The port on which the service should be deployed.                                                                                     |
| DEPLOY_URL           | HOST_PROTOCOL://HOST_ADDRESS:GATEWAY_PORT/api                                   | Yes               | The address where all microservices are to be orchestrated. A /api must be appended.                                                  |
| MARIA_CONFIG         | MARIA_HOST_ADDRESS\|MARIA_PORT\|MARIA_DATABASE\|MARIA_USER\|MARIA_USER_PASSWORD | Yes               | A comma-separated string that must contain the configured parameters that were previously defined during the installation of MariaDB. |
| TOKEN_SECRET         | secret                                                                          | Yes               | to sign and verify JWTs for authentication. Have to be the same across all modules of the Open-Core                                   |
| DISABLE_ERR_RESPONSE | true                                                                            | No                | Flag to control whether error responses should be returned. Defaults to example value if not set.                                     |




3.1 `npm run dev` for development with nodemon
3.2 `npm start` for deployment

## For Consumption as an NPM Package

- Documentation about all exposed modules can be found under `/docs`.
- Include the package in your project's `package.json` dependencies:

    ```json
    "dependencies": {
        "clm-ext-service_providers": "git+https://$token:$token@$url_of_package#$branch_name"
    }
    ```

- To use database-dependent DAOs/DTOs, inject `MARIA_CONFIG` into the environment before importing the module:

    a) Manually in the code:

    ```javascript
    process.env.MARIA_CONFIG = "localhost|3306|clm|root|12345";
    import * as core from 'clm-ext-service_providers';
    ```

    b) Through `.env` file:

    ```.env
    MARIA_CONFIG=localhost|3306|clm|root|12345
    ```

    ```javascript
    import * as core from 'clm-ext-service_providers';
    ```


# Swagger Documentation

- Accessible routes for this microservice are available at `http://localhost:PORT/services/swagger` after starting the service.
- Ensure to set up a reverse proxy to route traffic to the respective microservices as shown in the table.


### Changelog

The changelog can be found in the [CHANGELOG.md](CHANGELOG.md) file.

## Get in touch with a developer

Please see the file [AUTHORS.md](AUTHORS.md) to get in touch with the authors of this project.
We will be happy to answer your questions at {clm@fokus.fraunhofer.de}

## License

The project is made available under the license in the file [license.txt](LICENSE.txt)

