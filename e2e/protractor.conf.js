const { SpecReporter } = require('jasmine-spec-reporter');

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  baseUrl: 'http://localhost:4200',
  capabilities: {
    'browserName': 'chrome'
  },
  directConnect: true,
  framework: 'jasmine',
  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
    print() {},
    showColors: true,
  },
  onPrepare() {
    require('ts-node')
      .register({ project: require('path').join(__dirname, './tsconfig.json') });

    jasmine.getEnv()
      .addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
  },
  specs: [
    './src/**/*.e2e-spec.ts'
  ],
};