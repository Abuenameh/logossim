const basePrompts = require('../utils/basePrompts');
const { COMPONENTS_ROOT_DIR } = require('../utils/const');

const buttonGenerator = {
  description: 'A simple click/release component',
  prompts: basePrompts,
  actions: [
    {
      type: 'add',
      path: `${COMPONENTS_ROOT_DIR}/{{fileName name}}/{{fileName name}}Model.js`,
      templateFile: 'templates/Button/ButtonModel.hbs',
    },
    {
      type: 'add',
      path: `${COMPONENTS_ROOT_DIR}/{{fileName name}}/{{fileName name}}Widget.jsx`,
      templateFile: 'templates/Button/ButtonWidget.hbs',
    },
    {
      type: 'add',
      path: `${COMPONENTS_ROOT_DIR}/{{fileName name}}/{{fileName name}}Icon.jsx`,
      templateFile: 'templates/Button/ButtonIcon.hbs',
    },
    {
      type: 'add',
      path: `${COMPONENTS_ROOT_DIR}/{{fileName name}}/{{fileName name}}Register.js`,
      templateFile: 'templates/Button/ButtonRegister.hbs',
    },
  ],
};

module.exports = buttonGenerator;
