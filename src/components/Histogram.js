import React, { Component } from "react";
import PropTypes from "prop-types";
import { Motion, spring } from "react-motion";

export default class Histogram extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        x0: PropTypes.number,
        x: PropTypes.number,
        y: PropTypes.number
      })
    ).isRequired,
    selection: PropTypes.arrayOf(PropTypes.number).isRequired,
    barBorderRadius: PropTypes.number,
    bucketSize: PropTypes.number,
    width: PropTypes.number,
    innerWidth: PropTypes.number,
    height: PropTypes.number,
    showOnDrag: PropTypes.bool,
    reset: PropTypes.func,
    onChange: PropTypes.func
  };

  static defaultProps = {
    histogramPadding: 1
  };

  selectBucket = bucket => () => {
    const {onChange} = this.props;

    onChange([bucket.x0, bucket.x]);
  };

  renderSingleBar = (bucket, index) => {
    const {barBorderRadius, barPadding, barStyle, height, max, reset, scale, selectedColor, selection, unselectedColor} = this.props;
    const selectionSorted = Array.from(selection).sort((a, b) => +a - +b);
    let opacity = 0;

    if (selectionSorted[0] > bucket.x || selectionSorted[1] < bucket.x0) {
      opacity = 0;
    } else if (selectionSorted[0] <= bucket.x0 && selectionSorted[1] >= bucket.x) {
      // Entire block is covered
      opacity = 1;
    } else if (selectionSorted[0] > bucket.x0 && selectionSorted[1] > bucket.x) {
      opacity = 1 - (selectionSorted[0] - bucket.x0) / (bucket.x - bucket.x0);
      // Some of left block is covered
    } else if (selectionSorted[1] < bucket.x && selectionSorted[0] < bucket.x0) {
      // Some of right block is covered
      opacity = (selectionSorted[1] - bucket.x0) / (bucket.x - bucket.x0);
    } else {
      // Parital match
      opacity = (selectionSorted[1] - selectionSorted[0]) / (bucket.x - bucket.x0);
    }

    return (
      <g
        key={index}
        transform={`translate(${scale(bucket.x0) + barPadding / 2} 0)`}
      >
        <rect
          fill={unselectedColor}
          width={scale(bucket.x) - scale(bucket.x0) - barPadding}
          height={bucket.y / max * height}
          rx={barBorderRadius}
          ry={barBorderRadius}
          x={0}
        />
        <rect
          fill={selectedColor}
          onClick={this.selectBucket(bucket)}
          onDoubleClick={reset.bind(this)}
          style={Object.assign(
            { opacity, cursor: "pointer" },
            barStyle
          )}
          width={scale(bucket.x) - scale(bucket.x0) - barPadding}
          height={bucket.y / max * height}
          rx={barBorderRadius}
          ry={barBorderRadius}
          x={0}
        />
      </g>
    );
  };

  render() {
    const {
      height,
      data,
      histogramStyle,
      showOnDrag,
      padding,
      width,
      dragging
    } = this.props;
    const showHistogramPredicate = showOnDrag ? !!dragging : true;
    const h = showHistogramPredicate ? height : 0;
    const o = showHistogramPredicate ? 1 : 0;

    return (
      <Motion style={{ height: spring(h), opacity: spring(o) }}>
        {s => {
          return (
            <div
              style={Object.assign({}, s, {
                zIndex: 0,
                overflow: "hidden",
                position: showOnDrag && "absolute",
                bottom: showOnDrag && `calc(100% - ${padding}px)`
              })}
            >
              <svg
                style={Object.assign(
                  {
                    display: "block",
                    backgroundColor: "white"
                  },
                  histogramStyle
                )}
                width={width}
                height={height}
              >
                <g transform={`translate(0, ${height})`}>
                  <g transform="scale(1,-1)">
                    {data.map(this.renderSingleBar)}
                  </g>
                </g>
              </svg>
            </div>
          );
        }}
      </Motion>
    );
  }
}
