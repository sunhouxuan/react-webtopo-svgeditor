import React, { useState } from "react";
import indexless from "./index.module.less";
import { connect } from "react-redux";
import {
  IDoneData,
  IExtendAttr,
  IReduxState,
  ISelectSvgInfo,
  ITemplate,
} from "../../model";
import {
  PUSH_DONE_SVG,
  SET_DONE_SVG,
  SET_SELECT_SVG_INFO,
} from "./../../store/actionTypes";
import CreateSvgtag from "../create-svgtag";
import { ISvgComponentData } from "./../../model/index";
const CanvasMain = (props: IProps) => {
  const dropEvent = (e: React.DragEvent) => {
    {
      //判断要创建的组件
      const { create_svg_type, svg_component_infos } = props.state;
      //找到当前组件的信息
      const createinfo = svg_component_infos.find(
        (f) => f.type == create_svg_type
      );
      if (typeof createinfo === "undefined") {
        console.log("没有找到当前类型");
        return;
      }
      const { template } = createinfo;
      const getattr = (template: ITemplate[]) => {
        return template.map((m) => {
          const temp_val = Object.keys(m.props).map((key) => {
            return { [key]: (m.props as any)[key].val };
          });
          let temp = {};
          temp_val.forEach((f) => {
            temp = { ...temp, ...f };
          });
          if (m.children.length < 1) {
            const result: IExtendAttr = {
              tag: m.tag,
              value: temp,
              children: [],
            };
            return result;
          } else {
            const result: IExtendAttr = {
              tag: m.tag,
              value: temp,
              children: getattr(m.children),
            };
            return result;
          }
        });
      };
      //记录当前鼠标位置
      const { offsetX, offsetY } = e.nativeEvent;
      //将当前组件添加到绘制列表中
      const done_svg: IDoneData = {
        id: new Date().getTime().toString(),
        title: createinfo.title,
        type: create_svg_type,
        position_x: offsetX,
        position_y: offsetY,
        rotate: 0,
        scale: 1,
        extend_attr: getattr(template),
      };
      props.PushDoneSvg(done_svg);
    }
  };
  const MouseMoveEvent = (e: React.MouseEvent) => {
    //判断是否选中了组件
    if (
      props.state.select_svg_info.m_status != 1 ||
      !props.state.select_svg_info.id
    ) {
      //没选中组件不进行任何操作
      return;
    }
    const {done_svg_data}={...props.state};
    //找到当前组件的位置
    let select_svg = done_svg_data.find((f) => f.id === props.state.select_svg_info.id);
    if (select_svg == undefined) {
      return;
    }
    //取出选中时鼠标坐标
    let { m_position_x, m_position_y,s_position_x,s_position_y } = props.state.select_svg_info;
    const { clientX, clientY } = e;
    s_position_x += clientX - m_position_x;
    s_position_y += clientY - m_position_y;
    select_svg.position_x=s_position_x;
    select_svg.position_y=s_position_y;
    props.SetDoneSvg(done_svg_data);
  };
  const MouseUpEvent = (e: React.MouseEvent) => {
    props.changeSelectSvgInfo({
      id: props.state.select_svg_info.id,
      m_status: 0,
      m_position_x: 0,
      m_position_y: 0,
      s_position_x: 0,
      s_position_y: 0,
    });
  };
  return (
    <section
      className={indexless.warp}
      onDrop={(e) => dropEvent(e)}
      onDragEnter={(e) => {
        e.preventDefault();
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onMouseMove={(e) => MouseMoveEvent(e)}
      onMouseUp={(e) => MouseUpEvent(e)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        style={{ backgroundColor: "#000000" }}
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
      >
        <CreateSvgtag></CreateSvgtag>
      </svg>
    </section>
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
    PushDoneSvg(done_data: IDoneData) {
      console.log(done_data);
      dispatch({
        type: PUSH_DONE_SVG,
        payload: done_data,
      });
    },
    SetDoneSvg(done_list: IDoneData[]) {
      dispatch({
        type: SET_DONE_SVG,
        payload: done_list,
      });
    },
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
  PushDoneSvg: (done_data: IDoneData) => void;
  SetDoneSvg: (done_list: IDoneData[]) => void;
  changeSelectSvgInfo: (select_svg_info: ISelectSvgInfo) => void;
}
export default connect(mapStateToProps, mapDispatchToProps)(CanvasMain);
