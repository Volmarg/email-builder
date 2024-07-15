/**
 * @description this components / functions etc. are getting exported for other packages etc.
 *              so that these can get re-used in them
 */
import custom                             from './store/custom';
import GlobalCustomReduxStorageService    from "@demo/services/Storage/GlobalCustomReduxStorageService";
import {EmailComplexityActionsTeleporter} from "./App";
import EnvReader                          from "@demo/services/Env/EnvReader";
import AWN                                from "awesome-notifications"
import * as AwnStyles       from "awesome-notifications/dist/style.css";
import * as AwnCustomStyles from "./styles/awesome-notifications.scss";

// export components
export { LocalStorageReader }                from './services/Storage/LocalStorageReader';
export { EditorComplexityEnum }              from './enum/EditorComplexity';
export { useAppSelector }                    from './hooks/useAppSelector';
export { useLoading }                        from './hooks/useLoading';


/**
 * @description teleporter has to be exported because creating the same teleporter in different packages won't work
 */
export { custom, GlobalCustomReduxStorageService, EmailComplexityActionsTeleporter, EnvReader, AWN, AwnStyles, AwnCustomStyles};
