import { Layout, Breadcrumb } from "antd";
import indexless from "./index.module.less";
import "./index.css";
import React, { useState } from "react";
import LeftNav from "../left-nav";
import CanvasMain from "../canvas-main";
import store from "../../store";
import { Provider } from "react-redux";
//如果样式有问题 这个放到index.css里面去
import "antd/dist/antd.css";
import { ISvgDefaultJson } from "../../model";
import RightTool from "../right-tool";
import {
  CaretLeftOutlined,
  CaretRightOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
const SvgEdit = (props: IProps) => {
  const { Header, Content, Footer } = Layout;
  const { Sider } = Layout;
  //左侧导航栏收缩
  const [collapsed, setCollapsed] = useState({ left: false, right: false });
  const onCollapse = (
    type: number,
    collapsed: { left: boolean; right: boolean }
  ) => {
    console.log(type, collapsed);
    if (type === 1) {
      collapsed.left = !collapsed.left;
    } else {
      collapsed.right = !collapsed.right;
    }
    setCollapsed(collapsed);
  };
  return (
    <Provider store={store}>
      <Layout style={{ minHeight: "100vh" }}>
        <Header style={{ padding: 0, backgroundColor: "#fff" }}>
          <img
            title="基于vue3+ts+svg的web组件编辑器"
            style={{ width: "2rem", height: "2rem" }}
            src="/img/logo.svg"
          />
          <span>react-webtopo-svgeditor</span>
        </Header>
        <Layout>
          <Sider
            collapsible
            collapsed={collapsed.left}
            onCollapse={() => onCollapse(1, { ...collapsed })}
            className={indexless["site-layout"]}
            collapsedWidth="0"
            zeroWidthTriggerStyle={{
              top: "calc(50% - 64px)",
              backgroundColor: "transparent",
              color: "#000",
              width: 15,
              right: -15,
            }}
            trigger={
              collapsed.left ? <CaretRightOutlined /> : <CaretLeftOutlined />
            }
          >
            <LeftNav svg_default_json={props.svg_default_json}></LeftNav>
          </Sider>
          <Content style={{ margin: "0 16px" }}>
            <CanvasMain></CanvasMain>
          </Content>
          <Sider
            collapsible
            collapsed={collapsed.right}
            onCollapse={() => onCollapse(2, { ...collapsed })}
            className={indexless["site-layout"]}
            collapsedWidth="0"
            zeroWidthTriggerStyle={{
              top: "calc(50% - 64px)",
              backgroundColor: "transparent",
              color: "#000",
              width: 15,
              left: -18,
            }}
            trigger={
              collapsed.right ? <CaretLeftOutlined /> : <CaretRightOutlined />
            }
            reverseArrow
          >
            <RightTool></RightTool>
          </Sider>
        </Layout>
        <Footer style={{ textAlign: "center" }}>
          Copyright (c) 2022 咬轮猫
        </Footer>
      </Layout>
    </Provider>
  );
};
interface IProps {
  svg_default_json: ISvgDefaultJson;
}
export default SvgEdit;
