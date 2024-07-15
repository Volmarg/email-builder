import React from 'react';
import { Collapse, Grid, Space } from '@arco-design/web-react';
import { AttributesPanelWrapper, InputWithUnitField, TextField } from '@extensions';
import { Stack, useFocusIdx } from 'easy-email-editor';
import { EditorComplexityEnum, GlobalCustomReduxStorageService } from '@demo';

export default function GlobalPanel() {
  const { focusIdx } = useFocusIdx();

  if (!focusIdx) return null;
  return (
      <div>
          <h4 className='global-setting-header'>Global settings</h4>
          <div
              style={{
                  display: 'flex',
                  justifyContent: 'center'
              }}
          >
              <small>Variables / Placeholders are not supported</small>
          </div>
          <Collapse defaultActiveKey={['0', '1']} className='global-settings-panels'>
              <Collapse.Item name='0' header='Template Setting (name etc.)'>
                  <Space direction='vertical'>
                      <TextField label='Name *' name={'templateName'} inline />
                  </Space>
              </Collapse.Item>

              <Collapse.Item name='1' header='Email Setting (subject etc.)'>
                  <Space direction='vertical'>
                      <TextField label='Subject' name={'subject'} inline />

                      {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
                          ? <InputWithUnitField
                              label='Width'
                              name={`content.attributes.width`}
                              inline
                          />
                          : <span style={{ display: 'none' }}> </span>
                      }

                      {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
                          ? <InputWithUnitField
                              label='Breakpoint'
                              helpText='Allows you to control on which breakpoint the layout should go desktop/mobile.'
                              name={`content.data.value.breakpoint`}
                              inline
                          />
                          : <span style={{ display: 'none' }}> </span>
                      }

                  </Space>
              </Collapse.Item>
          </Collapse>

          <h4 className='global-setting-header'>Component settings</h4>
          <div
              style={{
                  display: 'flex',
                  justifyContent: 'center'
              }}
          >
              <small>Variables / Placeholders are partially supported</small>
          </div>
      </div>
  );
}
