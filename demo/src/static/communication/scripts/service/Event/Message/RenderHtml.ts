import mjml           from "mjml-browser";
import { JsonToMjml } from "../../../../../../../../packages/easy-email-core/src/utils/JsonToMjml";
import ParentPostMessageEventDispatcher from "../../../../../../services/Event/ParentPostMessageEventDispatcher";
import mustache from "mustache";

type MessageContent = {
    data: Record<string, string>
};

/**
 * @description Handles call from the page which uses CURRENT PROJECT URL in iframe,
 *              as result EasyEmail will receive the template data and returns the rendered html
 */
export default class RenderHtml {

    /**
     * @description indicates that the calling side has invoked the `postMessage` on iframe
     *              as the result the provided template data {@see handleStoreTemplateData}
     *              will be used to render the html - once rendered is sent back to calling side
     *              via posting back given message event: {@see OUTGOING_EVENT_NAME_TEMPLATE_RENDERED}
     */
    public static readonly INCOMING_EVENT_NAME_RENDER_HTML_FOR_TEMPLATE = "renderHtmlForTemplate";

    /**
     * {@see INCOMING_EVENT_NAME_RENDER_HTML_FOR_TEMPLATE}
     */
    public static handleRenderHtmlForTemplate(messageContent: MessageContent): void {
        let body = JSON.parse(messageContent.data.body);

        let mjmlContent =  JsonToMjml({
            data           : JSON.parse(body.content.content),
            context        : JSON.parse(body.content.content),
            mode           : 'production',
            dataSource     : messageContent.data.variables as Object,
        })

        let html = mjml(
            mustache.render(mjmlContent, messageContent.data.variables),
            {
                beautify: true,
                validationLevel: 'soft',
            }
        ).html;

        ParentPostMessageEventDispatcher.dispatchRenderedEmailHtml(html, messageContent.data.trackingId);
    }

}