/**
 * @description handles the local storage based logic
 * @info my-private-customization
 */
export default class LocalStorageReader {

    /**
     * @description used for checking if the call to the project is correct,
     *              this project is embedded in iframe on front so in order to deny users calling
     *              the iframe url directly, this special token is being set from
     *              the front, and only then anything on the easy-email can be called
     */
    private static readonly CALLER_SECRET = "i_gap";

    /**
     * @description stores the information about editor panel complexity,
     *              based on what user selects some options will be hidden / shown
     */
    private static readonly COMPLEXITY_MODE = "complexity_mode";

    /**
     * @description contains the upload ids with associated uploaded files paths
     */
    private static readonly UPLOADED_FILES = "uploaded_files";

    /**
     * @description set the secret used for validating if the caller for the project is valid
     */
    public static setCallerSecret(secret: string): void
    {
        localStorage.setItem(LocalStorageReader.CALLER_SECRET, secret);
    }

    /**
     * @description get the caller secret or null if is not set
     */
    public static getCallerSecret(): string | null
    {
        return localStorage.getItem(LocalStorageReader.CALLER_SECRET);
    }

    /**
     * @description removes the caller secret
     */
    public static removeCallerSecret(): void
    {
        localStorage.removeItem(LocalStorageReader.CALLER_SECRET);
    }

    /**
     * @description check if the caller secret is set at all
     */
    public static isCallerSecretSet(): boolean
    {
        return (null !== LocalStorageReader.getCallerSecret());
    }

    /**
     * @description sets the currently active editor complexity mode
     */
    public static setComplexityMode(complexityMode: string): void {
        localStorage.setItem(LocalStorageReader.COMPLEXITY_MODE, complexityMode);
    }

    /**
     * @description gets the currently active editor complexity mode
     */
    public static getComplexityMode(): string | null {
        return localStorage.getItem(LocalStorageReader.COMPLEXITY_MODE);
    }

    /**
     * @description will try to obtain the uploaded file path for upload id
     */
    public static getUploadedFilePath(uploadId: string): string | null {
        let uploadedFiles = localStorage.getItem(LocalStorageReader.UPLOADED_FILES);
        if (!uploadedFiles) {
            return null;
        }

        let object = JSON.parse(uploadedFiles);
        if (!object[uploadId]) {
            return null;
        }

        return object[uploadId];
    }

    /**
     * @description gets the currently active editor complexity mode
     */
    public static setUploadedFilePath(uploadId: string, filePath: string): void {
        let uploadedFiles = localStorage.getItem(LocalStorageReader.UPLOADED_FILES);
        if (!uploadedFiles) {
            let uploadedFiles = {
                [uploadId]: filePath
            };
            localStorage.setItem(LocalStorageReader.UPLOADED_FILES, JSON.stringify(uploadedFiles));
            return;
        }

        let uploadedFilesObject       = JSON.parse(uploadedFiles);
        uploadedFilesObject[uploadId] = filePath;

        localStorage.setItem(LocalStorageReader.UPLOADED_FILES, JSON.stringify(uploadedFilesObject));
    }

}

export {LocalStorageReader}