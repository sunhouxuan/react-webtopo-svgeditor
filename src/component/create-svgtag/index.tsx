import { connect } from "react-redux";
import { $CombinedState } from "redux";
import {
  IReduxState,
  IExtendAttr,
  IDoneData,
  ISelectSvgInfo,
} from "../../model";
import { SET_SELECT_SVG_INFO } from "../../store/actionTypes";
import React from "react";

const createSvgTag = (props: IProps) => {
  // console.log(props.state.done_svg_data, "完成数组");
  /**
   *
   * 递归处理嵌套组件
   * @param {IExtendAttr} ext
   * @return {*}
   */
  const slotJSX = (ext: IExtendAttr, id: string) => {
    const Tag: any = ext.tag;
    if (ext.children.length < 1) {
      return <Tag key={id} {...ext.value}>{ext.value.slots}</Tag>;
    } else {
      return (
        <Tag key={id} {...ext.value}>
          {ext.children.map((m, index) => {
            return slotJSX(m, id + index);
          })}
        </Tag>
      );
    }
  };
  const svgClick = (svg_info: IDoneData, e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const {id,position_x,position_y} = svg_info;
    props.changeSelectSvgInfo({
      id: id,
      m_position_x: clientX,
      m_position_y: clientY,
      m_status: 1,
      s_position_x:position_x,
      s_position_y:position_y
    });
  };
  //读取redux 完成数据列表渲染
  return (
    <>
      {props.state.done_svg_data.map((data) => {
        {
          const g_prop = {
            transform: `translate(${data.position_x}, ${data.position_y})rotate(${data.rotate})scale(${data.scale})`,
          };
          return (
            <g
              key={data.id}
              {...g_prop}
              style={{ cursor: "pointer" }}
              onMouseDown={(e) => {
                svgClick(data, e);
              }}
            >
              {data?.extend_attr?.map((m, index) =>
                slotJSX(m, data.id + index)
              )}
            </g>
          );
        }
      })}
    </>
  );
};
const mapStateToProps = (state: IReduxState) => {
  return {
    state,
  };
};
const mapDispatchToProps = (
  dispatch: (arg0: { type: string; payload: any }) => void
) => {
  return {
    changeSelectSvgInfo(select_svg_info: ISelectSvgInfo) {
      dispatch({
        type: SET_SELECT_SVG_INFO,
        payload: select_svg_info,
      });
    },
  };
};
interface IProps {
  state: IReduxState;
  changeSelectSvgInfo: (select_svg_info: ISelectSvgInfo) => void;
}
export default connect(mapStateToProps, mapDispatchToProps)(createSvgTag);
