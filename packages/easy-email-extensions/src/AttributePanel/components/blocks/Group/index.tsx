import React from 'react';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { BackgroundColor } from '@extensions/AttributePanel/components/attributes/BackgroundColor';
import { VerticalAlign } from '@extensions/AttributePanel/components/attributes/VerticalAlign';
import { Collapse, Grid } from '@arco-design/web-react';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import {EditorComplexityEnum, GlobalCustomReduxStorageService} from "@demo";

const GlobalPanelPromise = import('../GlobalPanel');
const GlobalPanel        = React.lazy(() => GlobalPanelPromise);

export function Group() {
  return (
    <AttributesPanelWrapper>
      <GlobalPanel />
      <CollapseWrapper defaultActiveKey={[]}>
        <Collapse.Item name='0' header='Dimension'>
          <Grid.Row>
            <Grid.Col span={11}>
              <Width />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <VerticalAlign />
            </Grid.Col>
          </Grid.Row>
        </Collapse.Item>
        <Collapse.Item name='1' header='Background'>
          <Grid.Row>
            <Grid.Col span={11}>
              <BackgroundColor />
            </Grid.Col>
            <Grid.Col offset={1} span={11} />
          </Grid.Row>
        </Collapse.Item>

        {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
            ? <Collapse.Item name='4' header='Extra'>
                <Grid.Col span={24}>
                  <ClassName />
                </Grid.Col>
              </Collapse.Item>
            : ''
        }

      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}
