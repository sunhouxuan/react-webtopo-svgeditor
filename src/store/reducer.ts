import { IReduxState } from "../model";
import {
  SET_CREATE_SVG_TYPE,
  PUSH_DONE_SVG,
  PUSH_SVG_COMPONENT_INFOS,
  SET_SELECT_SVG_INFO,
  SET_DONE_SVG,
} from "./actionTypes";
const default_state: IReduxState = {
  svg_component_infos: [],
  create_svg_type: "",
  done_svg_data: [],
  select_svg_info: {
    id: "",
    m_position_x: 0,
    m_position_y: 0,
    m_status: 0,
    s_position_x: 0,
    s_position_y: 0,
  },
};
const reducer = (
  state = default_state,
  action: { type: string; payload: any }
) => {
  let newState: IReduxState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case SET_CREATE_SVG_TYPE:
      newState.create_svg_type = action.payload;
      return newState;
    case PUSH_SVG_COMPONENT_INFOS:
      newState.svg_component_infos.push(action.payload);
      return newState;
    case PUSH_DONE_SVG:
      newState.done_svg_data.push(action.payload);
      return newState;
    case SET_SELECT_SVG_INFO:
      newState.select_svg_info = { ...action.payload };
      return newState;
    case SET_DONE_SVG:
      newState.done_svg_data = [...action.payload];
      return newState;
    default:
      return state;
  }
};
export default reducer;
