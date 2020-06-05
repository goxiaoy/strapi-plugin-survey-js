import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import App from './containers/App';
import Initializer from './containers/Initializer';
import lifecycles from './lifecycles';
import trads from './translations';
import SurveyjsCreator from './components/SurveyCreator'
import Settings from './containers/Settings';
import { getTrad } from './utils';


export default strapi => {
  const pluginDescription = pluginPkg.strapi.description || pluginPkg.description;

  const plugin = {
    blockerComponent: null,
    blockerComponentProps: {},
    description: pluginDescription,
    icon: pluginPkg.strapi.icon,
    id: pluginId,
    initializer: Initializer,
    injectedComponents: [],
    isReady: false,
    isRequired: pluginPkg.strapi.required || false,
    layout: null,
    lifecycles,
    leftMenuLinks: [],
    leftMenuSections: [],
    mainComponent: App,
    name: pluginPkg.strapi.name,
    preventComponentRendering: false,
    settings: {
      global: [
        {
          title: {
            id: getTrad('plugin.name'),
            defaultMessage: 'SurveyJs',
          },
          name: 'survey-js',
          to: `${strapi.settingsBaseURL}/surveyjs`,
          Component: Settings,
        },
      ],
    },
    trads,
  };

  strapi.registerField({ type: 'survey', Component: SurveyjsCreator });

  return strapi.registerPlugin(plugin);
};
