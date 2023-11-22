const { Generator } = require('@umijs/utils')
const path = require('path')
const kebabCase = require('kebab-case')

class ComponentGenerator extends Generator {
  constructor({ name, ...prop }) {
    super(prop)
    this.name = name
  }

  async writing() {
    const kebabCaseName = kebabCase(this.name).replace(/^\-/, '')
    this.copyDirectory({
      context: {
        name: this.name,
        kebabCaseName,
      },
      path: path.join(this.cwd, './templates/component'),
      target: path.join(this.cwd, `./packages/mobile/src/exports/${this.name}`),
    })
  }
}

module.exports = ComponentGenerator
