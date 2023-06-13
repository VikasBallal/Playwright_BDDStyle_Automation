let appSettingProd = require('../data/prod/appdata');
let appSettingGE2 = require('../data/ge2/appdata');
let appSettingGE4 = require('../data/ge4/appdata');

let EnvironmentSpecifcData = {
    params: {}
};

switch (process.env.ENVTEST) {
    case 'GE4':
        EnvironmentSpecifcData.params = appSettingGE4
        break;
    case 'GE2':
        EnvironmentSpecifcData.params = appSettingGE2
        break;
    case 'PROD':
        EnvironmentSpecifcData.params = appSettingProd
        break;
    case 'PRODB':
        EnvironmentSpecifcData.params = appSettingProd
        break;
    default:
        break;
}
module.exports = EnvironmentSpecifcData;
