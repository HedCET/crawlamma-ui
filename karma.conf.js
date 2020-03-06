module.exports = i => {
  const config = {
    autoWatch: true,
    basePath: "",
    browsers: ["Chrome"],
    client: {
      clearContext: false
    },
    colors: true,
    coverageIstanbulReporter: {
      dir: require("path").join(__dirname, "./coverage/twitter-bot-ui"),
      fixWebpackSourcePaths: true,
      reports: ["html", "lcovonly", "text-summary"]
    },
    frameworks: ["@angular-devkit/build-angular", "jasmine"],
    logLevel: i.LOG_INFO,
    plugins: [
      require("@angular-devkit/build-angular/plugins/karma"),
      require("karma-chrome-launcher"),
      require("karma-coverage-istanbul-reporter"),
      require("karma-jasmine"),
      require("karma-jasmine-html-reporter")
    ],
    port: 9876,
    reporters: ["kjhtml", "progress"],
    restartOnFileChange: true,
    singleRun: false
  };

  if (process.env.TRAVIS) {
    config.browsers = ["Chrome_Travis_CI"];
    config.customLaunchers = {
      Chrome_Travis_CI: {
        base: "Chrome",
        flags: ["--no-sandbox"]
      }
    };
  }

  i.set(config);
};
