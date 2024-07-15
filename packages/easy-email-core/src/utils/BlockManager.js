import { standardBlocks, advancedBlocks } from '@core/blocks';
export class BlockManager {
    static blocksMap = { ...standardBlocks, ...advancedBlocks };
    static autoCompletePath = {};
    static setAutoCompletePath() {
        const paths = {};
        const renderFullPath = (type, pathObj, prevPaths) => {
            const block = this.getBlockByType(type);
            if (!block) {
                throw new Error(`Can you register ${type} block`);
            }
            const currentPaths = [...prevPaths, type];
            if (block.validParentType.length === 0) {
                pathObj.push(currentPaths);
            }
            return block.validParentType.map((item) => {
                return renderFullPath(item, pathObj, currentPaths);
            });
        };
        Object.values(this.blocksMap).forEach((item) => {
            paths[item.type] = [];
            renderFullPath(item.type, paths[item.type], []);
        });
        return paths;
    }
    static getBlocks() {
        return Object.values(this.blocksMap);
    }
    static registerBlocks(blocksMap) {
        this.blocksMap = {
            ...this.blocksMap,
            ...blocksMap,
        };
        this.autoCompletePath = this.setAutoCompletePath();
    }
    static getBlockByType(type) {
        const map = this.getBlocksByType([type]);
        return map[0];
    }
    static getBlocksByType(types) {
        return types.map((item) => {
            const block = Object.values(this.blocksMap).find((child) => {
                return child.type === item;
            });
            return block;
        });
    }
    static getAutoCompleteFullPath() {
        if (Object.keys(this.autoCompletePath).length === 0) {
            this.autoCompletePath = this.setAutoCompletePath();
        }
        return this.autoCompletePath;
    }
    static getAutoCompletePath(type, targetType) {
        const block = this.getBlockByType(type);
        if (!block) {
            throw new Error(`Can you register ${type} block`);
        }
        if (block.validParentType.includes(targetType)) {
            return [];
        }
        const paths = this.getAutoCompleteFullPath()[type].find((item) => item.filter((_, index) => index !== 0).includes(targetType));
        if (!paths)
            return null;
        const findIndex = paths.findIndex((item) => item === targetType);
        return paths.slice(1, findIndex);
    }
}
//# sourceMappingURL=BlockManager.js.map