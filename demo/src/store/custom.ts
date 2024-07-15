import createSliceState       from './common/createSliceState';
import {EditorComplexityEnum} from "@demo";

export default createSliceState({
  name: 'custom',
  initialState: {
    // the ?. is added only because of issues with start page, or spinner, loading assets etc. (sounds weird but this project seems to have some central middleware),
    complexityMode: EditorComplexityEnum?.simple,
  },
  reducers: {
    /**
     * @description sets the used complexity mode in the store
     */
    setComplexityMode: (state, action) => {
      state.complexityMode = action.payload;
      return state;
    },
  },
  effects: {}
});
