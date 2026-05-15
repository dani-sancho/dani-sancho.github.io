module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-coverage'),
      require('karma-spec-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        random: false,
        seed: null,
        stopSpecOnExpectationFailure: false,
        suppressErrors: false,
        stopOnSpecFailure: false,
        includeStackTrace: true
      },
      clearContext: false
    },
    jasmine: {
      reporter: 'spec',
      seed: null,
      random: false,
      stopSpecOnExpectationFailure: false,
      stopOnSpecFailure: false,
      suppressErrors: false,
      includeStackTrace: true
    },
    specReporter: {
      maxLogLines: 5,
      suppressError: false,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: false,
      showSpecTiming: false,
      FAIL: '\u001b[31mFAILED\u001b[0m',
      PASS: '\u001b[32mPASSED\u001b[0m',
      PENDING: '\u001b[33mPENDING\u001b[0m'
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/portfolio'),
      subdir: '.',
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcovonly', subdir: 'lcov' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['spec', 'progress'],
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-translate',
          '--disable-extensions'
        ]
      }
    },
    restartOnFileChange: true,
    singleRun: false
  });
};