import React from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { ContainerBackgroundColor } from '@extensions/AttributePanel/components/attributes/ContainerBackgroundColor';
import { BorderWidth } from '@extensions/AttributePanel/components/attributes/BorderWidth';
import { BorderStyle } from '@extensions/AttributePanel/components/attributes/BorderStyle';
import { BorderColor } from '@extensions/AttributePanel/components/attributes/BorderColor';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';

import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import { Stack } from 'easy-email-editor';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import {EditorComplexityEnum, GlobalCustomReduxStorageService} from '@demo';

const GlobalPanelPromise = import('../GlobalPanel');
const GlobalPanel        = React.lazy(() => GlobalPanelPromise);

export function Divider() {
  return (
    <AttributesPanelWrapper>
      <GlobalPanel />
      <CollapseWrapper defaultActiveKey={[]}>
        <Collapse.Item name='1' header='Dimension'>
          <Space direction='vertical'>
            <Grid.Row>
              <Grid.Col span={11}>
                <Width unitOptions='percent' />
              </Grid.Col>
              <Grid.Col offset={1} span={11} />
            </Grid.Row>

            <Align />
            <Padding />
          </Space>
        </Collapse.Item>

        <Collapse.Item name='2' header='Border'>
          <Stack wrap={false} spacing='tight'>
            <div style={{ width: 50 }}>
              <BorderWidth />
            </div>
            <div style={{ width: 100 }}>
              <BorderStyle />
            </div>
            <div style={{ width: 100 }}>
              <BorderColor />
            </div>
          </Stack>
        </Collapse.Item>

        {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
            ? <Collapse.Item name='3' header='Background'>
                <Grid.Row>
                  <Grid.Col span={11}>
                    <ContainerBackgroundColor title='Background' />
                  </Grid.Col>
                  <Grid.Col offset={1} span={11} />
                </Grid.Row>
              </Collapse.Item>
            : <span> </span>
        }

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
