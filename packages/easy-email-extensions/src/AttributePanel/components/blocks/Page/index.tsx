import React from 'react';
import {
  ColorPickerField,
  InputWithUnitField,
  TextAreaField,
  TextField,
} from '@extensions/components/Form';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import { Stack, useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { FontFamily } from '../../attributes/FontFamily';
import { AddFont } from '@extensions/components/Form/AddFont';
import { EditorComplexityEnum, GlobalCustomReduxStorageService } from '@demo';

const GlobalPanelPromise = import('../GlobalPanel');
const GlobalPanel        = React.lazy(() => GlobalPanelPromise);

export function Page() {

  const { focusIdx } = useFocusIdx();

  if (!focusIdx) return null;
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <GlobalPanel />
      <Stack.Item fill>
        <Collapse defaultActiveKey={[]}>
          <Collapse.Item name='1' header='Theme Setting'>
            <Stack vertical spacing='tight'>
              <Grid.Row>

                {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
                    ? <Grid.Col span={11}>
                        <FontFamily name={`${focusIdx}.data.value.font-family`} />
                      </Grid.Col>
                    : <span> </span>
                }

                {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
                    ? <Grid.Col offset={1} span={11}>
                        <InputWithUnitField
                          label='Font size'
                          name={`${focusIdx}.data.value.font-size`}
                        />
                      </Grid.Col>
                    : <InputWithUnitField
                        label='Font size'
                        name={`${focusIdx}.data.value.font-size`}
                      />
                }

              </Grid.Row>

              <Grid.Row>
                <Grid.Col span={11}>
                  <InputWithUnitField
                    label='Line height'
                    unitOptions='percent'
                    name={`${focusIdx}.data.value.line-height`}
                  />
                </Grid.Col>
                <Grid.Col offset={1} span={11}>
                  <InputWithUnitField
                    label='Font weight'
                    unitOptions='percent'
                    name={`${focusIdx}.data.value.font-weight`}
                  />
                </Grid.Col>
              </Grid.Row>

              <Grid.Row>
                <Grid.Col span={11}>
                  <ColorPickerField
                    label='Text color'
                    name={`${focusIdx}.data.value.text-color`}
                  />
                </Grid.Col>
                <Grid.Col offset={1} span={11}>
                  <ColorPickerField
                    label='Background'
                    name={`${focusIdx}.attributes.background-color`}
                  />
                </Grid.Col>
              </Grid.Row>

              <Grid.Row>
                <ColorPickerField
                  label='Content background'
                  name={`${focusIdx}.data.value.content-background-color`}
                />

              </Grid.Row>

              {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
                  ? <TextAreaField
                      autoSize
                      label='User style'
                      name={`${focusIdx}.data.value.user-style.content`}
                  />
                  : <span> </span>
              }

              <Stack.Item />
              <Stack.Item />
              {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
                  ? <AddFont />
                  : <span> </span>
              }
              <Stack.Item />
              <Stack.Item />
            </Stack>
          </Collapse.Item>
        </Collapse>
      </Stack.Item>
    </AttributesPanelWrapper>
  );
}
