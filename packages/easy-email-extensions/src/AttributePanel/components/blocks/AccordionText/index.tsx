import React from 'react';
import { Stack, useFocusIdx } from 'easy-email-editor';

import { Padding } from '../../attributes/Padding';
import { BackgroundColor } from '../../attributes/BackgroundColor';
import { Color } from '../../attributes/Color';
import { TextAreaField } from '../../../../components/Form';
import { FontSize } from '../../attributes/FontSize';
import { FontWeight } from '../../attributes/FontWeight';
import { FontFamily } from '../../attributes/FontFamily';
import { LineHeight } from '../../attributes/LineHeight';
import { AttributesPanelWrapper } from '../../attributes/AttributesPanelWrapper';
import { Collapse, Grid, Space } from '@arco-design/web-react';

const GlobalPanelPromise = import('../GlobalPanel');
const GlobalPanel        = React.lazy(() => GlobalPanelPromise);

export function AccordionText() {
  const { focusIdx } = useFocusIdx();

  return (
    <AttributesPanelWrapper>
      <GlobalPanel />
      <Collapse defaultActiveKey={[]}>
        <Collapse.Item name='0' header='Setting'>
          <Space direction='vertical'>
            <TextAreaField
              label='Content'
              name={`${focusIdx}.data.value.content`}
            />
            <Grid.Row>
              <Grid.Col span={11}>
                <Color />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <FontSize />
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col span={11}>
                <LineHeight />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <FontWeight />
              </Grid.Col>
            </Grid.Row>
            <Grid.Row>
              <Grid.Col span={11}>
                <FontFamily />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <BackgroundColor />
              </Grid.Col>
            </Grid.Row>

            <Padding title='Padding' attributeName='padding' />
          </Space>
        </Collapse.Item>
      </Collapse>
    </AttributesPanelWrapper>
  );
}
