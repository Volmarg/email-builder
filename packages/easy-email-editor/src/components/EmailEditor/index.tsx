import React, {useEffect, useMemo} from 'react';
import { Stack } from '../UI/Stack';
import { ToolsPanel } from './components/ToolsPanel';
import { createPortal } from 'react-dom';
import { EASY_EMAIL_EDITOR_ID, FIXED_CONTAINER_ID } from '@/constants';
import { useActiveTab } from '@/hooks/useActiveTab';
import { ActiveTabKeys } from '../Provider/BlocksProvider';
import { DesktopEmailPreview } from './components/DesktopEmailPreview';
import { MobileEmailPreview } from './components/MobileEmailPreview';
import { EditEmailPreview } from './components/EditEmailPreview';
import { IconFont } from '../IconFont';
import { TabPane, Tabs } from '@/components/UI/Tabs';
import { useEditorProps } from '@/hooks/useEditorProps';
import './index.scss';
import '@/assets/font/iconfont.css';
import { useCallback } from 'react';
import { EventManager, EventType } from '@/utils/EventManager';
(window as any).global = window; // react-codemirror

export const EmailEditor = () => {
  const { height: containerHeight } = useEditorProps();
  const { setActiveTab, activeTab } = useActiveTab();

  const fixedContainer = useMemo(() => {
    return createPortal(<div id={FIXED_CONTAINER_ID} />, document.body);
  }, []);

  const onBeforeChangeTab = useCallback((currentTab: any, nextTab: any) => {
    return EventManager.exec(EventType.ACTIVE_TAB_CHANGE, { currentTab, nextTab });
  }, []);

  const onChangeTab = useCallback((nextTab: string) => {
    setActiveTab(nextTab as any);
  }, [setActiveTab]);

  // start my-private-customization
    /**
     * @description toggle left sidebar visibility
     */
    function toggleLeftSidebar() {
        let hiddenLayoutConfig         = document.querySelector('.hidden-layout-config') as HTMLElement;
        let leftSidebarVisibilityState = hiddenLayoutConfig.getAttribute('data-left-sidebar-visible');
        let isLeftSidebarVisible       = ('true' === leftSidebarVisibilityState);

        hiddenLayoutConfig.setAttribute('data-left-sidebar-visible', String(!isLeftSidebarVisible));
    }

    function attachHamburgerEventListener() {
        let hamburgerElement       = document.querySelector('.top-bar-left-sidebar-hamburger') as HTMLElement;
        let hamburgerButtonWrapper = hamburgerElement.closest('[class*=\'_Item_\']') as HTMLElement;

        hamburgerButtonWrapper.removeEventListener('click', toggleLeftSidebar);
        hamburgerButtonWrapper.addEventListener('click', toggleLeftSidebar);
    }
    // end my-private-customization

    return useMemo(
    () => (
      <div
        id={EASY_EMAIL_EDITOR_ID}
        style={{
          display: 'flex',
          flex: '1',
          overflow: 'hidden',
          justifyContent: 'center',
          minWidth: 640,
          height: containerHeight,
        }}
        ref={attachHamburgerEventListener}
      >
        <Tabs
          activeTab={activeTab}
          onBeforeChange={onBeforeChangeTab}
          onChange={onChangeTab}
          style={{ height: '100%', width: '100%' }}
          tabBarExtraContent={<ToolsPanel />}
        >
          {/* start my-private-customization */}
          <TabPane
            style={{ height: 'calc(100% - 50px)' }}
            tab={(
                <div title='Hide menu'
                     className={'top-bar-left-sidebar-hamburger'}
                     style={{
                         cursor: 'pointer',
                     }}
                >
                    ☰
                </div>
            )}
          />
          {/* end my-private-customization */}
          <TabPane
            style={{ height: 'calc(100% - 50px)' }}
            tab={(
              <Stack spacing='tight'>
                <IconFont iconName='icon-editor' />
              </Stack>
            )}
            key={ActiveTabKeys.EDIT}
          >
            <EditEmailPreview />
          </TabPane>
          <TabPane
            style={{ height: 'calc(100% - 50px)' }}
            tab={(
              <Stack spacing='tight'>
                <IconFont iconName='icon-desktop' />
              </Stack>
            )}
            key={ActiveTabKeys.PC}
          >
            <DesktopEmailPreview />
          </TabPane>
          <TabPane
            style={{ height: 'calc(100% - 50px)' }}
            tab={(
              <Stack spacing='tight'>
                <IconFont iconName='icon-mobile' />
              </Stack>
            )}
            key={ActiveTabKeys.MOBILE}
          >
            <MobileEmailPreview />
          </TabPane>
        </Tabs>

        {fixedContainer}
      </div>
    ),
    [activeTab, containerHeight, fixedContainer, onBeforeChangeTab, onChangeTab]
  );
};
