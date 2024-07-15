/**
 * @description dispatches the events to the PARENT project that calls CURRENT project in iframe
 *              for incoming events handling see `demo/src/static/communication/index.js`
 */
export default class ParentPostMessageEventDispatcher {

    /**
     * @description sends request to front to upload the file on THIS project behalf to backend
     */
    public static readonly EVENT_OUTGOING_UPLOAD_FILE = "uploadFile";

    /**
     * @description indicates that user clicked inside the area of the EasyEmail project itself
     */
    public static readonly EVENT_OUTGOING_CLICKED_INSIDE_EMAIL_EDITOR = "clickedInsideEmailEditor";

    /**
     * @description dispatches message to PARENT that user wants to save the updated template,
     *              as result the template data will be saved in PARENT DB
     */
    public static readonly EVENT_OUTGOING_SAVE_TEMPLATE = "saveTemplate";

    /**
     * @description sends back the render html for template,
     */
    private static readonly EVENT_OUTGOING_NAME_TEMPLATE_RENDERED = "templateRendered";

    /**
     * @description sends back the render html for template,
     */
    private static readonly EVENT_OUTGOING_NAME_GET_SECRET = "getSecret";

    /**
     * @see EVENT_OUTGOING_CLICKED_INSIDE_EMAIL_EDITOR
     */
    public static dispatchUserClicked(): void {
        parent.window.postMessage({
            event : ParentPostMessageEventDispatcher.EVENT_OUTGOING_CLICKED_INSIDE_EMAIL_EDITOR,
        }, '*');
    }

    /**
     * @see EVENT_OUTGOING_SAVE_TEMPLATE
     */
    public static dispatchSaveTemplate(templateContent: unknown): void {
        parent.window.postMessage({
            event    : ParentPostMessageEventDispatcher.EVENT_OUTGOING_SAVE_TEMPLATE,
            template : templateContent,
        }, '*');
    }

    /**
     * @see EVENT_OUTGOING_NAME_TEMPLATE_RENDERED
     */
    public static dispatchRenderedEmailHtml(html: unknown, trackerId: string | number | undefined | null): void {
        parent.window.postMessage({
            event     : ParentPostMessageEventDispatcher.EVENT_OUTGOING_NAME_TEMPLATE_RENDERED,
            html      : html,
            trackerId : trackerId,
        }, '*');
    }

    /**
     * @see EVENT_OUTGOING_NAME_GET_SECRET
     */
    public static dispatchGetSecret(): void {
        parent.window.postMessage({
            event : ParentPostMessageEventDispatcher.EVENT_OUTGOING_NAME_GET_SECRET,
        }, '*');
    }

}