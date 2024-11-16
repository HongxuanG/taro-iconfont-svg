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
      {/*没有color*/}
      <svg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='18.72px' height='18.72px'>
        <path
          d='M512 174.933333c69.546667 0 132.48 28.010667 178.048 73.301334a248.490667 248.490667 0 0 1 73.685333 176.789333c0 91.882667-80.96 235.797333-236.778666 432.789333-5.973333 4.693333-11.925333 7.445333-17.621334 7.445334a13.482667 13.482667 0 0 1-10.688-5.333334C341.781333 661.824 260.266667 517.226667 260.266667 425.024c0-69.034667 28.16-131.541333 73.685333-176.789333A251.776 251.776 0 0 1 512 174.933333z'
          fill='rgb(51,51,51)'
        />
        <path d='M512 426.666667m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z' fill='rgb(255,255,255)' />
      </svg>
      {/*有color*/}
      <svg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='18.72px' height='18.72px'>
        <path
          d='M512 174.933333c69.546667 0 132.48 28.010667 178.048 73.301334a248.490667 248.490667 0 0 1 73.685333 176.789333c0 91.882667-80.96 235.797333-236.778666 432.789333-5.973333 4.693333-11.925333 7.445333-17.621334 7.445334a13.482667 13.482667 0 0 1-10.688-5.333334C341.781333 661.824 260.266667 517.226667 260.266667 425.024c0-69.034667 28.16-131.541333 73.685333-176.789333A251.776 251.776 0 0 1 512 174.933333z'
          fill='red'
        />
        <path d='M512 426.666667m-128 0a128 128 0 1 0 256 0 128 128 0 1 0-256 0Z' fill='red' />
      </svg>
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
          color='currentColor'
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
