/**
 * @description handles reading global env vars
 * @info my-private-customization
 */
export default class EnvReader
{
    static readonly MODE_DEVELOPMENT = 'development';

    /**
     * @description check if system in DEV mode
     */
    public static isDev(): boolean {
        let currentMode = process.env.NODE_ENV as string;
        return (currentMode === EnvReader.MODE_DEVELOPMENT);
    }

    /**
     * @description get the domain with protocol on which this project is going to be accessible
     */
    public static getDomainWithProtocol(): string {
        if (EnvReader.isDev()) {
            return 'http://11.8.1.6/';
        }

        return "http://12.9.1.6/";
    }
}