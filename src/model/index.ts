/**
 *组件基本数据
 *
 * @export
 * @interface ISvgComponentData
 * @property {string} type -组件类型（唯一）
 * @property {string} title -组件标题
 * @property {string} create_type -组件创建方式
 * @property {string} priview_img -组件预览地址
 * @property {Array} template -组件模板
 */
export interface ISvgComponentData {
  type: string;
  title: string;
  create_type: string;
  priview_img: string;
  template: Array<ITemplate>;
}
export interface ITemplate {
  tag: string;
  props: { [key: string]: ITemplateProps };
  children: Array<ITemplate>;
}
export interface ITemplateProps {
  edit: string;
  title: string;
  type: string;
  val: any;
  props:Array<ITemplatePropsChildrenProps>
}
export interface ITemplatePropsChildrenProps{
  value:any,
  label:string
}
/**
 *组件默认配置文件
 *
 * @export
 * @interface ISvgDefaultJson
 */
export interface ISvgDefaultJson {
  [key: string]: Array<ISvgComponentData>;
}

/**
 *
 *
 * @export
 * @interface IReduxState redux状态
 * @property {Array<ISvgComponentInfo>} svg_component_info 所有组件的的初始信息
 * @property {string} create_svg_type 要创建组件的类型
 * @property {Array<IDoneData>} done_svg_data 绘制好的组件json数据
 * @property {string} select_svg_id 选中组件的id
 */
export interface IReduxState {
  svg_component_infos: Array<ISvgComponentData>;
  create_svg_type: string;
  done_svg_data: Array<IDoneData>;
  select_svg_info: ISelectSvgInfo;
}

/**
 * 鼠标选中组件时记录的组件信息
 *
 * @export
 * @interface ISelectSvgInfo
 * @property {number} m_position_x 鼠标信息
 */
export interface ISelectSvgInfo {
  id: string;
  m_status: number; //鼠标状态0弹起 1按下
  m_position_x: number;
  m_position_y: number;
  s_position_x: number;
  s_position_y: number;
}

/**
 *绘制好的数据
 *
 * @export
 * @interface IDoneData
 */
export interface IDoneData {
  id: string;
  type: string;
  title: string;
  position_x: number;
  position_y: number;
  rotate: number;
  scale: number;
  extend_attr: Array<IExtendAttr>;
}
/**
 * 拓展属性 用于设置组件数据
 */
export interface IExtendAttr {
  tag: string;
  value: { [key: string]: any };
  children: Array<IExtendAttr>;
}
