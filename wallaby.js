module.exports = function () {
  return {
    name: 'CodeSignal',
    filesWithNoCoverageCalculated: ['src/**/*.js'],
    runMode: 'onsave',
    autoDetect: true,
    env: {
      params: {
        env: 'WALLABY=ON'
      }
    }
  }
}