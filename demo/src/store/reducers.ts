import { combineReducers } from '@reduxjs/toolkit';

import user from './user';
import template from './template';
import templateList from './templateList';
import extraBlocks from './extraBlocks';
import toast from './common/toast';
import loading from './common/loading';
import email from './email';
import custom from "./custom";

const rootReducer = combineReducers({
  user: user.reducer,
  template: template.reducer,
  templateList: templateList.reducer,
  extraBlocks: extraBlocks.reducer,
  toast: toast.reducer,
  email: email.reducer,
  loading: loading.reducer,
  custom: custom.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;