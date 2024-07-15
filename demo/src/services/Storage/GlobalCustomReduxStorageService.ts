import {createStore} from "redux";
import {custom, LocalStorageReader} from "@demo";

/**
 * @description handles working with redux global store. This was added in order to access the store around the whole project
 */
export default class GlobalCustomReduxStorageService {

    /**
     * @description will register the custom store globally so that it can be accessed on every page etc.
     */
    public static registerGlobalStore(): void {
        //@ts-ignore
        window.store = createStore(custom.reducer)
        let localStorageComplexityMode = LocalStorageReader.getComplexityMode();
        if (null !== localStorageComplexityMode) {
            GlobalCustomReduxStorageService.setComplexityMode(localStorageComplexityMode);
        }
    }

    /**
     * @description set complexity mode in the global custom store
     */
    public static setComplexityMode(complexityMode: string): void {
        //@ts-ignore
        window.store.dispatch(custom.actions.setComplexityMode(complexityMode));
    }

    /**
     * @description get complexity mode from the global custom store
     */
    public static getComplexityMode(): string {
        //@ts-ignore
        return window.store.getState().complexityMode;
    }

}