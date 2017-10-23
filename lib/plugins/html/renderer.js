'use strict';

const pug = require('pug'),
  path = require('path');

const basePath = path.resolve(__dirname, 'templates');

const templateCache = {};

function cache(templateName, templatePath) {
  const filename = templatePath;
  const renderedTemplate = pug.compileFile(filename);

  templateCache[templateName] = renderedTemplate;
  return renderedTemplate;
}

function getTemplate(templateName) {
  if (!templateName.endsWith('.pug')) templateName = templateName + '.pug';

  const template = templateCache[templateName];
  if (template) {
    return template;
  }

  return cache(templateName, path.resolve(basePath, templateName));
}

module.exports = {
  renderTemplate(templateName, locals) {
    return getTemplate(templateName)(locals);
  },
  cacheTemplate(templateName, templatePath) {
    return cache(templateName, templatePath);
  }
};
