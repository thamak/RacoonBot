/// <reference path="globals/node/index.d.ts" />
/// <reference path="modules/winston/index.d.ts" />

// Load any json file in code (ES6 only)
declare module "*.json" {
    const value: any;
    export default value;
}