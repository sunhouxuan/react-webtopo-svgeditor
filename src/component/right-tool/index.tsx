import { Divider, Form, Input, InputNumber, Radio, Select } from "antd";
import { connect } from "react-redux";
import { IDoneData, IReduxState } from "../../model";
import { SET_DONE_SVG } from "../../store/actionTypes";
import indexless from "./index.module.less";
import { useEffect, useState } from "react";
const { Option } = Select;
const RightTool = (props: IProps) => {
  const [svg_component_title, setComponentTitle] = useState("请先选择组件");
  const { select_svg_info, done_svg_data, svg_component_infos } = {
    ...props.state,
  };
  //从绘制好的组件列表中找到当前选中组件的数据
  const done_svg = done_svg_data.find((f) => f.id === select_svg_info.id);
  const find_svg_component_info = svg_component_infos.find(
    (f) => f.type === done_svg?.type
  );
  useEffect(() => {
    if (find_svg_component_info !== undefined) {
      setComponentTitle(find_svg_component_info.title);
    }
  }, [find_svg_component_info?.title]);
  const InputChangeEvent = <T extends keyof IDoneData>(
    property: T,
    val: IDoneData[T]
  ) => {
    if (done_svg == undefined) {
      return;
    }
    done_svg[property] = val;
    props.SetDoneSvg(done_svg_data);
  };
  const Ext_InputChangeEvent = <T extends keyof { [key: string]: any }>(
    property: T,
    val: any,
    index: number
  ) => {
    if (done_svg == undefined) {
      return;
    }
    done_svg.extend_attr[index].value[property] = val;
    props.SetDoneSvg(done_svg_data);
  };
  return (
    <>
      <div className={indexless["head-title"]}>{svg_component_title}</div>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 20 }}
        labelAlign="left"
        style={{ marginLeft: "15px" }}
      >
        <Form.Item label="ID">
          <span>{done_svg?.id}</span>
        </Form.Item>
        <Form.Item label="类型">
          <span>{done_svg?.type}</span>
        </Form.Item>
        <Form.Item label="名称">
          <Input
            placeholder="请输入名称"
            value={done_svg?.title}
            onChange={(e) => InputChangeEvent("title", e.target.value)}
          />
        </Form.Item>
        <Form.Item label="x轴坐标">
          <InputNumber
            min={0}
            defaultValue={0}
            value={done_svg?.position_x}
            onChange={(val) => InputChangeEvent("position_x", val)}
          />
        </Form.Item>
        <Form.Item label="y轴坐标">
          <InputNumber
            min={0}
            defaultValue={0}
            value={done_svg?.position_y}
            onChange={(val) => InputChangeEvent("position_y", val)}
          />
        </Form.Item>
        <Form.Item label="大小">
          <InputNumber
            min={0}
            defaultValue={0}
            value={done_svg?.scale}
            onChange={(val) => InputChangeEvent("scale", val)}
          />
        </Form.Item>
        <Form.Item label="旋转">
          <InputNumber
            min={0}
            defaultValue={0}
            value={done_svg?.rotate}
            onChange={(val) => InputChangeEvent("rotate", val)}
          />
        </Form.Item>
        {find_svg_component_info?.template.map((m, index) => {
          return Object.keys(m.props).map((prop_key) => {
            if (!m.props[prop_key].edit) {
              return;
            }
            let Temp: any;
            if (m.props[prop_key].type === "number_inputbox") {
              Temp = (
                <InputNumber
                  min={0}
                  defaultValue={0}
                  value={done_svg?.extend_attr[index].value[prop_key]}
                  onChange={(val) => Ext_InputChangeEvent(prop_key, val, index)}
                />
              );
            } else if (m.props[prop_key].type === "color_inputbox") {
              Temp = (
                <input
                  type="color"
                  value={done_svg?.extend_attr[index].value[prop_key]}
                  onChange={(e) =>
                    Ext_InputChangeEvent(prop_key, e.target.value, index)
                  }
                />
              );
            } else if (m.props[prop_key].type === "radio_group") {
              Temp = (
                <Radio.Group
                  onChange={(e) =>
                    Ext_InputChangeEvent(prop_key, e.target.value, index)
                  }
                  value={done_svg?.extend_attr[index].value[prop_key]}
                >
                  {m.props[prop_key].props.map((p) => {
                    return (
                      <Radio key={p.label} value={p.value}>
                        {p.label}
                      </Radio>
                    );
                  })}
                </Radio.Group>
              );
            } else if (m.props[prop_key].type === "select") {
              Temp = (
                <Select
                  defaultValue={done_svg?.extend_attr[index].value[prop_key]}
                  onChange={(val) => Ext_InputChangeEvent(prop_key, val, index)}
                >
                  {m.props[prop_key].props.map((p) => {
                    return (
                      <Option key={p.label} value={p.value}>
                        {p.label}
                      </Option>
                    );
                  })}
                </Select>
              );
            } else {
              Temp = (
                <Input
                  placeholder={`请输入${m.props[prop_key].title}`}
                  value={done_svg?.extend_attr[index].value[prop_key]}
                  onChange={(e) =>
                    Ext_InputChangeEvent(prop_key, e.target.value, index)
                  }
                />
              );
            }
            return (
              <Form.Item
                label={m.props[prop_key].title}
                key={index + m.props[prop_key].title}
              >
                {Temp}
              </Form.Item>
            );
          });
        })}
      </Form>
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
    SetDoneSvg(done_list: IDoneData[]) {
      dispatch({
        type: SET_DONE_SVG,
        payload: done_list,
      });
    },
  };
};
interface IProps {
  state: IReduxState;
  SetDoneSvg: (done_list: IDoneData[]) => void;
}
export default connect(mapStateToProps, mapDispatchToProps)(RightTool);
