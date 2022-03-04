var ReactComponent = function (_a) {
  var text = _a.text;
  var formatMessage = useIntl().formatMessage;
  return (createElement(Typography, { sx: {
          margin: '.5em',
          padding: '.5em',
          border: '2px solid #000',
          textAlign: 'center'
      } },
      createElement(AutoAwesomeMotionOutlinedIcon, null),
      "Hello from the react world, ",
      text,
      ".",
      ' ',
      formatMessage({
          id: 'myTestTranslation',
          defaultMessage: 'Hello, this is a test translation'
      }),
      "."));
};

var plugin /*: PluginDescriptor */ = {
  id: 'org.craftercms.translatePlugin',
  name: 'Translate Plugin',
  description: 'A plugin to copy selected items by copying them to an other locale location',
  author: 'CrafterCMS',
  logo: null,
  locales: {
      en: en,
      es: es
  },
  apps: [
      {
          route: '/yada-yada',
          widget: { id: 'org.craftercms.translatePlugin.components.reactComponent' }
      }
  ],
  widgets: {
      'org.craftercms.translatePlugin.components.reactComponent': ReactComponent,
      'org.craftercms.translatePlugin.components.nonReactComponent': NonReactComponent
  },
  scripts: [
      {
          src: 'https://code.jquery.com/jquery-3.5.1.min.js',
          integrity: 'sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=',
          crossorigin: 'anonymous'
      },
      'script.js'
  ],
  stylesheets: ['index.css'],
  themes: []
};

export default plugin;
export { NonReactComponent, ReactComponent };