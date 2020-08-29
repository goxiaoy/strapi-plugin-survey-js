import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import App from './containers/App';
import Initializer from './containers/Initializer';
import lifecycles from './lifecycles';
import trads from './translations';
import SurveyjsCreator from './components/SurveyCreator'
import Settings from './containers/Settings';
import {
  getTrad
} from './utils';


export default strapi => {
  const pluginDescription = pluginPkg.strapi.description || pluginPkg.description;
  const icon = pluginPkg.strapi.icon;
  const name = pluginPkg.strapi.name;
  const plugin = {
    blockerComponent: null,
    blockerComponentProps: {},
    description: pluginDescription,
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
    preventComponentRendering: false,
    settings: {
      global: {
        links: [{
          title: {
            id: getTrad('plugin.name'),
            defaultMessage: 'SurveyJs',
          },
          name: 'survey-js',
          to: `${strapi.settingsBaseURL}/surveyjs`,
          Component: Settings,
          // Bool : https://reacttraining.com/react-router/web/api/Route/exact-bool
          exact: false
        }, ],
      }
    },
    menu: {
      pluginsSectionLinks: [
        {
          destination: `/plugins/${pluginId}`,
          icon,
          label: {
            id: `${pluginId}.plugin.name`,
            defaultMessage: name,
          },
          name,
          permissions: [
            // Uncomment to set the permissions of the plugin here
            // {
            //   action: '', // the action name should be plugins::plugin-name.actionType
            //   subject: null,
            // },
          ],
        },
      ],
    },
    trads,
    icon,
    name
  };

  strapi.registerField({
    type: 'survey',
    Component: SurveyjsCreator
  });

  return strapi.registerPlugin(plugin);
};