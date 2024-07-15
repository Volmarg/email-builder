/* eslint-disable react/jsx-wrap-multilines */
import React, { useCallback, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import template from '@demo/store/template';
import { useAppSelector } from '@demo/hooks/useAppSelector';
import { useLoading } from '@demo/hooks/useLoading';
import { Button, Message, PageHeader, Select } from '@arco-design/web-react';
import { useQuery } from '@demo/hooks/useQuery';
import { useHistory } from 'react-router-dom';
import { cloneDeep, set, isEqual } from 'lodash';
import { Loading } from '@demo/components/loading';
import mjml from 'mjml-browser';
import { copy } from '@demo/utils/clipboard';
import { useEmailModal } from './components/useEmailModal';
import services from '@demo/services';
import {
  IconGithub,
  IconMoonFill,
  IconSunFill,
} from '@arco-design/web-react/icon';
import { Liquid } from 'liquidjs';
import {
  EmailEditor,
  EmailEditorProvider,
  EmailEditorProviderProps,
  IEmailTemplate,
} from 'easy-email-editor';

import { Stack } from '@demo/components/Stack';
import { pushEvent } from '@demo/utils/pushEvent';
import { FormApi } from 'final-form';
import { UserStorage } from '@demo/utils/user-storage';

import { useCollection } from './components/useCollection';
import {
  AdvancedType,
  BasicType,
  getPageIdx,
  IBlockData,
  JsonToMjml,
} from 'easy-email-core';
import { BlockMarketManager, SimpleLayout } from 'easy-email-extensions';

// Register external blocks
import './components/CustomBlocks';

import 'easy-email-editor/lib/style.css';
import 'easy-email-extensions/lib/style.css';
import blueTheme from '@arco-themes/react-easy-email-theme/css/arco.css?inline';
import purpleTheme from '@arco-themes/react-easy-email-theme-purple/css/arco.css?inline';
import greenTheme from '@arco-themes/react-easy-email-theme-green/css/arco.css?inline';
import { useState } from 'react';
import { useMergeTagsModal } from './components/useMergeTagsModal';
import ParentPostMessageEventDispatcher from "@demo/services/Event/ParentPostMessageEventDispatcher";
import Security from "@demo/services/Security/Security";
import StoreTemplateDummyVariables
  from "@demo/static/communication/scripts/service/Event/Message/StoreTemplateDummyVariables";

const imageCompression = import('browser-image-compression');

const fontList = [
  'Arial',
  'Verdana',
  'Georgia',
  'Times New Roman',
  'Courier',
].map((item) => ({ value: item, label: item }));

export default function Editor() {
  let allowedVariables = StoreTemplateDummyVariables.getFromStorage();
  let isSaveEnabled = true;

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [theme, setTheme] = useState<'blue' | 'green' | 'purple'>('blue');
  const dispatch = useDispatch();
  const history = useHistory();
  const templateData = useAppSelector('template');
  const { addCollection, removeCollection, collectionCategory } =
    useCollection();
  const { openModal, modal } = useEmailModal();
  const { id, userId } = useQuery();
  const loading = useLoading(template.loadings.fetchById);
  const { modal: mergeTagsModal, openModal: openMergeTagsModal, mergeTags, setMergeTags } = useMergeTagsModal(allowedVariables);

  const isSubmitting = useLoading([
    template.loadings.create,
    template.loadings.updateById,
  ]);

  useEffect(() => {
    if (collectionCategory) {
      BlockMarketManager.addCategories([collectionCategory]);
      return () => {
        BlockMarketManager.removeCategories([collectionCategory]);
      };
    }
  }, [collectionCategory]);

  useEffect(() => {
    if (id) {
      if (!userId) {
        UserStorage.getAccount().then((account) => {
          dispatch(
            template.actions.fetchById(undefined)
          );
        });
      } else {
        dispatch(template.actions.fetchById(undefined));
      }
    } else {
      dispatch(template.actions.fetchDefaultTemplate(undefined));
    }

    return () => {
      dispatch(template.actions.set(null));
    };
  }, [dispatch, id, userId]);

  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute('arco-theme', 'dark');
    } else {
      document.body.removeAttribute('arco-theme');
    }
  }, [isDarkMode]);

  const onUploadImage = async (blob: Blob) => {
    const compressionFile = await (
      await imageCompression
    ).default(blob as File, {
      maxWidthOrHeight: 1440,
    });
    return services.common.uploadByCallToFrontProject(compressionFile);
  };

  const onChangeTheme = useCallback((t) => {
    setTheme(t);
  }, []);

  const onChangeMergeTag = useCallback((path: string, val: any) => {
    setMergeTags((old) => {
      const newObj = cloneDeep(old);
      set(newObj, path, val);
      return newObj;
    });
  }, []);


  const onPreview = (values: IEmailTemplate) => {
    const html = mjml(
      JsonToMjml({
        data: values.content,
        mode: 'production',
        context: values.content,
        dataSource: mergeTags,
      }),
      {
        beautify: true,
        validationLevel: 'soft',
      }
    ).html;

  };

  const onExportMJML = (values: IEmailTemplate) => {
    pushEvent({ name: 'ExportMJML' });
    const html = JsonToMjml({
      data: values.content,
      mode: 'production',
      context: values.content,
      dataSource: mergeTags,
    });

    copy(html);
    Message.success('Copied to pasteboard!');
  };

  const initialValues: IEmailTemplate | null = useMemo(() => {
    if (!templateData) return null;
    const sourceData = cloneDeep(templateData.content) as IBlockData;
    return {
      ...templateData,
      content: sourceData, // replace standard block
    };
  }, [templateData]);


  const onSubmit = useCallback(
    async (
      values: IEmailTemplate,
      form: FormApi<IEmailTemplate, Partial<IEmailTemplate>>
    ) => {
      //@ts-ignore - also explanation to this is inside the html markup in this file

      let sleep = (time) => {
        return new Promise((resolve) => setTimeout(resolve, time));
      }

      // it's not necessarily the proper value, but tried to find the lowest, most suitable one
      isSaveEnabled = false;
      await sleep(500);
      //@ts-ignore
      let windowValues = window.vals;

      pushEvent({ name: 'Save' });

      /**
       * The original `save` logic is a bit messed up, so when saving data in current form it won't let You load them back
       * Thus the necessity of changing the saved json structure a bit before triggering the save
       */
      let normalizedTemplateData = {
        content: {
          content: JSON.stringify(windowValues.content),
        },
        summary      : windowValues.subject,
        title        : windowValues.subject,
        templateName : windowValues.templateName,
      };

      ParentPostMessageEventDispatcher.dispatchSaveTemplate(normalizedTemplateData);

      // little sleep because front will dispatch ajax call and show spinner on its own
      await sleep(200);
      isSaveEnabled = true;
    },
    [dispatch, history, id, initialValues]
  );

  const onBeforePreview: EmailEditorProviderProps['onBeforePreview'] =
    useCallback((html: string, mergeTags) => {
      const engine = new Liquid();
      const tpl = engine.parse(html);
      return engine.renderSync(tpl, mergeTags);
    }, []);

  const themeStyleText = useMemo(() => {
    if (theme === 'green') return greenTheme;
    if (theme === 'purple') return purpleTheme;
    return blueTheme;
  }, [theme]);

  if (!templateData && loading) {
    return (
      <Loading loading={loading}>
        <div style={{ height: '100vh' }} />
      </Loading>
    );
  }

  if (!initialValues) return null;

  return (
    <div>
      <style>{themeStyleText}</style>
      {Security.isAccessGranted()}
      <EmailEditorProvider
        key={id}
        height={'calc(100vh - 65px)'}
        data={initialValues}
        // interactiveStyle={{
        //   hoverColor: '#78A349',
        //   selectedColor: '#1890ff',
        // }}
        // onAddCollection={addCollection}
        // onRemoveCollection={({ id }) => removeCollection(id)}
        onUploadImage={onUploadImage}
        fontList={fontList}
        onSubmit={onSubmit}
        onChangeMergeTag={onChangeMergeTag}
        autoComplete
        enabledLogic
        // enabledMergeTagsBadge
        dashed={false}
        mergeTags={mergeTags}
        mergeTagGenerate={(tag) => `{{${tag}}}`}
        onBeforePreview={onBeforePreview}
      >
        {({ values }, { submit }) => {
          /**
           * There is an issue inside this project itself, it's not related to my customizations.
           * Problem is that if You enter something in input, and click save very fast, then the value is not
           * yet there (only guessing that there is some wild async based logic?)
           *
           * Regardless, found out that the values in here, assigned to window are proper.
           * Need to use window based assignment as the const / let ones are otherwise not available
           * in code above
           */
          //@ts-ignore
          {window.vals = values;}
          return (
            <>
              <PageHeader
                style={{ background: 'var(--color-bg-2)' }}
                title='Email template builder'
                extra={
                  <Stack alignment='center'>

                    <Button
                      loading={isSubmitting}
                      type='primary'
                      onClick={() => submit()}
                      disabled={!isSaveEnabled}
                      style={{
                        width: "83px",
                        borderRadius: "8px",
                        fontWeight: "bold",
                        fontSize: "15px",
                      }}
                    >
                      Save
                    </Button>
                  </Stack>
                }
              />
              <SimpleLayout>
                <EmailEditor />
              </SimpleLayout>
            </>
          );
        }}
      </EmailEditorProvider>
      {modal}
      {mergeTagsModal}
    </div>
  );
}

function replaceStandardBlockToAdvancedBlock(blockData: IBlockData) {
  const map = {
    [BasicType.TEXT]: AdvancedType.TEXT,
    [BasicType.BUTTON]: AdvancedType.BUTTON,
    [BasicType.IMAGE]: AdvancedType.IMAGE,
    [BasicType.DIVIDER]: AdvancedType.DIVIDER,
    [BasicType.SPACER]: AdvancedType.SPACER,
    [BasicType.SOCIAL]: AdvancedType.SOCIAL,
    [BasicType.ACCORDION]: AdvancedType.ACCORDION,
    [BasicType.CAROUSEL]: AdvancedType.CAROUSEL,
    [BasicType.NAVBAR]: AdvancedType.NAVBAR,
    [BasicType.WRAPPER]: AdvancedType.WRAPPER,
    [BasicType.SECTION]: AdvancedType.SECTION,
    [BasicType.GROUP]: AdvancedType.GROUP,
    [BasicType.COLUMN]: AdvancedType.COLUMN,
  };

  if (map[blockData.type]) {
    blockData.type = map[blockData.type];
  }
  blockData.children.forEach(replaceStandardBlockToAdvancedBlock);
  return blockData;
}
