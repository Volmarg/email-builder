import LocalStorageReader from "../../../../../../services/Storage/LocalStorageReader";

type MessageContent = {
    data: Record<string, string>
};

/**
 * @description Handles call from the page which uses CURRENT PROJECT URL in iframe,
 *              as result EasyEmail will receive and handle the uploaded file data
 */
export default class FileUploaded {

    /**
     * @description indicates that the calling side has invoked the `postMessage` on iframe
     *              as the result the uploaded files data are getting delivered
     */
    public static readonly INCOMING_EVENT_NAME_FILE_UPLOADED = "fileUploaded";

    /**
     * {@see INCOMING_EVENT_NAME_FILE_UPLOADED}
     */
    public static handleFileUpload(messageContent: MessageContent): void {
        LocalStorageReader.setUploadedFilePath(messageContent.data.uploadId, messageContent.data.fileFullPath);
    }

}