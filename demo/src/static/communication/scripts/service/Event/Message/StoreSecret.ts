import LocalStorageReader from "../../../../../../services/Storage/LocalStorageReader";

type MessageContent = {
    data: Record<string, string>
};

/**
 * @description Handles call from the page which uses CURRENT PROJECT URL in iframe,
 *              as result EasyEmail will store secret token which allows user to navigate over its content
 */
export default class StoreSecret {

    /**
     * @description indicates that the calling side has invoked the `postMessage` on iframe
     *              as the result the secret token from front will be saved, for more information see {LocalStorageReader.CALLER_SECRET}
     */
    public static readonly INCOMING_EVENT_NAME_STORE_SECRET = "storeSecret";

    /**
     * {@see INCOMING_EVENT_NAME_STORE_SECRET}
     */
    public static handleTokenStore(messageContent: MessageContent): void {
        if (LocalStorageReader.isCallerSecretSet()) {
            return;
        }

        let token = messageContent.data.i_gap;
        LocalStorageReader.setCallerSecret(token)
    }

}