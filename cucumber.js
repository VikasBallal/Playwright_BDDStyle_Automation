let options = [
    '--require-module ts-node/register', //load TypeScript module
    '--require ./steps/*.ts',//load step defenitions
    '--format progress',//load custom formatter
    '--format json:./Reports/cucumber_report.json',
    '--publish-quiet'
].join(' ');

let run_features = [
    './features/', //specify your feature files
    options,
].join(' ');

module.exports = {
    test_runner: run_features,
};