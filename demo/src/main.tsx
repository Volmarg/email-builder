import { render } from 'react-dom';
import React      from 'react';
import App        from './App';

import ParentPostMessageEventDispatcher from "@demo/services/Event/ParentPostMessageEventDispatcher";

render(<App />, document.getElementById('root'));

/**
 * @description events sent to the parent window whenever clicking inside the EasyEmail
 **/
window.addEventListener('click', () => {
    ParentPostMessageEventDispatcher.dispatchUserClicked();
});