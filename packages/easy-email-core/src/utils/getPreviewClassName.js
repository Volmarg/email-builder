import { getNodeIdxClassName, getNodeTypeClassName } from './block';
import { classnames } from './classnames';
export function getPreviewClassName(idx, type) {
    return classnames('email-block', idx && getNodeIdxClassName(idx), getNodeTypeClassName(type));
}
//# sourceMappingURL=getPreviewClassName.js.map