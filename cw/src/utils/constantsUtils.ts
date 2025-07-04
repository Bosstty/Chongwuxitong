// import { ref } from "vue";

import { usePermission } from '@/store/userpermission';
const permissionStrore = usePermission();

let allConstants = permissionStrore.getConstants;

interface ConstantsItem {
    itemId?: string;
    code: string;
    caption: string;
    type: string;
    typeName: string;
    createtime?: string;
}

export function getConstants(type: string): ConstantsItem[] {
    let constantsItemList: ConstantsItem[] = [];

    allConstants.forEach((item: ConstantsItem) => {
        if (item.type == type) {
            constantsItemList.push(item);
        }
    });

    return constantsItemList;
}

/**
 * 代码转文字
 * @param type
 * @param code
 * @returns
 */
export function translateCode2Name(type: string, code: string): string {
    let caption = '';
    allConstants.forEach((item: ConstantsItem) => {
        if (item.type == type && item.code == code) {
            caption = item.caption;
            return;
        }
    });

    return caption;
}
