import { Picture } from '@demo/components/Picture';
import { BlockMaskWrapper } from 'easy-email-extensions';
import React from 'react';
import { CustomBlocksType } from '../constants';
import { EnvReader } from '@demo';

export function Example() {
  return (
    <BlockMaskWrapper
      type={CustomBlocksType.PRODUCT_RECOMMENDATION}
      payload={{}}
    >
      <div style={{ position: 'relative' }}>
        <Picture
          src={
            EnvReader.getDomainWithProtocol() + '/images/assets-maocanhua/c160738b-db01-4081-89e5-e35bd3a34470-image.png'
          }
        />
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 2,
          }}
        />
      </div>
    </BlockMaskWrapper>
  );
}
