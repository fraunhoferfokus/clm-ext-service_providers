export declare const createSPValidation: import("express-validator").ValidationChain[] & {
    run: (req: import("express-validator/src/base").Request) => Promise<import("express-validator/src/chain").ResultWithContext[]>;
};
export declare const updateSPValidation: import("express-validator").ValidationChain[] & {
    run: (req: import("express-validator/src/base").Request) => Promise<import("express-validator/src/chain").ResultWithContext[]>;
};
