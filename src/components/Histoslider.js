import React, { Component } from "react";
import {bool, func, number, string, object, shape, aeeayOf, arrayOf} from "prop-types";
import { max, min } from "d3-array";
import { scaleLinear as linear } from "d3-scale";

import Histogram from "./Histogram";
import Slider, {sliderPropTypes} from "./Slider";

const SLIDER_HEIGHT = 30;

export default class Histoslider extends Component {
  static propTypes = {
    ...sliderPropTypes,
    onChange: func.isRequired,
    selectedColor: string,
    unselectedColor: string,
    selection: arrayOf(number),
    barStyle: object,
    barBorderRadius: number,
    barPadding: number,
    histogramStyle: object,
    showOnDrag: bool,
    style: object,
    disableHistogram: bool
  };

  static defaultProps = {
    selectedColor: "#0074D9",
    unselectedColor: "#DDDDDD",
    showOnDrag: false,
    width: 400,
    height: 200,
    barBorderRadius: 2,
    barPadding: 3,
    padding: 20,
    sliderHeight: 25,
    handleLabelFormat: "0.3P"
  };

  constructor(props) {
    super(props);

    this.state = {
      dragging: false
    };
  }

  dragChange = dragging => {
    this.setState({ dragging });
  };

  onChange = selection => {
    const { data, onChange } = this.props;

    const sortedData = data.sort((a, b) => +a.x0 - +b.x0);
    const extent = [
      min(sortedData, ({ x0 }) => +x0),
      max(sortedData, ({ x }) => +x)
    ];
    onChange(selection.map(d => Math.max(extent[0], Math.min(extent[1], +d))));
  };

  reset = () => {
    const {onChange} = this.props;

    onChange(null);
  };

  render() {
    const {
      style,
      data,
      width,
      height,
      padding,
      selection,
      sliderHeight,
      disableHistogram
    } = this.props;
    const {dragging} = this.state;

    const innerHeight = height - padding * 2;
    const innerWidth = width - padding * 2;
    const histogramHeight = innerHeight - sliderHeight;

    const sortedData = data.sort((a, b) => +a.x0 - +b.x0);
    const extent = [
      min(sortedData, ({ x0 }) => +x0),
      max(sortedData, ({ x }) => +x)
    ];
    const maxValue = max(sortedData, ({ y }) => +y);
    const scale = linear().domain(extent).range([0, innerWidth]);
    scale.clamp(true);

    const selections = selection || extent;

    const overrides = {
      selection: selections,
      data: sortedData,
      scale,
      max: maxValue,
      dragChange: this.dragChange,
      onChange: this.onChange,
      reset: this.reset,
      width: innerWidth,
      dragging: dragging
    };

    return (
      <div
        style={Object.assign({}, style, {
          width,
          padding,
          boxSizing: "border-box",
          position: "relative"
        })}
        className="Histoslider Histoslider--wrapper"
      >
        {!disableHistogram &&
          <Histogram
            {...Object.assign({}, this.props, overrides, {
              height: histogramHeight
            })}
          />}
        <Slider
          {...Object.assign({}, this.props, overrides, {
            height: sliderHeight
          })}
        />
      </div>
    );
  }
}
