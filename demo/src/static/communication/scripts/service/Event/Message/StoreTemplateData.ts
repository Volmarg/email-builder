/**
 * @descriptionHandles call from the page which uses CURRENT PROJECT URL in iframe,
 *                     as result EasyEmail will receive the template data to store for further usage
 */

export default class StoreTemplateData {

    /**
     * @description indicates that the calling side has invoked the `postMessage` on iframe
     *              as the result the provided template will be stored in local storage for further re-usage
     */
    public static readonly INCOMING_EVENT_NAME_STORE_TEMPLATE_DATA = 'storeTemplateData';

    /**
     * @see StoreTemplateData.INCOMING_EVENT_NAME_STORE_TEMPLATE_DATA
     */
    public static handleStoreTemplateData(messageContent): void {

        let storageData = {
            body       : messageContent.data.body,
            variables  : messageContent.data.variables,
            trackingId : messageContent.data.trackingId ?? null,
        };

        localStorage.setItem(
            messageContent.data.sessionKey,
            JSON.stringify(storageData)
        );
    }

}