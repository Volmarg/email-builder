import { Stack } from '@/components/UI/Stack';
import React from 'react';
import { useBlock } from '@/hooks/useBlock';
import { IconFont } from '@/components/IconFont';
import { Button } from '@/components/UI/Button';
import { custom, EditorComplexityEnum, LocalStorageReader, EmailComplexityActionsTeleporter } from '@demo';

export function ToolsPanel() {
    const { redo, undo, redoable, undoable } = useBlock();
    //@ts-ignore
    React.useReducer(custom.reducer, { complexityMode: LocalStorageReader.getComplexityMode() ?? EditorComplexityEnum.simple })

  //  start my-private-customization
  /**
  * @description toggle right sidebar visibility
  */
  function toggleRightSidebar() {
      let hiddenLayoutConfig          = document.querySelector('.hidden-layout-config') as HTMLElement;
      let rightSidebarVisibilityState = hiddenLayoutConfig.getAttribute('data-right-sidebar-visible');
      let isRightSidebarVisible       = ('true' === rightSidebarVisibilityState);

      hiddenLayoutConfig.setAttribute('data-right-sidebar-visible', String(!isRightSidebarVisible));
  }
  //  end my-private-customization

    return (
    <Stack>
        <EmailComplexityActionsTeleporter.Target />
        <Button title='undo' disabled={!undoable} onClick={undo}>
        <IconFont
          iconName='icon-undo'
          style={{
            cursor: 'inherit',
            opacity: undoable ? 1 : 0.75,
          }}
        />
      </Button>

      <Button title='redo' disabled={!redoable} onClick={redo}>
        <IconFont
          iconName='icon-redo'
          style={{
            cursor: 'inherit',
            opacity: redoable ? 1 : 0.75,
          }}
        />
      </Button>

      {/* start my-private-customization */}
      <div onClick={toggleRightSidebar}
           className={'top-bar-right-sidebar-hamburger'}
           style={{
            cursor: 'pointer', // my-private-customization
            marginTop: '3px', // my-private-customization
           }}
      >
        ☰
      </div>
      {/* end my-private-customization */}

      <Stack.Item />
    </Stack>
  );
}
