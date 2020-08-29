/*
 *
 * HomePage
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';

import Editor from '../../components/SurveyCreator';

const HomePage = () => {
  return (
    <div>
      <Editor onChange={()=>{}} name = "playground" />
    </div>
  );
};

export default memo(HomePage);
