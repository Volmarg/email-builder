import StoreTemplateData           from './scripts/service/Event/Message/StoreTemplateData';
import RenderHtml                  from './scripts/service/Event/Message/RenderHtml';
import StoreSecret                 from "./scripts/service/Event/Message/StoreSecret";
import StoreTemplateDummyVariables from './scripts/service/Event/Message/StoreTemplateDummyVariables';
import FileUploaded from './scripts/service/Event/Message/FileUploaded';

/**
 * @description this listens for events posted from page which has THIS STATIC PAGE embedded in iframe
 *              for outgoing events {@see ParentPostMessageEventDispatcher}
 */
window.addEventListener("message", (messageContent) => {
    switch(messageContent.data.event){
        case StoreTemplateData.INCOMING_EVENT_NAME_STORE_TEMPLATE_DATA:
            StoreTemplateData.handleStoreTemplateData(messageContent);
            break;

        case RenderHtml.INCOMING_EVENT_NAME_RENDER_HTML_FOR_TEMPLATE:
            RenderHtml.handleRenderHtmlForTemplate(messageContent);
            break;

        case StoreSecret.INCOMING_EVENT_NAME_STORE_SECRET:
            StoreSecret.handleTokenStore(messageContent);
            break;

        case FileUploaded.INCOMING_EVENT_NAME_FILE_UPLOADED:
            FileUploaded.handleFileUpload(messageContent);
            break;

        case StoreTemplateDummyVariables.INCOMING_EVENT_NAME_STORE_TEMPLATE_VARIABLES:
            StoreTemplateDummyVariables.handleStoreTemplateDummyVariables(messageContent)
            break;

        default:
            break;
    }
})