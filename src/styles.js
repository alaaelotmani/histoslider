import {
  geyser,
  gray,
  lightGrey,
  limeade,
  pickledBluewood,
  white
} from "./colors";
import styled from "styled-components";

export const HistoSliderWrapper = styled.div({
  display: "flex",
  flexShrink: 0,
  flexDirection: "column"
});

export const HistoSliderContainer = styled.div({
  backgroundColor: white
});

export const CheckboxLine = styled.div({
  backgroundColor: white,
  display: "flex",
  borderBottom: `1px solid ${lightGrey}`
});

export const CheckboxCell = styled.div({
  display: "flex",
  flex: 1,
  marginTop: "5px"
});

export const Label = styled.label({
  display: "inline-block",
  margin: "0 25px 0 0",
  padding: "10px 20px",
  textAlign: "justify",
  verticalAlign: "middle",
  width: "calc(100% - 65px)"
});

export const TotalProducts = styled.span({
  fontSize: 12,
  color: gray
});

export const InitButton = styled.span({
  border: `1px solid ${geyser}`,
  borderRadius: 3,
  display: "flex",
  alignSelf: "right"
});

const widthCheckbox = 25;
const buttonWidth = 15;

export const Checkbox = styled.input({
  position: "relative",

  "&::before": {
    backgroundColor: white,
    border: `1px solid ${geyser}`,
    borderRadius: 3,
    content: '""',
    display: "block",
    height: widthCheckbox,
    left: -widthCheckbox / 5,
    position: "absolute",
    top: -buttonWidth / 5,
    width: widthCheckbox
  },

  "&:checked": {
    "&::after": {
      borderBottom: `4px solid ${limeade}`,
      borderLeft: `4px solid ${limeade}`,
      content: '""',
      display: "block",
      height: 10,
      left: 4 - widthCheckbox / 5,
      position: "absolute",
      top: 6 - buttonWidth / 5,
      transform: "rotate(-45deg)",
      width: 16
    }
  }
});

export const HeaderWrapper = styled.div({
  display: "flex",
  flexShrink: 0,
  flexDirection: "column",
  textAlign: "center"
});

export const HistoSliderTitle = styled.span({
  backgroundColor: pickledBluewood,
  borderRadius: 3,
  color: "white",
  fontFamily: "Arial",
  fontSize: 16,
  height: "20px",
  textAlign: "center",
  textOverflow: "ellipsis"
});
