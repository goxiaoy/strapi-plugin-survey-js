import React, { Component } from "react";
import * as SurveyJSCreator from "survey-creator";
import * as SurveyKo from "survey-knockout";
import "survey-creator/survey-creator.css";

import "jquery-ui/themes/base/all.css";
import "nouislider/distribute/nouislider.css";
import "select2/dist/css/select2.css";
import "bootstrap-slider/dist/css/bootstrap-slider.css";

import "jquery-bar-rating/dist/themes/css-stars.css";
import "jquery-bar-rating/dist/themes/fontawesome-stars.css";

import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker.js";
import "select2/dist/js/select2.js";
import "jquery-bar-rating";

//import "icheck/skins/square/blue.css";
import "pretty-checkbox/dist/pretty-checkbox.css";

import * as widgets from "surveyjs-widgets";

import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LoadingIndicatorPage, useGlobalContext, request } from 'strapi-helper-plugin';
import { getRequestUrl, getTrad } from '../../utils';

SurveyJSCreator.StylesManager.applyTheme("default");

//widgets.icheck(SurveyKo, $);
widgets.prettycheckbox(SurveyKo);
widgets.select2(SurveyKo, $);
widgets.inputmask(SurveyKo);
widgets.jquerybarrating(SurveyKo, $);
widgets.jqueryuidatepicker(SurveyKo, $);
widgets.nouislider(SurveyKo);
widgets.select2tagbox(SurveyKo, $);
//widgets.signaturepad(SurveyKo);
widgets.sortablejs(SurveyKo);
widgets.ckeditor(SurveyKo);
widgets.autocomplete(SurveyKo, $);
widgets.bootstrapslider(SurveyKo);


class SurveyCreator extends Component {
  surveyCreator;
  initialData;
  onChange;
  config;
  state = {
    license: false
  };
  abortController = new AbortController();

  constructor(props) {
    super(props);
    this.initialData = this.props.data;
    this.onChange = this.props.onChange;
  }

  async getSetting() {
    try {
      const { signal } = this.abortController;
      const { data } = await request(getRequestUrl('settings', { method: 'GET', signal }));

      this.setState({
        license: data.license
      });
      this.updateLicense(data.license);
    } catch (err) {
      console.error(err);
    }
  }

  updateLicense(license) {
    this.surveyCreator.haveCommercialLicense = license;
  }

  componentDidMount() {
    let options = { showEmbededSurveyTab: true, autoSave: true };
    this.surveyCreator = new SurveyJSCreator.SurveyCreator(
      null,
      options
    );
    this.surveyCreator.isAutoSave = true;
    this.surveyCreator.autoSaveDelay = 200;
    this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
    // this.surveyCreator.tabs().push({
    //   name: "survey-templates",
    //   title: "My Custom Tab",
    //   template: "custom-tab-survey-templates",
    //   action: () => {
    //       this.surveyCreator.makeNewViewActive("survey-templates");
    //   },
    //   data: this.initialData,
    // });
    this.surveyCreator.render("surveyCreatorContainer");
    // console.log(this.initialData);
    this.surveyCreator.text = this.initialData != null ? JSON.parse(this.initialData) : "";
    this.getSetting();
  }
  render() {
    return (<div>
      {/* <script type="text/html" id="custom-tab-survey-templates">
        {`<div id="test">TEST</div>`}
      </script> */}

      <div id="surveyCreatorContainer" />
    </div>);
  }
  saveMySurvey = () => {
    console.log(JSON.stringify(this.surveyCreator.text));
    console.log(this.surveyCreator.text);
    this.onChange(JSON.stringify(this.surveyCreator.text, null));
  };
}


const Editor = ({ onChange, name, value }) => {
  return (
    <SurveyCreator
      data={value}
      onChange={(data) => {
        onChange({ target: { name, value: data } });
      }}
    />
  );
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
};

export default Editor;