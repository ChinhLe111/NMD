import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';
import logo from '../src/assets/images/logo.svg';
const theme = create({
  base: 'light',

  // Base color
  colorPrimary: '#45bc5a',

  // UI
  appBg: '#F6F9FC',
  appContentBg: '#FFFFFF',
  appBorderColor: 'rgba(0,0,0,.1)',
  appBorderRadius: 4,

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#333333',
  textInverseColor: '#FFFFFF',
  textMutedColor: '#666666',

  // Toolbar default and active colors
  barTextColor: '#999999',
  barSelectedColor: '#45bc5a',
  barBg: '#ffffff',

  // Form colors
  inputBg: '#FFFFFF',
  inputBorder: 'rgba(0,0,0,.3)',
  inputTextColor: '#333333',
  inputBorderRadius: 4,

  // Brand assets
  brandTitle: 'React',
  brandUrl: 'https://reactjs.org/',
  brandImage: logo,
});

addons.setConfig({
  theme: theme,
  showPanel: true, // show addons panel by default
  panelPosition: 'right', // position addons panel on the right by default
});
