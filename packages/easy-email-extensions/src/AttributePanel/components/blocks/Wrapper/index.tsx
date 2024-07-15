import React from 'react';
import { Padding } from '@extensions/AttributePanel/components/attributes//Padding';
import { Background } from '@extensions/AttributePanel/components/attributes//Background';
import { TextField } from '@extensions/components/Form';
import { AttributesPanelWrapper } from '@extensions/AttributePanel/components/attributes/AttributesPanelWrapper';
import { Collapse, Grid } from '@arco-design/web-react';
import { Stack, useFocusIdx } from 'easy-email-editor';
import { ClassName } from '../../attributes/ClassName';
import { CollapseWrapper } from '../../attributes/CollapseWrapper';
import { EditorComplexityEnum, GlobalCustomReduxStorageService } from '@demo';

const GlobalPanelPromise = import('../GlobalPanel');
const GlobalPanel        = React.lazy(() => GlobalPanelPromise);

export function Wrapper() {
  const { focusIdx } = useFocusIdx();
  return (
    <AttributesPanelWrapper style={{ padding: 0 }}>
      <GlobalPanel />
      <CollapseWrapper defaultActiveKey={[]}>

        {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
            ? <Collapse.Item name='0' header='Dimension'>
              <Stack vertical spacing='tight'>
                <Padding />
              </Stack>
            </Collapse.Item>
            : <span> </span>
        }

        <Collapse.Item name='1' header='Background'>
          <Stack vertical spacing='tight'>
            <Background />
          </Stack>
        </Collapse.Item>

        {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
            ? <Collapse.Item name='2' header='Border'>
                <Stack vertical spacing='tight'>
                  <TextField
                      label='Border'
                      name={`${focusIdx}.attributes.border`}
                      inline
                  />
                  <TextField
                      label='Background border radius'
                      name={`${focusIdx}.attributes.border-radius`}
                      inline
                  />
                </Stack>
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
