import { ShortcutToolbar } from '../ShortcutToolbar';
import { Card, ConfigProvider, Layout, Tabs } from '@arco-design/web-react';
import { useEditorProps } from 'easy-email-editor';
import React, { useState } from 'react';
import { SourceCodePanel } from '../SourceCodePanel';
import { AttributePanel } from '../AttributePanel';
import { BlockLayer, BlockLayerProps } from '../BlockLayer';
import { InteractivePrompt } from '../InteractivePrompt';
import styles from './index.module.scss';
import enUS from '@arco-design/web-react/es/locale/en-US';
import { MergeTagBadgePrompt } from '@extensions/MergeTagBadgePrompt';

export const SimpleLayout: React.FC<
  {
    showSourceCode?: boolean;
    defaultShowLayer?: boolean;
  } & BlockLayerProps
> = (props) => {
  const { height: containerHeight } = useEditorProps();
  const { showSourceCode = false, defaultShowLayer = true } = props; /* hiding source code as users don't need that */
  const [collapsed, setCollapsed] = useState(!defaultShowLayer);

    return (
    <ConfigProvider locale={enUS}>
        {/* start my-private-customization */}
        <Layout style={{ display: 'none' }}
                className={'hidden-layout-config'}
                data-right-sidebar-visible={true}
                data-left-sidebar-visible={true}
        />
        {/* end my-private-customization */}

        <Layout
        className={styles.SimpleLayout}
        style={{
          display: 'flex',
          width: '100vw',
          overflow: 'hidden',
          minWidth: 1115, // my-private-customization
        }}
        >
        <Layout.Sider
          style={{ paddingRight: 0 }}
          collapsed={collapsed}
          collapsible
          trigger={null} breakpoint='xl'
          collapsedWidth={60}
          width={'auto'}
          className={'left-sidebar'} // my-private-customization
        >
          <Card bodyStyle={{ padding: 0 }} style={{ border: 'none' }}>
            <Card.Grid style={{ width: 130, textAlign: 'center' }}>
              {/* This ShortcutToolbar contains the options in sidebar on left */}
              <ShortcutToolbar />
            </Card.Grid>

            {/* This is the navigation tree of page structure, is hidden to not confuse ppl */}
            <Card.Grid
              className={styles.customScrollBar}
              style={{
                flex: 1,
                paddingBottom: 50,
                border: 'none',
                height: containerHeight,
                overflowY: 'auto',
                overflowX: 'hidden',
                display: 'none'
              }}
            >
              <Card title='Layout' style={{ border: 'none' }} headerStyle={{ height: 50 }}>
                {!collapsed && (
                  <BlockLayer renderTitle={props.renderTitle} />
                )}
              </Card>
            </Card.Grid>

          </Card>
        </Layout.Sider>

        <Layout style={{ height: containerHeight }}>{props.children}</Layout>

        <Layout.Sider
          style={{
            height: containerHeight,
            minWidth: 'auto', // my-private-customization
            maxWidth: 350,
            width: 'auto', // my-private-customization
          }}
          className={`${styles.rightSide} right-sidebar`} // my-private-customization
        >
          <Card
            size='small'
            id='rightSide'
            style={{
              maxHeight: '100%',
              height: '100%',
              borderLeft: 'none',
            }}
            bodyStyle={{ padding: 0 }}
            className={styles.customScrollBarV2}
          >
            <Tabs className={styles.layoutTabs} style={{ display: 'flex', flexDirection: 'column' }}> {/* my-private-customization */}
              <Tabs.TabPane title={<div style={{ height: 31, lineHeight: '31px' }}>Configuration</div>}>
                <AttributePanel />
              </Tabs.TabPane>
              {showSourceCode && (
                <Tabs.TabPane destroyOnHide key='Source code' title={<div style={{ height: 31, lineHeight: '31px' }}>Source code</div>}>
                  <SourceCodePanel />
                </Tabs.TabPane>
              )}
            </Tabs>
          </Card>
        </Layout.Sider>

        <InteractivePrompt />
        <MergeTagBadgePrompt />
      </Layout>
    </ConfigProvider>
  );
};
