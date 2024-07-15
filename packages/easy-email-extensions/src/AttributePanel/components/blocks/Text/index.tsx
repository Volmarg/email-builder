import React, { useState } from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import { TextDecoration } from '@extensions/AttributePanel/components/attributes/TextDecoration';
import { FontWeight } from '@extensions/AttributePanel/components/attributes/FontWeight';
import { FontStyle } from '@extensions/AttributePanel/components/attributes/FontStyle';
import { FontFamily } from '@extensions/AttributePanel/components/attributes/FontFamily';
import { Height } from '@extensions/AttributePanel/components/attributes/Height';
import { ContainerBackgroundColor } from '@extensions/AttributePanel/components/attributes/ContainerBackgroundColor';
import { FontSize } from '@extensions/AttributePanel/components/attributes/FontSize';
import { Color } from '@extensions/AttributePanel/components/attributes/Color';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';
import { LineHeight } from '@extensions/AttributePanel/components/attributes/LineHeight';
import { LetterSpacing } from '@extensions/AttributePanel/components/attributes/LetterSpacing';

import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid, Space, Switch, Tooltip } from '@arco-design/web-react';
import { HtmlEditor } from '../../UI/HtmlEditor';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { EditorComplexityEnum, GlobalCustomReduxStorageService } from '@demo';

const GlobalPanelPromise = import('../GlobalPanel');
const GlobalPanel        = React.lazy(() => GlobalPanelPromise);

export function Text() {
  const [visible, setVisible] = useState(false);

  return (
    <AttributesPanelWrapper>
      <GlobalPanel />
      <CollapseWrapper defaultActiveKey={[]}>
        <Collapse.Item name='0' header='Dimension'>
          <Space direction='vertical'>
            <Height />

            {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
                ? <Padding />
                : <span> </span>
            }

          </Space>
        </Collapse.Item>
        <Collapse.Item name='1' header='Color'>
          <Grid.Row>
            <Grid.Col span={11}>
              <Color />
            </Grid.Col>
            <Grid.Col offset={1} span={11}>
              <ContainerBackgroundColor title='Background color' />
            </Grid.Col>
          </Grid.Row>
        </Collapse.Item>
        <Collapse.Item name='2' header='Typography'>
          <Space direction='vertical'>
            {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
                ? <Grid.Row>
                    <Grid.Col span={11}>
                      <FontFamily />
                    </Grid.Col>
                    <Grid.Col offset={1} span={11}>
                      <FontSize />
                    </Grid.Col>
                  </Grid.Row>
                : <FontSize />
            }

            <Grid.Row>
              <Grid.Col span={11}>
                <LineHeight />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <LetterSpacing />
              </Grid.Col>
            </Grid.Row>

            <Grid.Row>
              <Grid.Col span={11}>
                <TextDecoration />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <FontWeight />
              </Grid.Col>
            </Grid.Row>

            <Align />

            <FontStyle />

            <Grid.Row>
              <Grid.Col span={11} />
              <Grid.Col offset={1} span={11} />
            </Grid.Row>
          </Space>
        </Collapse.Item>

        {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
            ?  <Collapse.Item name='4' header='Extra'>
                <Grid.Col span={24}>
                  <ClassName />
                </Grid.Col>
              </Collapse.Item>
            : <span> </span>
        }

      </CollapseWrapper>
      <HtmlEditor visible={visible} setVisible={setVisible} />
    </AttributesPanelWrapper>
  );
}
