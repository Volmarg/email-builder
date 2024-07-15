export class ImageManager {
    static map = {};
    static overrideMap = {};
    static add(imgMap) {
        Object.keys(imgMap).forEach(name => {
            if (this.map[name]) {
                this.overrideMap[name] = true;
            }
            this.map[name] = imgMap[name];
        });
    }
    static get(name) {
        return this.map[name];
    }
    static getOverrideMap() {
        return this.overrideMap;
    }
}
//# sourceMappingURL=ImageManager.js.map