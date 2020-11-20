const options = { targets : { node : 'current' } }

module.exports = function (wallaby){
  return {
    name: 'CodeSignal',
    filesWithNoCoverageCalculated: ['src/**/*.js'],
    runMode: 'onsave',
    files: [
      { pattern: 'rambda.js', load: false },
      { pattern: 'package.json', load: false },
      { pattern: 'katas/*.js', load: false },
      { pattern: '!src/**/*.js', load: false, instrument:false },
      { pattern: '!katas/**/*.spec.js', load: false },
    ],
    tests: [
      'katas/**/*.spec.js'
    ],
    compilers: {
      '**/*.js': wallaby.compilers.babel({
        presets : [ ['@babel/preset-env', options] ],
      })
    },
    workers: {
      reload: true,
      initial: 1,
      regular: 1
    },
    env: {
      type: 'node',
      params: {
        env: 'WALLABY=ON'
      }
    },
    testFramework: 'jest',
    debug: false,
  }
}