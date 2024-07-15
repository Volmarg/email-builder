/* eslint-disable react/jsx-wrap-multilines */

import { AdvancedType, IButton, IImage } from 'easy-email-core';
import { IconFont, Stack } from 'easy-email-editor';
import React, { useRef } from 'react';
import { BlocksPanel } from './components/BlocksPanel';
import { DragIcon } from './components/DragIcon';
import {EditorComplexityEnum, GlobalCustomReduxStorageService} from "@demo";

/**
 * @description that's the whole icon sidebar on left
 */
export function ShortcutToolbar() {
  const blocksPanelRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ marginLeft: '10px' }} className={'shortcut-sidebar'}>
        {/* This is panel visible when clicking "Other */}
        <BlocksPanel>
            <div ref={blocksPanelRef} />
        </BlocksPanel>

        <b>Drag & Drop</b>
        <p />

        <Stack vertical alignment='baseline' distribution='center'>
            <DragIcon type={AdvancedType.TEXT} color='rgb(110, 215, 135)' payload={{ attributes: { padding: '0px 25px 0px 25px', 'align': 'center' } }} label={'Text'} />
            <DragIcon<IImage> payload={{ attributes: { padding: '0px 0px 0px 0px' } }} type={AdvancedType.IMAGE} color='rgb(250, 208, 97)' label={'Image'} />
            <DragIcon<IButton> type={AdvancedType.BUTTON} color='rgb(238,144,172)' label={'Button'} />
            <DragIcon type={AdvancedType.SOCIAL} color='rgb(111,206,236) ' label={'Social'} />
            <DragIcon type={AdvancedType.NAVBAR} color='rgb(191,24,84)' label={'Navbar'} />
            <DragIcon type={AdvancedType.DIVIDER} color='rgb(71,67,239)' label={'Divider'} />

            <DragIcon type={AdvancedType.SPACER} color='#ccc' label={'Spacer'} />
            <DragIcon type={AdvancedType.COLUMN} color='#ccc' label={'Column'} />

            {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
                ? <DragIcon type={AdvancedType.HERO} color='#ccc' label={'Hero'} />
                : ''
            }

            {GlobalCustomReduxStorageService.getComplexityMode() !== EditorComplexityEnum.simple
                ? <DragIcon type={AdvancedType.ACCORDION} color='#ccc' label={'Accordion'} />
                : ''
            }

            <DragIcon
                color='rgb(24,201,137)'
                payload={{
                    children: [
                        {
                            type: AdvancedType.COLUMN,
                            data: {
                                value: {},
                            },
                            attributes: {
                                padding: '0px 0px 0px 0px',
                                border: 'none',
                                'vertical-align': 'top',
                            },
                            children: [],
                        },
                        {
                            type: AdvancedType.COLUMN,
                            data: {
                                value: {},
                            },
                            attributes: {
                                padding: '0px 0px 0px 0px',
                                border: 'none',
                                'vertical-align': 'top',
                            },
                            children: [],
                        },
                    ],
                }}
                type={AdvancedType.SECTION}
                label={'Section'}
            />
        </Stack>

        <p />
        <b>Click</b>
        <p />

        <div
            className='moreButton'
            onClick={() => blocksPanelRef.current?.click()}
        >
            <IconFont
                iconName='icon-more'
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    color: 'var(--color-text-2)',
                    boxShadow: '0 0 12px -3px var(--color-text-2)',
                    fontSize: 18,
                }}
                label={'Other'}
            />
        </div>

    </div>
  );
}
