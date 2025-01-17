import { IconFont, BlockAvatarWrapper } from 'easy-email-editor';
import { Button } from '@arco-design/web-react';
import { getIconNameByBlockType } from '@extensions';
import React from 'react';
import { BlockManager, IBlockData } from 'easy-email-core';
import { RecursivePartial } from 'easy-email-core';

export interface DragIconProps<T extends IBlockData> {
  type: string;
  payload?: RecursivePartial<T>;
  color: string;
  label: string,
}

export function DragIcon<T extends IBlockData = any>(props: DragIconProps<T>) {
  const block = BlockManager.getBlockByType(props.type);
  return (
    <BlockAvatarWrapper type={props.type} payload={props.payload}>
        <div className={'drag-icon'}>
          <Button
            type='text'
            title={block?.name}
            className={'drag-icon-button'}
            icon={(
              <IconFont
                iconName={getIconNameByBlockType(props.type)}
                style={{
                  fontSize: 16,
                  textAlign: 'center',
                  cursor: 'move',
                  color: props.color,
                }}
              />
            )}
          />
            <span
                style={{
                    cursor: 'move',
                }}
            >
                { props.label }
            </span>
        </div>
    </BlockAvatarWrapper>
  );
}
