import React, { useEffect, useState } from "react";
import { Layout, Menu, Collapse, message } from "antd";
import { WindowsOutlined } from "@ant-design/icons";
import indexless from "./index.module.less";
import { connect } from "react-redux";
import {
  SET_CREATE_SVG_TYPE,
  PUSH_SVG_COMPONENT_INFOS,
} from "../../store/actionTypes";
import { IReduxState, ISvgComponentData, ISvgDefaultJson } from "../../model";

/**
 *左侧工具栏
 *
 * @param {*} props
 * @return {*}
 */
const LeftNav = (props: IProps) => {
  const { Panel } = Collapse;
  const dragStartEvent = (
    leftImgItem: ISvgComponentData,
    e: React.DragEvent
  ) => {
    //设置要创建的svg组件信息
    props.changeCreateSvgType(leftImgItem.type);

    // console.log(e);
  };
  const dragEndEvent = (leftImgItem: ISvgComponentData, e: React.DragEvent) => {
    //拖动时记录拖动的svg信息
    if (e.dataTransfer?.dropEffect !== "copy") {
      message.error("请将组件拖到画布中!");
      //清空已选择的信息
      // console.log("setCreatSvgInfo", {});
      return;
    }
  };
  return (
    <>
      <Collapse accordion>
        {Object.keys(props?.svg_default_json)?.map((key) => (
          <Panel header={key} key={key}>
            <ul className={indexless.leftImgUl}>
              {props.svg_default_json[key].map((m) => {
                useEffect(() => {
                  props.pushSvgCompontentInfos(m);
                }, []);
                return (
                  <li key={m.type}>
                    <img
                      src={m.priview_img}
                      draggable="true"
                      onDragStart={(e) => dragStartEvent(m, e)}
                      onDragEnd={(e) => dragEndEvent(m, e)}
                    />
                  </li>
                );
              })}
            </ul>
          </Panel>
        ))}
      </Collapse>
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
    changeCreateSvgType(type: string) {
      dispatch({
        type: SET_CREATE_SVG_TYPE,
        payload: type,
      });
    },

    /**
     *
     * 所有组件的初始信息增加项
     * @param {ISvgComponentData} svgComponentData
     */
    pushSvgCompontentInfos(svgComponentData: ISvgComponentData) {
      dispatch({
        type: PUSH_SVG_COMPONENT_INFOS,
        payload: svgComponentData,
      });
    },
  };
};
interface IProps {
  changeCreateSvgType: (type: string) => void;
  pushSvgCompontentInfos: (svgComponentData: ISvgComponentData) => void;
  svg_default_json: ISvgDefaultJson;
  state: IReduxState;
}
//connect方法接受两个参数：mapStateToProps和mapDispatchToProps，没有则传null
export default connect(mapStateToProps, mapDispatchToProps)(LeftNav);
