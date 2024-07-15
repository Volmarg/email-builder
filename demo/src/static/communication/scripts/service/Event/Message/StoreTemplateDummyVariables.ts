/**
 * @descriptionHandles call from the page which uses CURRENT PROJECT URL in iframe,
 *                     as result EasyEmail will receive the DUMMY template variables for further usage
 */
export default class StoreTemplateDummyVariables {

    /**
     * @description indicates that the calling side has invoked the `postMessage` on iframe
     *              as the result the provided variables will be stored in local storage for further re-usage
     */
    public static readonly INCOMING_EVENT_NAME_STORE_TEMPLATE_VARIABLES = 'storeDummyTemplateVariables';
    public static readonly STORAGE_KEY_DUMMY_TEMPLATE_VARIABLES         = 'dummyTemplateVariables';

    /**
     * @see StoreTemplateData.INCOMING_EVENT_NAME_STORE_TEMPLATE_VARIABLES
     */
    public static handleStoreTemplateDummyVariables(messageContent): void {
        localStorage.setItem(
            StoreTemplateDummyVariables.STORAGE_KEY_DUMMY_TEMPLATE_VARIABLES,
            JSON.stringify(messageContent.data.variables)
        );
    }

    /**
     * @description returns the dummy variables stored in local storage
     */
    public static getFromStorage(): Object {
        let variablesJson = localStorage.getItem(StoreTemplateDummyVariables.STORAGE_KEY_DUMMY_TEMPLATE_VARIABLES);
        if (null === variablesJson) {
            throw Error("There are no dummy variables set under local storage key: " + StoreTemplateDummyVariables.STORAGE_KEY_DUMMY_TEMPLATE_VARIABLES);
        }

        return JSON.parse(variablesJson);
    }

}