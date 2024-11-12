import { View, Text } from '@tarojs/components'
import './index.scss'
import { useState } from 'react';
import IconFont from '@/components/iconfont/iconfont';

export default function Index () {
  console.log("重新渲染 index");
  const [state, setState] = useState({
    inputValue1: "",
    inputValue2: ""
  });
  const onChange = (input: string, key: string) => {
    setState(preProps => ({
      ...preProps,
      [key]: input
    }));
  };
  return (
    <View className='index'>
      <View
        style={{
          backgroundImage:
            `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='-10 -18 100 135'><circle cx='50' cy='50' r='40' fill='none' stroke='%23ededed' stroke-width='3'/></svg>")`
        }}
      >
        Hello world!
      </View>
      <View style={{color: 'red'}}>
        <IconFont
          name='icon-address'
          size={36}
          color='#333'
        ></IconFont>
      </View>
      <IconFont
        name='icon-jiantouxiangxia'
        size={36}
      ></IconFont>
      <IconFont
        name='icon-jiantouxiangshang'
        size={36}
      ></IconFont>
      <IconFont
        name='icon-xihuan1'
        size={72}
        color='red'
      ></IconFont>
      <IconFont
        name='icon-u'
        size={72}
      ></IconFont>
      <IconFont
        name='icon-ziyuan'
        size={72}
      ></IconFont>
      {/* <View>
        <View>Input1</View>
        <XInput
          onChange={value => onChange(value, "inputValue1")}
        ></XInput>
      </View>
      <View>
        <View>Input2</View>
        <XInput
          onChange={value => onChange(value, "inputValue2")}
        ></XInput>
      </View> */}
    </View>
  );
}
