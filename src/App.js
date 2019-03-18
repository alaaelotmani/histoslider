import React, { Component } from "react";
import {
  Checkbox,
  CheckboxCell,
  CheckboxLine,
  HistoSliderContainer,
  HistoSliderTitle,
  HistoSliderWrapper,
  Label,
  TotalProducts,
  HeaderWrapper
} from "./styles.js";
import { blueBayoux, silver } from "./colors";
import { histoSliderData } from "./mocked-data";
import Histoslider from "histoslider";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sliderSelection: null,
      checkBoxSelection: histoSliderData
    };
  }

  handleSliderChange = selectionArray => {
    this.setState({ sliderSelection: selectionArray });
    this.updateCheckBoxes(selectionArray);
  };

  updateCheckBoxes = selectionArray => {
    const updatedSelection = histoSliderData;

    updatedSelection.forEach(element => {
      if (element.x >= selectionArray[0] && element.x <= selectionArray[1]) {
        element.checked = true;
      } else {
        element.checked = false;
      }
    });
    this.setState({ checkBoxSelection: updatedSelection });
  };

  handleCheckboxChange = () => {};

  InitSelection = () => {};

  renderHistoslider = data => {
    const { sliderSelection } = this.state;
    return (
      <HistoSliderWrapper>
        <HistoSliderTitle>Histoslider Demo</HistoSliderTitle>
        <Histoslider
          data={data}
          onChange={this.handleSliderChange}
          selection={sliderSelection}
          width={window.outerWidth}
          padding={50}
          barPadding={0}
          selectedColor={blueBayoux}
          unselectedColor={silver}
          handleLabelFormat=".0f"
        />
      </HistoSliderWrapper>
    );
  };

  renderLine = item => (
    <CheckboxLine key={item.key}>
      <Label>
        {item.label} <TotalProducts>({item.y})</TotalProducts>
      </Label>
      <CheckboxCell>
        <Checkbox
          readOnly
          id={item.key}
          type="checkbox"
          checked={item.checked}
          onChange={this.handleCheckboxChange()}
        />
      </CheckboxCell>
    </CheckboxLine>
  );

  render() {
    const { checkBoxSelection } = this.state;
    return (
      <HistoSliderContainer>
        {this.renderHistoslider(histoSliderData)}
        <HeaderWrapper>
          <HistoSliderTitle>Prix</HistoSliderTitle>
        </HeaderWrapper>
        {checkBoxSelection.map(line => this.renderLine(line))}
      </HistoSliderContainer>
    );
  }
}

export default App;
