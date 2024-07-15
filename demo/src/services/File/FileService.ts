export default class FileService {

    /**
     * @description takes the file and return it as base64
     */
    public static getBase64Content(file: File): Promise<string> {
        /**
         * @description Based on {@link https://github.com/lian-yue/vue-upload-component/issues/317}
         */
        return new Promise((resolve, reject) => {

            let fileReader   = new FileReader();
            let errorHandler = () => {}

            fileReader.onloadend = () => {
                let base64FileContent = fileReader.result as string;

                let base64regexp     = new RegExp(/data:.*;base64,/);
                let base64Normalized = base64FileContent.replace(base64regexp,"");

                resolve(base64Normalized);
            };

            fileReader.onerror = () => {
                errorHandler()
                reject();
            }

            fileReader.onabort = () => {
                errorHandler()
                reject();
            }

            if (file) {
                fileReader.readAsDataURL(file);
            } else {
                reject();
            }

        });

    }
}