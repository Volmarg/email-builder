import React from 'react';

import { Collapse, Grid, Space } from '@arco-design/web-react';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { VerticalAlign } from '@extensions/AttributePanel/components/attributes/VerticalAlign';
import { Background } from '@extensions/AttributePanel/components/attributes/Background';
import { Border } from '@extensions/AttributePanel/components/attributes/Border';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { EditorComplexityEnum, GlobalCustomReduxStorageService } from '@demo';

const GlobalPanelPromise = import('../GlobalPanel');
const GlobalPanel        = React.lazy(() => GlobalPanelPromise);

export function Column() {
  return (
    <AttributesPanelWrapper>
      <GlobalPanel />
      <CollapseWrapper defaultActiveKey={[]}>
        <Collapse.Item name='0' header='Dimension'>

          {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
              ?<Space direction='vertical'> <Grid.Row>
                  <Grid.Col span={11}>
                    <Width />
                  </Grid.Col>
                  <Grid.Col offset={1} span={11}>
                    <VerticalAlign />
                  </Grid.Col>
                </Grid.Row></Space>
              : <span> </span>
          } <Grid.Row><VerticalAlign /></Grid.Row>

          {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
              ? <Padding />
              : <span> </span>
          }

        </Collapse.Item>
        <Collapse.Item name='1' header='Background'>
          <Background />
        </Collapse.Item>

        {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
            ? <Collapse.Item name='2' header='Border'>
                <Border />
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
