import React from 'react';
import { AdvancedType } from 'easy-email-core';
import { Stack, TextStyle } from 'easy-email-editor';

import { TextBlockItem } from './TextBlockItem';
import { SpacerBlockItem } from './SpacerBlockItem';
import { DividerBlockItem } from './DividerBlockItem';
import { ButtonBlockItem } from './ButtonBlockItem';
import { SocialBlockItem } from './SocialBlockItem';
import { WrapperBlockItem } from './WrapperBlockItem';
import { SectionBlockItem } from './SectionBlockItem';
import { GroupBlockItem } from './GroupBlockItem';

/**
 * @description options in the "other" popup
 */
export const defaultCategories = [
  {
    title: 'Content',
    name: 'CONTENT',
    blocks: [
      {
        type: AdvancedType.TEXT,
        title: 'Text',
        description: 'This block allows you to display text in your email.',
        component: TextBlockItem,
      },
      {
        type: AdvancedType.BUTTON,
        title: 'Button',
        description: 'Displays a customizable button.',
        component: ButtonBlockItem,
      },
      {
        type: AdvancedType.SPACER,
        title: 'Spacer',
        description: 'Displays a blank space.',
        component: SpacerBlockItem,
      },
      {
        type: AdvancedType.DIVIDER,
        title: 'Divider',
        description: `Displays a horizontal divider that can be customized like a
        HTML border.`,
        component: DividerBlockItem,
      },
      {
        type: AdvancedType.SOCIAL,
        title: 'Social',
        description: `Displays calls-to-action for various social networks with
        their associated logo.`,
        component: SocialBlockItem,
      },
    ],
  },
  {
    title: 'Layout',
    name: 'LAYOUT',
    blocks: [
      {
        type: AdvancedType.WRAPPER,
        title: 'Wrapper',
        description: `Wrapper enables to wrap multiple sections together. It's especially useful to achieve nested layouts with shared border or background images across sections.
        `,
        component: WrapperBlockItem,
      },
      {
        type: AdvancedType.SECTION,
        title: 'Section',
        description: (
          <Stack vertical spacing='none'>
            <TextStyle>
              Sections are intended to be used as rows within your email. They
              will be used to structure the layout.
            </TextStyle>
            <TextStyle>
              Sections cannot nest in sections. Columns can nest in sections;
              all content must be in a column.
            </TextStyle>
          </Stack>
        ),
        component: SectionBlockItem,
      },
      {
        type: AdvancedType.GROUP,
        title: 'Group',
        description: `Group allows you to prevent columns from stacking on
          mobile. To do so, wrap the columns inside a group
          block, so they'll stay side by side on mobile.`,
        component: GroupBlockItem,
      },
    ],
  },
];
