import React from 'react';
import { Height } from '@extensions/AttributePanel/components/attributes/Height';
import { ContainerBackgroundColor } from '@extensions/AttributePanel/components/attributes/ContainerBackgroundColor';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import {EditorComplexityEnum, GlobalCustomReduxStorageService} from '@demo';

const GlobalPanelPromise = import('../GlobalPanel');
const GlobalPanel        = React.lazy(() => GlobalPanelPromise);

export function Spacer() {
  return (
    <AttributesPanelWrapper>
      <GlobalPanel />
      <CollapseWrapper defaultActiveKey={[]}>
        <Collapse.Item name='1' header='Dimension'>
          <Space direction='vertical'>
            <Height />
            <Padding />
          </Space>
        </Collapse.Item>

        <Collapse.Item name='2' header='Background'>
          <ContainerBackgroundColor title='Background color' />
        </Collapse.Item>

        {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
            ? <Collapse.Item name='4' header='Extra'>
                <Grid.Col span={24}>
                  <ClassName />
                </Grid.Col>
              </Collapse.Item>
            : <span> </span>
        }

      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}
