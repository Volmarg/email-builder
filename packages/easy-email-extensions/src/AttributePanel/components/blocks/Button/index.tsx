import React, { useCallback, useState } from 'react';
import { Padding } from '../../attributes/Padding';
import { Border } from '../../attributes/Border';
import { BackgroundColor } from '../../attributes/BackgroundColor';
import { Color } from '../../attributes/Color';
import { Link } from '../../attributes/Link';
import { Width } from '../../attributes/Width';
import { ContainerBackgroundColor } from '../../attributes/ContainerBackgroundColor';
import { Align } from '../../attributes/Align';
import { FontSize } from '../../attributes/FontSize';
import { FontStyle } from '../../attributes/FontStyle';
import { FontWeight } from '../../attributes/FontWeight';
import { FontFamily } from '../../attributes/FontFamily';
import { TextDecoration } from '../../attributes/TextDecoration';
import { LineHeight } from '../../attributes/LineHeight';
import { LetterSpacing } from '../../attributes/LetterSpacing';
import { Collapse, Grid, Popover, Space } from '@arco-design/web-react';
import {InputWithUnitField, TextField} from '../../../../components/Form';
import { IconFont, useEditorProps, useFocusIdx } from 'easy-email-editor';
import { AttributesPanelWrapper } from '../../attributes/AttributesPanelWrapper';
import { MergeTags } from '../../attributes';
import { useField } from 'react-final-form';
import { Button as ArcoButton } from '@arco-design/web-react';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { EditorComplexityEnum, GlobalCustomReduxStorageService } from '@demo';

const GlobalPanelPromise = import('../GlobalPanel');
const GlobalPanel        = React.lazy(() => GlobalPanelPromise);

export function Button() {
  const { focusIdx } = useFocusIdx();
  const { input } = useField(`${focusIdx}.data.value.content`, {
    parse: (v) => v,
  });

  const { mergeTags } = useEditorProps();

  return (
    <AttributesPanelWrapper>
      <GlobalPanel />
      <CollapseWrapper defaultActiveKey={[]}>
        <Collapse.Item name='-1' header='Setting'>
          <Space direction='vertical'>
            <TextField
              label={(
                <Space>
                  <span>Content</span>
                  {mergeTags && (
                    <Popover
                      trigger='click'
                      content={(
                        <MergeTags
                          value={input.value}
                          onChange={input.onChange}
                        />
                      )}
                    >
                      <ArcoButton
                        type='text'
                        icon={<IconFont iconName='icon-merge-tags' />}
                      />
                    </Popover>
                  )}
                </Space>
              )}
              name={`${focusIdx}.data.value.content`}
            />
            <Link />
          </Space>
        </Collapse.Item>

        <Collapse.Item name='0' header='Dimension'>
          <Space direction='vertical'>
            <Grid.Row>
              <Grid.Col span={11}>
                <Width />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <FontWeight />
              </Grid.Col>
            </Grid.Row>

            {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
                ? <Padding title='Padding' attributeName='padding' />
                : <span> </span>
            }

            {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
                ? <Padding title='Inner padding' attributeName='inner-padding' />
                : <span> </span>
            }

          </Space>
        </Collapse.Item>

        <Collapse.Item name='1' header='Color'>
          <Space direction='vertical'>
            <Grid.Row>
              <Grid.Col span={11}>
                <Color title='Text color' />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <BackgroundColor title='Button color' />
              </Grid.Col>
              <Grid.Col span={11}>
                <ContainerBackgroundColor title='Background color' />
              </Grid.Col>
            </Grid.Row>
          </Space>
        </Collapse.Item>

        <Collapse.Item name='2' header='Typography'>
          <Space direction='vertical'>
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
                <FontWeight />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <LineHeight />
              </Grid.Col>
            </Grid.Row>

            <Grid.Row>
              <Grid.Col span={11}>
                <TextDecoration />
              </Grid.Col>
              <Grid.Col offset={1} span={11}>
                <LetterSpacing />
              </Grid.Col>
            </Grid.Row>
            <Align />

            <FontStyle />
          </Space>
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
                  <ClassName />
                </Grid.Col>
              </Collapse.Item>
            : <span> </span>
        }

      </CollapseWrapper>
    </AttributesPanelWrapper>
  );
}
