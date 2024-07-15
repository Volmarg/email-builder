import React, { useContext } from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes/Padding';
import {
  ColorPickerField,
  ImageUploaderField,
  TextField,
} from '@extensions/components/Form';
import { Width } from '@extensions/AttributePanel/components/attributes/Width';
import { Height } from '@extensions/AttributePanel/components/attributes/Height';
import { Link } from '@extensions/AttributePanel/components/attributes/Link';
import { Align } from '@extensions/AttributePanel/components/attributes/Align';

import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import { Border } from '@extensions/AttributePanel/components/attributes/Border';
import { Stack, useEditorProps, useFocusIdx } from 'easy-email-editor';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { EditorComplexityEnum, GlobalCustomReduxStorageService } from '@demo';

const GlobalPanelPromise = import('../GlobalPanel');
const GlobalPanel        = React.lazy(() => GlobalPanelPromise);

export function Image() {
  const { focusIdx } = useFocusIdx();
  const { onUploadImage } = useEditorProps();

  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <GlobalPanel />
      <CollapseWrapper defaultActiveKey={['1']}>
        <Collapse.Item name='1' header='Setting'>
          <Stack vertical spacing='tight'>
            <ImageUploaderField
              label='⇣Click = upload⇣'
              name={`${focusIdx}.attributes.src`}
              helpText='The image suffix should be .jpg, jpeg, png. Otherwise, the picture may not be displayed normally. Max size is: 250kB.'
              uploadHandler={onUploadImage}
            />
            <ColorPickerField
              label='Background color'
              name={`${focusIdx}.attributes.container-background-color`}
              inline
              alignment='center'
            />
          </Stack>
        </Collapse.Item>

        <Collapse.Item name='0' header='Dimension'>
          <Space direction='vertical'>
            <Grid.Row>
              <Grid.Col span={11}>
                <Width />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <Height />
              </Grid.Col>
            </Grid.Row>

            {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
                ? <Padding />
                : <span> </span>
            }

            <Grid.Row>
              <Grid.Col span={24}>
                <Align />
              </Grid.Col>
            </Grid.Row>
          </Space>
        </Collapse.Item>

        <Collapse.Item name='2' header='Link'>
          <Stack vertical spacing='tight'>
            <Link />
          </Stack>
        </Collapse.Item>

        {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
            ? <Collapse.Item name='3' header='Border'>
                <Border />
              </Collapse.Item>
            : <span> </span>
        }

        {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
            ? <Collapse.Item name='4' header='Extra'>
                <Grid.Col span={24}>
                  <TextField
                    label='class name'
                    name={`${focusIdx}.attributes.css-class`}
                  />
                </Grid.Col>
              </Collapse.Item>
            : <span> </span>
        }

      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}
