import { LinkTagProps } from '../link-tag';
export interface LinkTagGroupProps {
    /**
     * 表示するタグの配列
     */
    tags: Array<LinkTagProps & {
        id?: string;
    }>;
}
export declare const LinkTagGroup: ({ tags }: LinkTagGroupProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=LinkTagGroup.d.ts.map