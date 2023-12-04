import React from 'react';
import style from './copyright.module.scss';
const Copyright = () => {
  return <div className={style['copyright']}>react-admin ©{new Date().getFullYear()} Created by luo_fangguo@163.com</div>;
};

export default Copyright;
