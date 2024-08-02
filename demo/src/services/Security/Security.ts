import EnvReader          from "@demo/services/Env/EnvReader";
import Md5Service         from "@demo/services/Encryption/Md5Service";
import LocalStorageReader from "@demo/services/Storage/LocalStorageReader";
import ParentPostMessageEventDispatcher from "@demo/services/Event/ParentPostMessageEventDispatcher";

/**
 * @description handles some security based matters
 * @info my-private-customization
 */
export default class Security
{
    /**
     * @description check if access to the project is granted
     */
    static isAccessGranted(): boolean {
        return (
                EnvReader.isDev()
            ||  Security.isCallerSecretValid()
        );
    }

    /**
     * @description check if caller secret is valid
     *              for more information see {@see LocalStorageReader.CALLER_SECRET}
     *
     * @important the logic for checking if caller secret is valid must be in sync with front, since the
     *            front is setting the secret and easy-email is using same process to determine if secret is correct
     *
     *            See {Front.EasyEmailSecretHandler.generateKey}
     *
     * @keep-in-mind that actually user can generate the secret with this code in here as it's the same
     *               as on {Front.EasyEmailSecretHandler.generateKey} but the point is that rarely anyone will want to
     *               do that and will need to dig through the obfuscated code etc.
     *
     *               Even if he does manage to open the page, then what? Can't do really anything because events such
     *               as "saving template" are also handled by backend and user jwt token is used for that so,
     *               - incorrect Front means no jwt,
     *               - no jwt means not working save,
     *
     *               And if someone will  somehow manipulate the code and send the data then it's his problem if he breaks
     *               something for his account.
     */
    static isCallerSecretValid(): boolean
    {
        // open source - nobody cares about this anymore
        return true;
        let multiplier        = 10;
        let divider           = 30;
        let addition          = 987;
        let currentDateNumber = (new Date().getUTCFullYear()) + (new Date().getDate());

        let rawNumberSecret = ((currentDateNumber * multiplier) / divider) + addition;
        let md5Secret       = Md5Service.hash(rawNumberSecret.toString());

        if (!LocalStorageReader.getCallerSecret()) {
            LocalStorageReader.removeCallerSecret();
            ParentPostMessageEventDispatcher.dispatchGetSecret()

            // refresh the secret
            if (!LocalStorageReader.getCallerSecret()) {
                LocalStorageReader.removeCallerSecret();
                return false;
            }

            return true;
        }

        return (md5Secret === LocalStorageReader.getCallerSecret());
    }
}