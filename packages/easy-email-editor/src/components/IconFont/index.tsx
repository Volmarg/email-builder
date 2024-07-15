import { classnames } from '@/utils/classnames';
import React from 'react';
import styles from './index.module.scss';

export function IconFont(props: {
  iconName: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onClickCapture?: React.MouseEventHandler<HTMLDivElement>;
  size?: number;
  style?: React.CSSProperties;
  title?: string;
  label?: string;
}) {
  return (
    <div className={styles.iconsWrapper}>
        <div
            title={props.title}
            onClick={props.onClick}
            onClickCapture={props.onClickCapture}
            style={{
                cursor: 'pointer',
                pointerEvents: 'auto',
                color: 'inherit',
                ...(props.style as any),
                fontSize: props.size || props.style?.fontSize,
            }}
            className={classnames('iconfont', props.iconName)}
        />
        <span style={{ marginLeft: '10px' }}> {props.label} </span>
    </div>
  );
}
