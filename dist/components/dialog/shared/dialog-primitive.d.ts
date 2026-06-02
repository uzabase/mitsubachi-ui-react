import { default as React } from 'react';
export interface DialogPrimitiveRootProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    children: React.ReactNode;
    /** Variant固有のCSSモジュール */
    variantClassName?: Record<string, string>;
}
/**
 * Base UI Dialog をラップし、共通スタイルと size/variant を適用するルート。
 * DialogContext を消費するため、ActionDialog / InformationDialog / FormDialog の直下で使用すること。
 */
export declare function DialogPrimitiveRoot({ open, defaultOpen, onOpenChange, children, variantClassName, }: DialogPrimitiveRootProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=dialog-primitive.d.ts.map