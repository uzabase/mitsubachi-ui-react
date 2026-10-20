import { CheckboxRoot } from '@base-ui/react/checkbox';
import { ContextMenuRadioGroupProps } from '@base-ui/react';
import { default as default_2 } from 'react';
import { JSX } from 'react';
import { Menu as Menu_2 } from '@base-ui/react/menu';
import { MenuRootProps } from '@base-ui/react/menu';
import { ReactNode } from 'react';
import { TabsRoot } from '@base-ui/react/tabs';
import { TabsTab } from '@base-ui/react/tabs';

/**
 * Action Dialog
 *
 * 確認や削除など、ユーザーの意思決定を求めるダイアログ。
 * Desktop: size=small、Phone: 横に余白を持ち、高さは広がらない。
 *
 * Base UI の Dialog をベースに実装しています。
 * @see https://base-ui.com/react/components/dialog
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 */
export declare const ActionDialog: typeof ActionDialogRoot & {
    Header: typeof DialogHeader;
    Body: typeof DialogBody;
    Footer: typeof DialogFooter;
};

export declare interface ActionDialogBodyProps {
    children: default_2.ReactNode;
}

export declare interface ActionDialogFooterProps {
    /** キャンセル・閉じるボタンのラベル。省略時はキャンセルボタンを表示しない */
    cancelLabel?: string;
    /** キャンセルボタンクリック時のコールバック */
    onCancel?: () => void;
    /** アクションボタンのラベル */
    actionLabel: string;
    /** アクションボタンクリック時のコールバック */
    onAction?: () => void;
}

export declare interface ActionDialogHeaderProps {
    /** ヘッダーに表示するタイトルテキスト */
    text: string;
}

declare function ActionDialogRoot({ open, defaultOpen, onOpenChange, size, children, }: ActionDialogRootProps): default_2.JSX.Element;

export declare interface ActionDialogRootProps {
    /** 開閉状態（制御用） */
    open?: boolean;
    /** 初期の開閉状態（非制御用） */
    defaultOpen?: boolean;
    /** 開閉状態が変わったときのコールバック */
    onOpenChange?: (open: boolean) => void;
    /**
     * ダイアログのサイズ（Desktop 時）
     * @default 'small'
     */
    size?: ActionDialogSize;
    children: default_2.ReactNode;
}

/** Action Dialog のサイズ（Desktop 時は small のみ） */
export declare type ActionDialogSize = 'small';

/**
 * 画面遷移を伴わずに特定のアクションを実行するメニュー項目
 *
 * 選択すると、データの更新、実行、削除などの操作が即座に実行される。
 * データの削除や取り消し困難な変更など、不可逆的な操作にはvariant="danger"を使用する。
 *
 * @example
 * ```tsx
 * <ActionMenuItem onClick={handleEdit}>編集</ActionMenuItem>
 * <ActionMenuItem variant="danger" onClick={handleDelete}>削除</ActionMenuItem>
 * ```
 */
export declare const ActionMenuItem: ({ variant, disabled, icon, supportText, onClick, children, }: ActionMenuItemProps) => default_2.JSX.Element;

/** ActionMenuItem の Props */
export declare interface ActionMenuItemProps {
    /**
     * バリアント。dangerは削除などの破壊的操作に使用
     * @default 'neutral'
     */
    variant?: ActionMenuItemVariant;
    /**
     * 無効化状態。クリック操作が無効になり、テキストとアイコンが淡色表示になる
     * @default false
     */
    disabled?: boolean;
    /** ラベルの先頭に表示するアイコン */
    icon?: default_2.ReactNode;
    /** ラベル下に表示する補助テキスト */
    supportText?: string;
    /** クリック時のコールバック */
    onClick?: (event: default_2.MouseEvent) => void;
    /** メニュー項目のラベル */
    children: default_2.ReactNode;
}

/** ActionMenuItem のバリアント */
export declare type ActionMenuItemVariant = 'neutral' | 'danger';

export declare const AiChatArea: ({ placeholder, value, onValueChange, onSubmit, onStop, state, segmentValue, defaultSegmentValue, onSegmentValueChange, children, }: AiChatAreaProps) => default_2.JSX.Element;

export declare interface AiChatAreaProps {
    /** プレースホルダーテキスト @default '質問を入力...' */
    placeholder?: string;
    /** 入力値（controlled） */
    value?: string;
    /** 入力値変更時のコールバック */
    onValueChange?: (value: string) => void;
    /** 送信時のコールバック */
    onSubmit?: () => void;
    /** 停止時のコールバック（in-progress状態で使用） */
    onStop?: () => void;
    /** コンポーネントの状態 @default 'default' */
    state?: AiChatAreaState;
    /** デフォルトのAiChatSegmentedControlの選択値（controlled）。childrenで上書き時は無視される */
    segmentValue?: AiChatSegmentValue;
    /** デフォルトのAiChatSegmentedControlの初期値（uncontrolled）。childrenで上書き時は無視される @default 'deep' */
    defaultSegmentValue?: AiChatSegmentValue;
    /** デフォルトのAiChatSegmentedControlの値変更時コールバック。childrenで上書き時は無視される */
    onSegmentValueChange?: (value: AiChatSegmentValue) => void;
    /** オプションスロットを上書きする場合に使用（デフォルトはAiChatSegmentedControl） */
    children?: default_2.ReactNode;
}

/** AiChatAreaの状態 */
export declare type AiChatAreaState = 'default' | 'in-progress' | 'disabled';

export declare const AiChatFooter: ({ disclaimer, children, }: AiChatFooterProps) => default_2.JSX.Element;

export declare interface AiChatFooterProps {
    /** 免責文テキスト */
    disclaimer?: string;
    /** AiChatArea等のコンテンツ */
    children?: default_2.ReactNode;
}

export declare const AiChatHeader: ({ title, newSession, onNewChatClick, onToggleSizeClick, onMinimizeClick, }: AiChatHeaderProps) => JSX.Element;

export declare interface AiChatHeaderProps {
    /** 表示タイトル @default 'AI Research β版' */
    title?: string;
    /** 新規セッションかどうか @default true */
    newSession?: boolean;
    /** 新規チャットボタンクリック時のコールバック */
    onNewChatClick?: () => void;
    /** サイズ切り替えボタンクリック時のコールバック */
    onToggleSizeClick?: () => void;
    /** 最小化ボタンクリック時のコールバック */
    onMinimizeClick?: () => void;
}

/** 履歴アイテム */
export declare interface AiChatHistoryItem {
    /** 一意な識別子 */
    id: string;
    /** 履歴のタイトル */
    title: string;
    /** 履歴のリンク先URL */
    url: string;
}

export declare const AiChatSegmentedControl: ({ value: valueProp, defaultValue, onValueChange, disabled, }: AiChatSegmentedControlProps) => JSX.Element;

export declare interface AiChatSegmentedControlProps {
    /** 選択中の値（controlled） */
    value?: AiChatSegmentValue;
    /** 初期値（uncontrolled） @default 'deep' */
    defaultValue?: AiChatSegmentValue;
    /** 値変更時のコールバック */
    onValueChange?: (value: AiChatSegmentValue) => void;
    /** 無効化状態 @default false */
    disabled?: boolean;
}

/** セグメントの値 */
export declare type AiChatSegmentValue = 'flash' | 'deep';

/** arrow-down アイコン */
export declare const ArrowDownIcon: () => JSX.Element;

/** arrow-up アイコン */
export declare const ArrowUpIcon: () => JSX.Element;

/** arrow-up-small（上矢印小）アイコン */
export declare const ArrowUpSmallIcon: ({ size }: {
    size?: 18 | 20 | 24;
}) => JSX.Element;

/** bookmark アイコン */
export declare const BookmarkIcon: ({ size }: {
    size?: 18 | 20 | 22 | 24;
}) => JSX.Element;

/**
 * 項目の選択・解除を行うためのコンポーネントです。
 * 有効（チェックなし）、有効（チェックあり）、一部有効（中間状態）の3つの選択状態があります。
 *
 * 複数選択が可能です。複数の選択肢から1つを選択する場合は、RadioButtonを使用してください。
 *
 * @example
 * ```tsx
 * // 非制御
 * <Checkbox defaultChecked={false} />
 *
 * // 制御
 * <Checkbox checked={checked} onCheckedChange={(value) => setChecked(value)} />
 *
 * // 中間状態
 * <Checkbox indeterminate={true} />
 * ```
 */
export declare const Checkbox: ({ checked, defaultChecked, indeterminate, disabled, onCheckedChange, name, value, required, readOnly, id, inputRef, ref, ...rest }: CheckboxProps) => JSX.Element;

export declare interface CheckboxProps extends Omit<React.ComponentPropsWithoutRef<'span'>, 'checked' | 'defaultChecked' | 'children' | 'onChange'> {
    /** チェック状態（制御コンポーネント用） */
    checked?: boolean;
    /** 初期チェック状態（非制御コンポーネント用） @default false */
    defaultChecked?: boolean;
    /** 中間状態（親子チェックボックスなど） @default false */
    indeterminate?: boolean;
    /** 無効化状態 @default false */
    disabled?: boolean;
    /** チェック状態の変更ハンドラ */
    onCheckedChange?: (checked: boolean, eventDetails: CheckboxRoot.ChangeEventDetails) => void;
    /** フォーム送信時のname属性 */
    name?: string;
    /** フォーム送信時のvalue属性 */
    value?: string;
    /** 必須入力 @default false */
    required?: boolean;
    /** 読み取り専用 @default false */
    readOnly?: boolean;
    /** input要素のid */
    id?: string;
    /** 隠し<input>要素へのref。フォームライブラリとの連携に使用する */
    inputRef?: React.Ref<HTMLInputElement>;
    /** ルート要素へのref。外部からのフォーカス制御に使用する */
    ref?: React.Ref<HTMLElement>;
}

/** check（✓）アイコン（サイズは親要素の CSS で制御） */
export declare const CheckIcon: () => JSX.Element;

/** chevron-down アイコン（サイズは親要素の CSS で制御） */
export declare const ChevronDownIcon: () => JSX.Element;

/**
 * chevron-right アイコン（サイズは親要素の CSS で制御）
 *
 * アスペクト比が正方形でないため、親要素の CSS に
 * サイズ制御を委譲する方式を採用している。
 */
export declare const ChevronRightIcon: () => JSX.Element;

/** close（×）アイコン */
export declare const CloseIcon: () => JSX.Element;

export declare interface ColumnConfig<K extends string = string> {
    /** 切り替え可能な項目一覧 */
    options: readonly ColumnOption<K>[];
    /** 初期選択キー（省略時は最初の項目） */
    defaultKey?: K;
}

export declare interface ColumnOption<K extends string = string> {
    /** データキー */
    key: K;
    /** 表示ラベル */
    label: string;
}

export declare interface ColumnState<K extends string = string> {
    /** 現在のデータキー */
    currentKey: K;
    /** 現在のヘッダーラベル */
    currentLabel: string;
    /** TableHeaderCell の menuItems に渡す項目（選択中にチェック付き） */
    menuItems: TableHeaderMenuItem[];
}

/** copy アイコン */
export declare const CopyIcon: ({ size }: {
    size?: 18 | 20 | 22 | 24;
}) => JSX.Element;

/** ×（クロス）アイコン */
export declare const CrossIcon: () => JSX.Element;

/**
 * Dialog の本文エリア。Slot として任意のコンテンツを受け取る。
 * スクロール位置に応じて、HeaderとFooterに動的に仕切り線を表示する。
 * - 上部が隠れている（スクロールダウンしている）: Headerの下に仕切り線
 * - 下部が隠れている（まだスクロールできる）: Footerの上に仕切り線
 */
declare function DialogBody({ children }: DialogBodyProps): default_2.JSX.Element;

declare interface DialogBodyProps {
    children: default_2.ReactNode;
}

/**
 * Dialog のフッター。キャンセルとアクションの 2 種類のボタンを持つ。
 * キャンセルなしのパターンは cancelLabel を省略する。
 */
declare function DialogFooter({ cancelLabel, onCancel, actionLabel, onAction, }: DialogFooterProps): JSX.Element;

declare interface DialogFooterProps {
    /** キャンセル・閉じるボタンのラベル。省略時はキャンセルボタンを表示しない */
    cancelLabel?: string;
    /** キャンセルボタンクリック時のコールバック */
    onCancel?: () => void;
    /** アクションボタンのラベル */
    actionLabel: string;
    /** アクションボタンクリック時のコールバック（ダイアログは Base UI により閉じる） */
    onAction?: () => void;
}

/**
 * Dialog のヘッダー。Base UI の Dialog.Title を使用し、アクセシビリティを確保する。
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 */
declare function DialogHeader({ text }: DialogHeaderProps): JSX.Element;

declare interface DialogHeaderProps {
    /**
     * ヘッダーに表示するタイトルテキスト
     */
    text: string;
}

/** dummy アイコン */
export declare const DummyIcon: ({ size }: {
    size?: 18 | 20 | 24;
}) => JSX.Element;

/** error-fill アイコン */
export declare const ErrorIcon: () => JSX.Element;

/** exit アイコン（ログアウト） */
export declare const ExitIcon: ({ size }: {
    size?: 18 | 20 | 22 | 24;
}) => JSX.Element;

/**
 * フィルター条件を選択・切り替えるためのChipコンポーネントです。
 * 押しボタンのようにオン／オフを切り替えられ、選択された状態を視覚的に示します。
 */
export declare const FilterChip: default_2.ForwardRefExoticComponent<FilterChipProps & default_2.RefAttributes<HTMLButtonElement>>;

/**
 * FilterChipを横並び・折り返しでレイアウトするWrapperコンポーネントです。
 * 複数選択を担います。
 */
export declare const FilterChipMultiSelectGroup: ({ options, value, defaultValue, onChange, disabled, "aria-label": ariaLabel, }: FilterChipMultiSelectGroupProps) => JSX.Element;

export declare interface FilterChipMultiSelectGroupProps {
    /** 選択肢の配列 */
    options: FilterChipOption[];
    /** 選択中の値の配列（制御モード） */
    value?: string[];
    /** 初期選択値の配列（非制御モード） */
    defaultValue?: string[];
    /** 選択変更時のコールバック */
    onChange?: (values: string[]) => void;
    /** グループ全体の無効化 */
    disabled?: boolean;
    /** アクセシビリティラベル（必須） */
    'aria-label': string;
}

/** FilterChipの選択肢（Group系コンポーネントで使用） */
export declare interface FilterChipOption {
    /** 一意の値 */
    value: string;
    /** 表示ラベル */
    label: string;
    /** 無効化状態 */
    disabled?: boolean;
}

export declare interface FilterChipProps {
    /** 表示するラベルテキスト */
    label: string;
    /** 選択状態 */
    selected?: boolean;
    /** クリック時のコールバック */
    onClick?: (event: default_2.MouseEvent<HTMLButtonElement>) => void;
    /** 無効化状態 */
    disabled?: boolean;
    /** role属性（Groupから注入） */
    role?: string;
    /** aria-checked属性（SingleSelectGroupから注入） */
    'aria-checked'?: boolean;
    /** aria-pressed属性（MultiSelectGroupから注入） */
    'aria-pressed'?: boolean;
    /** tabIndex属性（ロービングフォーカスで使用） */
    tabIndex?: number;
}

/**
 * FilterChipを横並び・折り返しでレイアウトするWrapperコンポーネントです。
 * 単一選択の排他制御を担います。
 */
export declare const FilterChipSingleSelectGroup: ({ options, value, defaultValue, onChange, disabled, "aria-label": ariaLabel, }: FilterChipSingleSelectGroupProps) => JSX.Element;

export declare interface FilterChipSingleSelectGroupProps {
    /** 選択肢の配列 */
    options: FilterChipOption[];
    /** 選択中の値（制御モード） */
    value?: string;
    /** 初期選択値（非制御モード） */
    defaultValue?: string;
    /** 選択変更時のコールバック */
    onChange?: (value: string) => void;
    /** グループ全体の無効化 */
    disabled?: boolean;
    /** アクセシビリティラベル（必須） */
    'aria-label': string;
}

export declare const FloatingAiChat: typeof FloatingAiChatRoot & {
    Header: ({ title, newSession, onNewChatClick, onToggleSizeClick, onMinimizeClick, }: AiChatHeaderProps) => default_2.JSX.Element;
    Body: ({ children }: FloatingAiChatBodyProps) => default_2.JSX.Element;
    Footer: ({ disclaimer, children, }: AiChatFooterProps) => default_2.JSX.Element;
};

declare interface FloatingAiChatBodyProps {
    children: default_2.ReactNode;
}

declare interface FloatingAiChatContextValue {
    size: FloatingAiChatSize;
    /** 履歴メニューに表示するアイテム一覧 */
    histories: AiChatHistoryItem[];
}

export declare interface FloatingAiChatProps {
    /** チャットウィンドウのサイズ @default 'collapsed' */
    size?: FloatingAiChatSize;
    /** 履歴メニューに表示するアイテム一覧 @default [] */
    histories?: AiChatHistoryItem[];
    children: default_2.ReactNode;
}

export declare const FloatingAiChatProvider: default_2.Context<FloatingAiChatContextValue | null>;

declare function FloatingAiChatRoot({ size, histories, children, }: FloatingAiChatProps): default_2.JSX.Element;

/** FloatingAiChatのサイズ */
export declare type FloatingAiChatSize = 'collapsed' | 'expanded';

/**
 * Form Dialog
 *
 * フォーム入力を行うダイアログ。
 * Desktop: size=medium、Phone: 横余白なし・画面端まで、高さも広がる。
 *
 * Base UI の Dialog をベースに実装しています。
 * @see https://base-ui.com/react/components/dialog
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 */
export declare const FormDialog: typeof FormDialogRoot & {
    Header: typeof DialogHeader;
    Body: typeof DialogBody;
    Footer: typeof DialogFooter;
};

export declare interface FormDialogBodyProps {
    children: default_2.ReactNode;
}

export declare interface FormDialogFooterProps {
    /** キャンセル・閉じるボタンのラベル。省略時はキャンセルボタンを表示しない */
    cancelLabel?: string;
    /** キャンセルボタンクリック時のコールバック */
    onCancel?: () => void;
    /** アクションボタンのラベル */
    actionLabel: string;
    /** アクションボタンクリック時のコールバック */
    onAction?: () => void;
}

export declare interface FormDialogHeaderProps {
    /** ヘッダーに表示するタイトルテキスト */
    text: string;
}

declare function FormDialogRoot({ open, defaultOpen, onOpenChange, size, children, }: FormDialogRootProps): default_2.JSX.Element;

export declare interface FormDialogRootProps {
    /** 開閉状態（制御用） */
    open?: boolean;
    /** 初期の開閉状態（非制御用） */
    defaultOpen?: boolean;
    /** 開閉状態が変わったときのコールバック */
    onOpenChange?: (open: boolean) => void;
    /**
     * ダイアログのサイズ（Desktop 時）
     * @default 'medium'
     */
    size?: FormDialogSize;
    children: default_2.ReactNode;
}

/** Form Dialog のサイズ（Desktop 時は medium のみ） */
export declare type FormDialogSize = 'medium';

/** globe アイコン */
export declare const GlobeIcon: ({ size }: {
    size?: 18 | 20 | 22 | 24;
}) => JSX.Element;

/** group アイコン（複数人） */
export declare const GroupIcon: ({ size }: {
    size?: 18 | 20 | 22 | 24;
}) => JSX.Element;

/** history アイコン */
export declare const HistoryIcon: ({ size }: {
    size?: 18 | 20 | 24;
}) => JSX.Element;

/**
 * テキストを持たず、アイコンのみで操作を表現するコンパクトなボタンコンポーネントです。
 *
 * 検索、閉じる、編集など、意味が広く共有されている操作に向いています。
 * 省スペースで配置できる一方、意味が伝わりにくいため、デフォルトでツールチップが表示されます。
 * ツールチップのテキストは `aria-label` から自動的に取得されます。
 *
 * @example
 * ```tsx
 * // ツールチップ付き（デフォルト）
 * <IconButton variant="primary" size="medium" aria-label="検索">
 *   <SearchIcon />
 * </IconButton>
 *
 * // ツールチップなし（title属性にフォールバック）
 * <IconButton variant="primary" size="medium" aria-label="検索" tooltip={false}>
 *   <SearchIcon />
 * </IconButton>
 * ```
 */
export declare const IconButton: {
    ({ variant, size, selected, loading, disabled, children, onClick, "aria-label": ariaLabel, type, tooltip, ref, ...rest }: IconButtonProps): JSX.Element;
    displayName: string;
};

export declare interface IconButtonProps {
    /** ボタンのバリアント（表示スタイル） */
    variant?: IconButtonVariant;
    /** ボタンのサイズ */
    size?: IconButtonSize;
    /** 選択状態（secondary, tertiary, ghostのみ） */
    selected?: boolean;
    /** ローディング状態 */
    loading?: boolean;
    /** 無効化状態 */
    disabled?: boolean;
    /** ボタン内のアイコン */
    children: React.ReactNode;
    /** クリックイベントハンドラ */
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    /** アクセシビリティラベル（必須：ツールチップのテキストとしても使用） */
    'aria-label': string;
    /** type属性 */
    type?: 'button' | 'submit' | 'reset';
    /**
     * ツールチップの表示/非表示
     * @default true
     */
    tooltip?: boolean;
    /** ref */
    ref?: React.Ref<HTMLButtonElement>;
}

/** Icon Buttonのサイズ */
export declare type IconButtonSize = 'small' | 'medium' | 'large';

/** Icon Buttonのバリアント */
export declare type IconButtonVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost';

/**
 * Information Dialog
 *
 * 利用規約など、重要な情報を表示するダイアログ。
 * Desktop: size=small / medium / large、Phone: 横余白なし・画面端まで、高さも広がる。
 *
 * Base UI の Dialog をベースに実装しています。
 * @see https://base-ui.com/react/components/dialog
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 */
export declare const InformationDialog: typeof InformationDialogRoot & {
    Header: typeof DialogHeader;
    Body: typeof DialogBody;
    Footer: typeof DialogFooter;
};

export declare interface InformationDialogBodyProps {
    children: default_2.ReactNode;
}

export declare interface InformationDialogFooterProps {
    /** キャンセル・閉じるボタンのラベル。省略時はキャンセルボタンを表示しない */
    cancelLabel?: string;
    /** キャンセルボタンクリック時のコールバック */
    onCancel?: () => void;
    /** アクションボタンのラベル（例: 閉じる） */
    actionLabel: string;
    /** アクションボタンクリック時のコールバック */
    onAction?: () => void;
}

export declare interface InformationDialogHeaderProps {
    /** ヘッダーに表示するタイトルテキスト */
    text: string;
}

declare function InformationDialogRoot({ open, defaultOpen, onOpenChange, size, children, }: InformationDialogRootProps): default_2.JSX.Element;

export declare interface InformationDialogRootProps {
    /** 開閉状態（制御用） */
    open?: boolean;
    /** 初期の開閉状態（非制御用） */
    defaultOpen?: boolean;
    /** 開閉状態が変わったときのコールバック */
    onOpenChange?: (open: boolean) => void;
    /**
     * ダイアログのサイズ（Desktop 時）
     * @default 'medium'
     */
    size?: InformationDialogSize;
    children: default_2.ReactNode;
}

/** Information Dialog のサイズ（Desktop 時） */
export declare type InformationDialogSize = 'small' | 'medium' | 'large';

/** information-fill アイコン */
export declare const InformationIcon: () => JSX.Element;

/**
 * ユーザーの操作に対して即座に理解すべきエラーや時間的制約のある情報を、
 * 画面の文脈の中で提示するためのコンポーネントです。
 * Overlay ではなく、UI の一部として自然に表示されるため、
 * ユーザーは操作を継続しながらメッセージを読み取ることができます。
 *
 * **用途: 失敗・警告・エラーなど、見逃してほしくない重要な情報の通知**
 * - UIの一部として常に表示されるため、ユーザーが見逃すことがない
 * - 成功時の短いフィードバックには Snackbar を使用すること
 */
export declare const InlineNotification: (props: InlineNotificationProps) => default_2.JSX.Element;

export declare interface InlineNotificationProps {
    /** 通知のステータス（色・アイコンの種類） */
    status: InlineNotificationStatus;
    /** 通知のバリアント（表示スタイル） */
    variant: InlineNotificationVariant;
    /** 通知メッセージのコンテンツ（テキスト、太字、リンク、改行などを含む） */
    children: default_2.ReactNode;
}

/** Inline Notificationのステータス */
export declare type InlineNotificationStatus = 'information' | 'success' | 'warning' | 'error';

/** Inline Notificationのバリアント */
export declare type InlineNotificationVariant = 'primary' | 'secondary';

/**
 * ユーザーが入力した内容を要素ごとに整理して表示するためのChipコンポーネントです。
 * Chipの削除操作（×ボタン）で、ユーザーが入力内容を簡単に削除することができます。
 */
export declare const InputChip: ({ label, onRemove, disabled, }: InputChipProps) => JSX.Element;

/**
 * InputChipを横並び・折り返しでレイアウトするWrapperコンポーネントです。
 */
export declare const InputChipGroup: ({ items, onRemove, disabled, "aria-label": ariaLabel, }: InputChipGroupProps) => JSX.Element;

export declare interface InputChipGroupProps {
    /** 表示するチップの配列 */
    items: InputChipItem[];
    /** チップ削除時のコールバック */
    onRemove: (id: string) => void;
    /** 無効化状態 */
    disabled?: boolean;
    /** アクセシビリティラベル（必須） */
    'aria-label': string;
}

export declare interface InputChipItem {
    /** 一意のID */
    id: string;
    /** ラベルテキスト */
    label: string;
}

export declare interface InputChipProps {
    /** 表示するラベルテキスト */
    label: string;
    /** 削除ボタンクリック時のコールバック */
    onRemove: () => void;
    /** 無効化状態 */
    disabled?: boolean;
}

/** 三点リーダー（縦）アイコン */
export declare const KebabMenuIcon: () => JSX.Element;

/**
 * フォーム用コンポーネントが「何を入力・選択するためのものか」を
 * 明確に伝えるためのラベルコンポーネントです。
 */
export declare const LabelUnit: ({ text, required, supportText, htmlFor, disabled, }: LabelUnitProps) => JSX.Element;

export declare interface LabelUnitProps {
    /** ラベルテキスト */
    text: string;
    /** 必須表示 */
    required?: boolean;
    /** 補足テキスト */
    supportText?: string;
    /** htmlFor（対応する入力要素のid） */
    htmlFor?: string;
    /** 無効化状態 */
    disabled?: boolean;
}

/**
 * 別のページや画面に遷移するためのメニュー項目
 *
 * 選択すると指定されたリンク先へ移動する。
 * menu コンポーネント内でナビゲーション目的の操作に使用する。
 * newWindow=true で新しいウィンドウで開くアイコンが表示される。
 *
 * @example
 * ```tsx
 * <LinkMenuItem href="/settings">設定</LinkMenuItem>
 * <LinkMenuItem href="https://example.com" newWindow>外部リンク</LinkMenuItem>
 * ```
 */
export declare const LinkMenuItem: ({ href, newWindow, icon, supportText, children, }: LinkMenuItemProps) => default_2.JSX.Element;

/** LinkMenuItem の Props */
export declare interface LinkMenuItemProps {
    /**
     * リンク先URL
     */
    href: string;
    /**
     * 新しいウィンドウで開くかどうか。trueの場合、open-in-newアイコンが表示される
     * @default false
     */
    newWindow?: boolean;
    /** ラベルの先頭に表示するアイコン */
    icon?: default_2.ReactNode;
    /** ラベル下に表示する補助テキスト */
    supportText?: string;
    /** メニュー項目のラベル */
    children: default_2.ReactNode;
}

/**
 * LinkTag コンポーネント
 *
 * コンテンツの属性や分類を簡潔に示すためのコンポーネント。
 * 関連するカテゴリや項目へのナビゲーションリンクとして機能します。
 * タグ自体がクリック可能で、関連コンテンツへの移動をスムーズにします。
 *
 * @example
 * // リンクとして使用
 * <LinkTag text="カテゴリ" href="/category" />
 *
 * // ボタンとして使用
 * <LinkTag text="タグ" onClick={() => console.log('clicked')} />
 */
export declare const LinkTag: ({ text, size, className, ...props }: LinkTagProps) => default_2.JSX.Element;

/** button要素としてのProps */
declare interface LinkTagAsButtonProps extends default_2.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
     * タグに表示するテキスト
     * @default 'Text'
     */
    text?: string;
    /**
     * タグのサイズ
     * - x-small: 10px（最小サイズ）
     * - small: 11px
     * - medium: 12px（デフォルト）
     * @default 'medium'
     */
    size?: LinkTagSize;
    /**
     * hrefを指定しない場合はbutton要素として動作します
     */
    href?: never;
    'aria-label'?: string;
}

/** a要素としてのProps */
declare interface LinkTagAsLinkProps extends default_2.AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * タグに表示するテキスト
     * @default 'Text'
     */
    text?: string;
    /**
     * タグのサイズ
     * - x-small: 10px（最小サイズ）
     * - small: 11px
     * - medium: 12px（デフォルト）
     * @default 'medium'
     */
    size?: LinkTagSize;
    /**
     * リンク先のURL
     * hrefを指定するとa要素として動作します
     */
    href: string;
    'aria-label'?: string;
}

export declare const LinkTagGroup: ({ tags }: LinkTagGroupProps) => JSX.Element;

export declare interface LinkTagGroupProps {
    /**
     * 表示するタグの配列
     */
    tags: Array<LinkTagProps & {
        id?: string;
    }>;
}

export declare type LinkTagProps = LinkTagAsLinkProps | LinkTagAsButtonProps;

/** Link Tagのサイズ */
export declare type LinkTagSize = 'x-small' | 'small' | 'medium';

/** mail-forward アイコン */
export declare const MailForwardIcon: ({ size, }: {
    size?: 18 | 20 | 22 | 24;
}) => JSX.Element;

/** maximize（最大化）アイコン */
export declare const MaximizeIcon: ({ size }: {
    size?: 18 | 20 | 24;
}) => JSX.Element;

/**
 * メニューのルートコンポーネント
 *
 * トリガー要素のクリックで開き、外側クリックまたはESCで閉じるドロップダウンメニュー。
 * Base UI の Menu.Root をラップし、開閉状態を管理する。
 *
 * @example
 * ```tsx
 * <Menu>
 *   <MenuTrigger>
 *     <MenuButton>Actions</MenuButton>
 *   </MenuTrigger>
 *   <MenuDropdown>
 *     <MenuGroup>
 *       <ActionMenuItem>編集</ActionMenuItem>
 *     </MenuGroup>
 *   </MenuDropdown>
 * </Menu>
 * ```
 */
export declare const Menu: ({ open, defaultOpen, onOpenChange, modal, children, }: MenuProps) => default_2.JSX.Element;

export declare const MenuButton: {
    ({ variant, size, loading, disabled, children, icon, ref, ...rest }: MenuButtonProps): JSX.Element;
    displayName: string;
};

/** MenuButton の Props */
export declare interface MenuButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'form' | 'formAction' | 'formEncType' | 'formMethod' | 'formNoValidate' | 'formTarget' | 'name' | 'value' | 'className'> {
    /**
     * ボタンの表示スタイル
     * @default 'primary'
     */
    variant?: MenuButtonVariant;
    /**
     * ボタンのサイズ
     * @default 'medium'
     */
    size?: MenuButtonSize;
    /**
     * ローディング状態。アイコンがスピナーに置き換わり、ボタンは無効化される
     * @default false
     */
    loading?: boolean;
    /** ボタンのラベルテキスト */
    children: React.ReactNode;
    /** ラベルの先頭に表示するアイコン */
    icon?: React.ReactNode;
    /** Menu コンポーネントとの連携用 ref。ドロップダウンの位置決めやフォーカス管理に使用 */
    ref?: React.Ref<HTMLButtonElement>;
}

/** MenuButton のサイズ */
export declare type MenuButtonSize = 'medium' | 'large' | 'x-large';

/** MenuButton のバリアント */
export declare type MenuButtonVariant = 'primary' | 'secondary' | 'ghost';

/**
 * メニューのドロップダウンコンポーネント
 *
 * Portal + Positioner + Popup をまとめたコンポーネント。
 * ビューポート端から16pxの余白を確保し、収まりきらない場合はスクロールバーを表示する。
 * 表示位置はビューポートに応じて自動調整される。
 */
export declare const MenuDropdown: ({ side, align, sideOffset, width, container, unstyled, positionStatic, children, }: MenuDropdownProps) => default_2.JSX.Element;

/** MenuDropdown の配置調整 */
export declare type MenuDropdownAlign = 'start' | 'center' | 'end';

export declare interface MenuDropdownProps {
    /**
     * トリガーに対する表示方向
     * @default 'bottom'
     */
    side?: MenuDropdownSide;
    /**
     * 表示方向の軸に沿った配置
     * @default 'start'
     */
    align?: MenuDropdownAlign;
    /**
     * トリガーからのオフセット（px）
     * @default 4
     */
    sideOffset?: number;
    /**
     * ドロップダウンの幅（px）。'auto' で内容に応じた幅になる
     * @default 200
     */
    width?: number | 'auto';
    /** Portal の描画先コンテナ。指定するとbodyではなくそのコンテナ内に描画される */
    container?: default_2.RefObject<HTMLElement | null>;
    /**
     * Popupの装飾（shadow, border-radius, background）を無効にする。
     * Storybookでmenu-item単体の表示に使用
     * @default false
     */
    unstyled?: boolean;
    /**
     * Positionerのposition計算を無効にし、インラインに描画する。
     * Storybookの静的表示など、フロー内にPopupを配置したい場合に使用
     * @default false
     */
    positionStatic?: boolean;
    children: default_2.ReactNode;
}

/** MenuDropdown の表示方向 */
export declare type MenuDropdownSide = 'top' | 'bottom' | 'inline-start' | 'inline-end';

/**
 * メニューアイテムをグルーピングするコンポーネント
 *
 * 複数のMenuGroupを並べると、グループ間に区切り線が表示される。
 * オプションの label でグループにラベルを付けられる。
 */
export declare const MenuGroup: ({ label, children }: MenuGroupProps) => default_2.JSX.Element;

export declare interface MenuGroupProps {
    /** グループのラベル */
    label?: string;
    children: default_2.ReactNode;
}

export declare interface MenuProps {
    /** 制御された開閉状態 */
    open?: boolean;
    /** 非制御の初期開閉状態 */
    defaultOpen?: boolean;
    /** 開閉状態の変更コールバック */
    onOpenChange?: MenuRootProps['onOpenChange'];
    /**
     * モーダル状態。trueの場合、ページスクロールがロックされ外部要素のポインター操作が無効になる
     * @default true
     */
    modal?: boolean;
    children: default_2.ReactNode;
}

export declare const MenuRadioGroup: default_2.NamedExoticComponent<Omit< ContextMenuRadioGroupProps, "ref"> & default_2.RefAttributes<HTMLDivElement>>;

export declare const MenuSubmenuRoot: typeof Menu_2.SubmenuRoot;

/**
 * メニューのトリガーコンポーネント
 *
 * 子要素をクリックするとメニューが開閉する。
 * MenuButton, IconButton などの任意の要素をトリガーとして使用できる。
 */
export declare const MenuTrigger: ({ children }: MenuTriggerProps) => default_2.JSX.Element;

export declare interface MenuTriggerProps {
    /** トリガーとなる要素（MenuButton, IconButton など） */
    children: default_2.ReactElement;
}

/** minimize（最小化）アイコン */
export declare const MinimizeIcon: ({ size }: {
    size?: 18 | 20 | 24;
}) => JSX.Element;

/** minus（マイナス）アイコン */
export declare const MinusIcon: ({ size }: {
    size?: 18 | 20 | 24;
}) => JSX.Element;

/** open-in-new アイコン（外部リンク） */
export declare const OpenInNewIcon: ({ size }: {
    size?: 18 | 20 | 22 | 24;
}) => JSX.Element;

/** ColumnConfig からオプションキーの型を抽出 */
declare type OptionKeysOf<C> = C extends ColumnConfig<infer K> ? K : string;

/** pencil-square アイコン */
export declare const PencilSquareIcon: ({ size, }: {
    size?: 18 | 20 | 22 | 24;
}) => JSX.Element;

/** person-gear アイコン（アカウント設定） */
export declare const PersonGearIcon: ({ size }: {
    size?: 18 | 20 | 22 | 24;
}) => JSX.Element;

/** person アイコン */
export declare const PersonIcon: ({ size }: {
    size?: 18 | 20 | 22 | 24;
}) => JSX.Element;

/** question-circle アイコン */
export declare const QuestionCircleIcon: ({ size, }: {
    size?: 18 | 20 | 22 | 24;
}) => JSX.Element;

/**
 * ReadOnlyTag コンポーネント
 *
 * 情報の分類や属性、状態を示すための表示専用コンポーネントです。
 * ユーザー操作はできず、ラベルとして情報を補足・整理する目的で使用されます。
 *
 */
export declare const ReadOnlyTag: ({ text, showIcon, icon, pattern, "aria-label": ariaLabel, }: ReadOnlyTagProps) => default_2.JSX.Element;

/** Read Only Tagのパターン */
export declare type ReadOnlyTagPattern = 'neutral' | 'information' | 'positive' | 'negative';

export declare interface ReadOnlyTagProps {
    /**
     * タグに表示するテキスト
     * @default 'Text'
     */
    text?: string;
    /**
     * アイコンを表示/非表示
     * @default false
     */
    showIcon?: boolean;
    /**
     * カスタムアイコン要素
     * showIconがtrueの場合に表示されます
     */
    icon?: default_2.ReactNode;
    /**
     * タグのパターン（色の種類）
     * - neutral: グレー（中立的な情報）
     * - information: 青（情報）
     * - positive: 緑（肯定的な情報）
     * - negative: 赤（否定的な情報）
     * @default 'neutral'
     */
    pattern?: ReadOnlyTagPattern;
    'aria-label'?: string;
}

/** reference アイコン（ドキュメント参照） */
export declare const ReferenceIcon: ({ size }: {
    size?: 18 | 20 | 22 | 24;
}) => JSX.Element;

/**
 * レポートや記事などの読み物コンテンツにおいて、
 * 内容の区切りや構造を示すための見出しコンポーネント
 */
export declare const ReportHeading: ({ children, level, action, ref, }: ReportHeadingProps) => JSX.Element;

export declare type ReportHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export declare interface ReportHeadingProps {
    /** 見出しテキスト */
    children: React.ReactNode;
    /** 見出しレベル（h1〜h6） @default 2 */
    level?: ReportHeadingLevel;
    /** アクションスロット（ボタンなどのコンポーネントを配置） */
    action?: React.ReactNode;
    /** ルートDOM要素への参照 */
    ref?: React.Ref<HTMLDivElement>;
}

/**
 * ユーザーが必要な情報を素早く見つけるための入力コンポーネントです。
 * キーワードの入力に応じて、候補表示や検索実行を行い、コンテンツ探索の効率を高めます。
 *
 * ラベル（LabelUnit）と併用して「何を」検索するのかを明示することが望ましいです。
 * ラベルの併用が難しい場合は、プレースホルダーで補足してください。
 *
 * ### 使用例
 * ```tsx
 * <LabelUnit text="競合企業" htmlFor="search-competitor" />
 * <SearchBox id="search-competitor" placeholder="企業を検索" variant="secondary" />
 * ```
 */
export declare const SearchBox: ({ variant, onClear, value, defaultValue, onChange, disabled, ...rest }: SearchBoxProps) => default_2.JSX.Element;

export declare interface SearchBoxProps extends Omit<default_2.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    /** 見た目のバリアント */
    variant?: SearchBoxVariant;
    /** クリアボタン押下時のコールバック */
    onClear?: () => void;
}

/** SearchBoxのバリアント */
export declare type SearchBoxVariant = 'primary' | 'secondary';

/** 検索（虫眼鏡）アイコン */
export declare const SearchIcon: () => JSX.Element;

/**
 * SectionTab
 *
 * ページ内セクションの切り替えに使用する個別タブ。
 * SectionTabGroup.List 内に配置して使用する。
 *
 * Base UI の Tabs.Tab をベースに実装。
 * @see https://base-ui.com/react/components/tabs
 */
export declare function SectionTab({ value, children, flag, disabled, }: SectionTabProps): JSX.Element;

/**
 * SectionTabGroup
 *
 * ページ内セクションの切り替えに使用するタブグループ。
 * SectionTabGroup.List 内に SectionTab を配置し、
 * SectionTabGroup.Panel でコンテンツを表示する。
 *
 * Base UI の Tabs をベースに実装。
 * @see https://base-ui.com/react/components/tabs
 */
export declare const SectionTabGroup: typeof SectionTabGroupRoot & {
    List: typeof SectionTabList;
    Panel: typeof SectionTabPanel;
};

declare function SectionTabGroupRoot({ value, defaultValue, onValueChange, children, }: SectionTabGroupRootProps): JSX.Element;

export declare interface SectionTabGroupRootProps {
    /**
     * 現在選択されているタブの値（制御モード）
     *
     * `null` を渡すとどのタブも選択されない。
     */
    value?: TabsTab.Value;
    /** 初期選択タブの値（非制御モード） */
    defaultValue?: TabsTab.Value;
    /** タブ切り替え時のコールバック */
    onValueChange?: (value: TabsTab.Value, eventDetails: TabsRoot.ChangeEventDetails) => void;
    /** 子要素（SectionTabGroup.List + SectionTabGroup.Panel） */
    children: ReactNode;
}

declare function SectionTabList({ children, 'aria-label': ariaLabel, }: SectionTabListProps): JSX.Element;

export declare interface SectionTabListProps {
    /** SectionTab コンポーネント群 */
    children: ReactNode;
    /** タブリストのアクセシブルラベル */
    'aria-label'?: string;
}

declare function SectionTabPanel({ value, children, keepMounted, }: SectionTabPanelProps): JSX.Element;

export declare interface SectionTabPanelProps {
    /** パネルに対応するタブの値 */
    value: TabsTab.Value;
    /** パネルのコンテンツ */
    children: ReactNode;
    /**
     * 非表示時も DOM 内に HTML 要素を保持するか
     * @default false
     */
    keepMounted?: boolean;
}

export declare interface SectionTabProps {
    /** タブの値（SectionTabGroup の選択制御に使用） */
    value: TabsTab.Value;
    /** タブに表示するテキスト */
    children: ReactNode;
    /**
     * 国旗アイコン（テキストの前に表示）
     *
     * 国・地域タブで使用。国旗のない地域名（ヨーロッパ、アジア等）には渡しません。
     */
    flag?: ReactNode;
    /**
     * 無効化状態
     * @default false
     */
    disabled?: boolean;
}

/**
 * Segment
 *
 * SegmentedControl 内の個別セグメント。
 * SegmentedControl の直接の子として配置して使用する。
 *
 * Base UI の Toggle をベースに実装。
 * @see https://base-ui.com/react/components/toggle-group
 */
export declare function Segment({ value, variant, children, disabled, 'aria-label': ariaLabel, }: SegmentProps): JSX.Element;

/**
 * SegmentedControl
 *
 * 排他的な単一選択（ラジオボタン相当）のセグメントグループ。
 * Segment コンポーネントを子として配置して使用する。
 *
 * 複数選択が必要な場合は、チェックボックスグループの使用を検討してください。
 *
 * Base UI の ToggleGroup をベースに実装。
 * @see https://base-ui.com/react/components/toggle-group
 *
 * @example
 * ```tsx
 * <SegmentedControl defaultValue="tab1" aria-label="表示切り替え">
 *   <Segment variant="text" value="tab1">タブ1</Segment>
 *   <Segment variant="text" value="tab2">タブ2</Segment>
 *   <Segment variant="text" value="tab3">タブ3</Segment>
 * </SegmentedControl>
 * ```
 */
export declare function SegmentedControl({ value, defaultValue, onValueChange, disabled, children, 'aria-label': ariaLabel, }: SegmentedControlProps): JSX.Element;

export declare interface SegmentedControlProps {
    /**
     * 現在選択されているセグメントの値（制御モード）
     *
     * 排他的な単一選択（ラジオボタン相当）のUIとして使用します。
     * 複数選択が必要な場合は、チェックボックスグループの使用を検討してください。
     */
    value?: string;
    /** 初期選択セグメントの値（非制御モード） */
    defaultValue?: string;
    /**
     * セグメント切り替え時のコールバック
     */
    onValueChange?: (value: string) => void;
    /**
     * 無効化状態（全セグメントを無効化）
     * @default false
     */
    disabled?: boolean;
    /** Segment コンポーネント群 */
    children: ReactNode;
    /** アクセシブルラベル */
    'aria-label'?: string;
}

export declare interface SegmentProps {
    /** セグメントの値（SegmentedControl の選択制御に使用） */
    value: string;
    /** セグメントの表示バリアント */
    variant: 'text' | 'icon';
    /** セグメントに表示するコンテンツ（テキストまたはアイコン） */
    children: ReactNode;
    /**
     * 無効化状態
     * @default false
     */
    disabled?: boolean;
    /**
     * アクセシブルラベル
     *
     * icon variant ではアイコンのみが表示されるため、
     * スクリーンリーダー向けのラベルとして必ず指定してください。
     */
    'aria-label'?: string;
}

/**
 * 選択状態を持つメニュー項目
 *
 * 設定値やフィルター条件などの切り替えに使用する。
 * `Menu.RadioGroup` 内に配置し、グループ内で1つだけ選択できる（Single-select）。
 * 新しい項目を選択すると、これまでの選択は自動的に解除される。
 *
 * ## 選択必須 / 任意選択
 * - **選択必須**: 選択肢のみを並べる
 * - **任意選択**: 先頭に `<SelectMenuItem value="">指定なし</SelectMenuItem>` を配置し、
 *   未選択状態を表現する
 *
 * ## Don't
 * - **複数選択（Multi-select / Checkbox）には対応しない。**
 *   このコンポーネントは単一選択（Radio）専用。
 *
 * @example
 * ```tsx
 * // 選択必須
 * <Menu.RadioGroup value={value} onValueChange={setValue}>
 *   <SelectMenuItem value="sales">営業</SelectMenuItem>
 *   <SelectMenuItem value="marketing">マーケティング・広報</SelectMenuItem>
 * </Menu.RadioGroup>
 *
 * // 任意選択（「指定なし」付き）
 * <Menu.RadioGroup value={value} onValueChange={setValue}>
 *   <SelectMenuItem value="">指定なし</SelectMenuItem>
 *   <SelectMenuItem value="sales">営業</SelectMenuItem>
 *   <SelectMenuItem value="marketing">マーケティング・広報</SelectMenuItem>
 * </Menu.RadioGroup>
 * ```
 */
export declare const SelectMenuItem: ({ value, disabled, icon, supportText, children, }: SelectMenuItemProps) => default_2.JSX.Element;

/** SelectMenuItem の Props */
export declare interface SelectMenuItemProps {
    /**
     * Menu.RadioGroupのvalueとして使われる識別子
     */
    value: string;
    /**
     * 無効化状態。クリック操作が無効になり、テキストとアイコンが淡色表示になる
     * @default false
     */
    disabled?: boolean;
    /** ラベルの先頭に表示するアイコン */
    icon?: default_2.ReactNode;
    /** ラベル下に表示する補助テキスト */
    supportText?: string;
    /** メニュー項目のラベル */
    children: default_2.ReactNode;
}

export declare const Snackbar: {
    Provider: typeof SnackbarProvider;
    Viewport: typeof SnackbarViewport;
};

/**
 * Snackbar のコンテキストを提供するプロバイダー。
 * アプリのルート付近に配置する。
 */
declare function SnackbarProvider({ children, timeout, limit, }: SnackbarProviderProps): JSX.Element;

export declare interface SnackbarProviderProps {
    children: ReactNode;
    /**
     * 自動消去までの時間（ミリ秒）
     * @default 5000
     */
    timeout?: number;
    /**
     * 同時に表示できるSnackbarの最大数。
     * 上限を超えると古いものから自動的に削除される。
     * @default 5
     */
    limit?: number;
}

/** useSnackbar の show メソッドに渡すオプション */
export declare interface SnackbarShowOptions {
    /** @default 'small' */
    size?: SnackbarSize;
}

/** Snackbarのサイズ */
export declare type SnackbarSize = 'small' | 'medium';

/**
 * Snackbar の表示領域。
 * デスクトップでは画面右上、スマホでは画面下中央に配置される。
 */
declare function SnackbarViewport(): JSX.Element;

/** ソート昇順アイコン */
export declare const SortAscendingIcon: () => JSX.Element;

/** ソートデフォルト（上下両矢印）アイコン */
export declare const SortDefaultIcon: () => JSX.Element;

/** ソート降順アイコン */
export declare const SortDescendingIcon: () => JSX.Element;

/** ローディングスピナーアイコン（15px 固定。ラッパーでセンタリングして使用） */
export declare const SpinnerIcon: () => JSX.Element;

/** stop-fill（停止）アイコン */
export declare const StopFillIcon: ({ size }: {
    size?: 18 | 20 | 24;
}) => JSX.Element;

/**
 * サブメニューのドロップダウンコンポーネント
 *
 * MenuSubmenuRoot 内で SubMenuItem と組み合わせて使用する。
 * MenuDropdown と同じスタイルを共有し、デフォルト値のみ異なる。
 *
 * @example
 * ```tsx
 * <MenuSubmenuRoot>
 *   <SubMenuItem>移動先</SubMenuItem>
 *   <SubMenuDropdown>
 *     <ActionMenuItem>フォルダA</ActionMenuItem>
 *     <ActionMenuItem>フォルダB</ActionMenuItem>
 *   </SubMenuDropdown>
 * </MenuSubmenuRoot>
 * ```
 */
export declare const SubMenuDropdown: ({ side, align, sideOffset, width, children, }: SubMenuDropdownProps) => default_2.JSX.Element;

export declare interface SubMenuDropdownProps {
    /**
     * トリガーに対する表示方向
     * @default 'inline-end'
     */
    side?: MenuDropdownSide;
    /**
     * 表示方向の軸に沿った配置
     * @default 'start'
     */
    align?: MenuDropdownAlign;
    /**
     * トリガーからのオフセット（px）
     * @default 0
     */
    sideOffset?: number;
    /**
     * サブメニューの幅（px）。'auto' で内容に応じた幅になる
     * @default 160
     */
    width?: number | 'auto';
    children: default_2.ReactNode;
}

/**
 * サブメニューを開くためのメニュー項目
 *
 * 選択するとネストされたサブメニューが表示される。
 * 右端にシェブロンアイコンが常に表示される。
 *
 * ## 開閉仕様
 * - **非タッチデバイス**: hover でサブメニューを表示し、hover を外すと閉じる
 * - **タッチデバイス**: tap でサブメニューを表示し、再度 tap すると閉じる。メニュー外側の tap で全メニューを閉じる
 *
 * ## サブメニューの表示位置
 * 原則、親メニューの右側に上端を揃えて表示する。
 * 右側にスペースがない場合は左側、下にスペースがない場合は上方向への展開を許容する。
 *
 * ## 階層制限
 * メニューの階層は**最大2階層まで**とする。3階層以上のネストは禁止。
 *
 * @example
 * ```tsx
 * <Menu.SubmenuRoot>
 *   <SubMenuItem>サブメニュー</SubMenuItem>
 *   <Menu.Portal>
 *     <Menu.Positioner side="inline-end" align="start">
 *       <Menu.Popup>
 *         <ActionMenuItem>アクション</ActionMenuItem>
 *       </Menu.Popup>
 *     </Menu.Positioner>
 *   </Menu.Portal>
 * </Menu.SubmenuRoot>
 * ```
 */
export declare const SubMenuItem: ({ disabled, icon, children, }: SubMenuItemProps) => default_2.JSX.Element;

/** SubMenuItem の Props */
export declare interface SubMenuItemProps {
    /**
     * 無効化状態。クリック操作が無効になり、テキストとアイコンが淡色表示になる
     * @default false
     */
    disabled?: boolean;
    /** ラベルの先頭に表示するアイコン */
    icon?: default_2.ReactNode;
    /** メニュー項目のラベル */
    children: default_2.ReactNode;
}

/** success-fill アイコン */
export declare const SuccessIcon: () => JSX.Element;

/**
 * 検索ボックスや入力フィールドをクリック、またはキーワードを入力した際に
 * 表示される候補リストのコンポーネントです。
 *
 * 入力中の文字列に基づいて候補を提示し、選択による入力の補助や、
 * キーワードの補完（autocomplete）を通じて、入力の手間を減らし操作効率を高めます。
 */
export declare const Suggestion: ({ emptyMessage, children, "aria-label": ariaLabel, id, }: SuggestionProps) => default_2.JSX.Element;

/**
 * サジェッションリスト内のカテゴリーグループです。
 * カテゴリーラベルの下に候補アイテムをグループ化して表示します。
 */
export declare const SuggestionCategory: ({ label, children, }: SuggestionCategoryProps) => default_2.JSX.Element;

export declare interface SuggestionCategoryProps {
    /** カテゴリーラベル */
    label: string;
    /** 子要素（SuggestionItem） */
    children: default_2.ReactNode;
}

/**
 * Suggestionリスト内の個別の候補アイテムです。
 *
 * ## Content Type: Text
 * `label` を指定するとアイコン + テキストの定型レイアウトで表示します。
 *
 * ## Content Type: Slot
 * `children` を指定すると、任意のカスタムコンテンツを差し込めるスロットモードになります。
 * Slot 内のレイアウトは Suggestion の責務ではなく、利用者が自由に構成できます。
 * 横並び・縦並び・複数要素の配置など、用途に応じた柔軟なレイアウトが可能です。
 *
 * @example
 * ```tsx
 * // Text モード
 * <SuggestionItem label="Apple" icon={<SearchIcon />} />
 *
 * // Slot モード（利用者が任意のコンテンツを差し込む）
 * <SuggestionItem>
 *   <Avatar />
 *   <span>山田 太郎</span>
 *   <span>taro@example.com</span>
 * </SuggestionItem>
 * ```
 */
export declare const SuggestionItem: (props: SuggestionItemProps) => default_2.JSX.Element;

declare interface SuggestionItemBaseProps {
    /** 選択状態（aria-activedescendant連携時にtrueを設定） */
    selected?: boolean;
    /** 選択時のコールバック */
    onSelect?: () => void;
    /** オプションのID（aria-activedescendantに使用） */
    id?: string;
}

/** SuggestionItemのProps（テキストモードまたはスロットモードを排他的に指定） */
export declare type SuggestionItemProps = SuggestionItemTextProps | SuggestionItemSlotProps;

declare interface SuggestionItemSlotProps extends SuggestionItemBaseProps {
    /** カスタムコンテンツ（任意の要素を自由に配置可能。レイアウトは利用者側で構成する） */
    children: default_2.ReactNode;
    label?: never;
    icon?: never;
}

declare interface SuggestionItemTextProps extends SuggestionItemBaseProps {
    /** テキストラベル */
    label: string;
    /** アイコン（trueを指定するとアイコン分の余白を確保） */
    icon?: default_2.ReactNode | true;
    children?: never;
}

export declare interface SuggestionProps {
    /** 候補が空のときに表示するメッセージ @default '一致する候補が見つかりません' */
    emptyMessage?: string;
    /** 子要素（SuggestionItem, SuggestionCategory） */
    children?: default_2.ReactNode;
    /** listboxのアクセシブルラベル */
    'aria-label'?: string;
    /** listboxのID（comboboxのaria-controlsに使用） */
    id?: string;
}

/**
 * Table
 *
 * テーブルのルートコンポーネント。
 * ネイティブ `<table>` 要素をラップし、`view` をコンテキスト経由で子コンポーネントに配信する。
 *
 * `TableCol` を直接の子として配置すると、自動的に `<colgroup>` にまとめてレンダリングする。
 */
export declare function Table({ view, children, 'aria-label': ariaLabel }: TableProps): default_2.JSX.Element;

/**
 * TableBody
 *
 * `<tbody>` をレンダリングするラッパーコンポーネント。
 */
export declare function TableBody({ children }: TableBodyProps): JSX.Element;

/**
 * TableBodyCell
 *
 * テーブルのボディセル。`<td>` をレンダリングする。
 *
 * ## null 表示
 * `children` が空（`null`・`undefined`・`''`・`false`）の場合、
 * セル中央にダッシュ（`–`）を自動表示する。
 * `0` は有効な値として通常表示される。
 */
export declare function TableBodyCell({ contentType, icon, children, }: TableBodyCellProps): JSX.Element;

/** ボディセルのコンテンツタイプ */
export declare type TableBodyCellContentType = 'text' | 'number' | 'date' | 'checkbox' | 'icon-button' | 'slot';

export declare interface TableBodyCellProps {
    /**
     * セルのコンテンツタイプ
     * @default 'text'
     */
    contentType?: TableBodyCellContentType;
    /**
     * セルの先頭に表示するアイコン。
     *
     * アイコンとテキストの垂直配置は view に応じて自動で切り替わる:
     * - grid: 上揃え（`flex-start`）
     * - list: 中央揃え（`center`）
     *
     * テキスト系の contentType（`text` など）での使用を想定。
     * `checkbox` や `slot` など他の contentType との併用は非推奨。
     */
    icon?: ReactNode;
    /**
     * セルのコンテンツ。
     *
     * `null`・`undefined`・`''`・`false` の場合はダッシュ（`–`）を
     * セル中央に自動表示する（null 表示）。
     * `0` は有効な値として表示される。
     */
    children?: ReactNode;
}

export declare interface TableBodyProps {
    /** テーブルボディのコンテンツ */
    children: ReactNode;
}

/**
 * TableCol
 *
 * テーブルのカラム幅を指定する `<col>` 要素をレンダリングする。
 * Table の直接の子として配置すると、自動的に `<colgroup>` 内にまとめられる。
 */
export declare function TableCol({ width, minWidth }: TableColProps): JSX.Element;

export declare interface TableColProps {
    /** カラム幅（CSS値: "40px", "20%" など）。省略時はブラウザに委ねる */
    width?: string;
    /** リサイズ時の最小幅（px）。省略時は 40 */
    minWidth?: number;
}

/**
 * TableHead
 *
 * `<thead>` をレンダリングするラッパーコンポーネント。
 */
export declare function TableHead({ children }: TableHeadProps): JSX.Element;

/**
 * TableHeaderCell
 *
 * テーブルのヘッダーセル。`<th>` をレンダリングする。
 * ソート機能、チェックボックス、アイコンボタンなどのコンテンツタイプに対応。
 */
export declare function TableHeaderCell({ contentType, sortState, onSortChange, menuItems, resizable, onResize, children, }: TableHeaderCellProps): default_2.JSX.Element;

declare interface TableHeaderCellCommonProps {
    /**
     * セルのコンテンツタイプ
     * @default 'text'
     */
    contentType?: TableHeaderCellContentType;
    /** カラムアクションメニューの項目 */
    menuItems?: readonly TableHeaderMenuItem[];
    /**
     * カラム幅のリサイズを許可
     * @default false
     */
    resizable?: boolean;
    /** カラムリサイズ完了時のコールバック */
    onResize?: (width: number) => void;
    /** セルのコンテンツ */
    children?: ReactNode;
}

/** ヘッダーセルのコンテンツタイプ */
export declare type TableHeaderCellContentType = 'text' | 'checkbox' | 'icon-button';

export declare type TableHeaderCellProps = TableHeaderCellCommonProps & ({
    sortState?: undefined;
    onSortChange?: undefined;
} | {
    /** 現在のソート状態 */
    sortState: TableSortState;
    /** ソート状態変更時のコールバック */
    onSortChange: (state: TableSortState) => void;
});

export declare interface TableHeaderMenuItem {
    /** メニュー項目のラベル */
    label: string;
    /** クリック時のコールバック */
    onClick: () => void;
    /**
     * 選択状態（チェックアイコンを表示）
     * @default false
     */
    selected?: boolean;
}

export declare interface TableHeadProps {
    /** テーブルヘッダーのコンテンツ */
    children: ReactNode;
}

export declare interface TableProps {
    /** テーブルのビューモード */
    view: TableView;
    /** テーブルのコンテンツ */
    children?: ReactNode;
    /** テーブルのアクセシブルラベル（`aria-label` または `aria-labelledby` のいずれかを指定） */
    'aria-label': string;
}

/**
 * TableRow
 *
 * `<tr>` をレンダリングするラッパーコンポーネント。
 * 選択状態とホバー状態のスタイルを管理する。
 */
export declare function TableRow({ children, selected }: TableRowProps): JSX.Element;

export declare interface TableRowProps {
    /** 行のコンテンツ */
    children: ReactNode;
    /**
     * 選択状態
     * @default false
     */
    selected?: boolean;
}

/** ソート状態 */
export declare type TableSortState = 'default' | 'ascending' | 'descending';

/** テーブルのビューモード */
export declare type TableView = 'grid' | 'list';

/**
 * 複数行のテキストを入力・編集するためのコンポーネントです。
 * 1行の場合は、TextFieldを使用してください。
 */
export declare const TextArea: ({ size, viewport, error, errorMessages, showCount, maxCount, className, value, defaultValue, onChange, onScroll, disabled, ...props }: TextAreaProps) => default_2.JSX.Element;

export declare interface TextAreaProps extends Omit<default_2.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
    /** テキストエリアのサイズ */
    size?: TextAreaSize;
    /** ビューポート */
    viewport?: Viewport;
    /** エラー状態 */
    error?: boolean;
    /** エラーメッセージ一覧 */
    errorMessages?: string[];
    /** 文字数カウント表示（maxCount 設定時は自動表示） */
    showCount?: boolean;
    /** 最大文字数 */
    maxCount?: number;
}

/** TextAreaのサイズ */
export declare type TextAreaSize = 'medium' | 'large';

/**
 * LabelUnit + TextArea を組み合わせたフォームフィールドコンポーネントです。
 */
export declare const TextAreaUnit: ({ label, supportText, id, ...textAreaProps }: TextAreaUnitProps) => JSX.Element;

export declare interface TextAreaUnitProps extends TextAreaProps {
    /** ラベルテキスト */
    label: string;
    /** 補足テキスト */
    supportText?: string;
}

export declare const Timeline: typeof TimelineRoot & {
    Item: typeof TimelineItem;
};

/**
 * TimelineItem
 *
 * 時系列の個別アイテム。Timeline 内に配置して使用する。
 * 自動的にラインで接続される。
 */
export declare function TimelineItem({ emphasized, children, }: TimelineItemProps): JSX.Element;

export declare interface TimelineItemProps {
    /**
     * 強調表示（ドットが有彩色になる）
     *
     * 最も重要な出来事や、文脈の起点、現在のステータスなどに使用します。
     * @default false
     */
    emphasized?: boolean;
    /** コンテンツ */
    children: ReactNode;
}

export declare type TimelineItemSpacing = 'normal' | 'loose';

export declare interface TimelineProps {
    /**
     * アイテム間のスペーシング
     * @default 'normal'
     */
    itemSpacing?: TimelineItemSpacing;
    /** Timeline.Item を配置 */
    children: ReactNode;
}

/**
 * Timeline
 *
 * 出来事や状態の変化を時系列に沿って表示するコンテナ。
 * Timeline.Item を子要素として配置して使用する。
 */
declare function TimelineRoot({ itemSpacing, children }: TimelineProps): JSX.Element;

/**
 * Tooltipコンポーネント
 *
 * 要素にホバーまたはフォーカスした際に追加情報を表示するコンポーネント。
 * Base UIのTooltipをベースに、アクセシビリティを考慮した実装となっています。
 *
 * @see https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/
 */
export declare const Tooltip: ({ label, children, side, align, }: TooltipProps) => default_2.JSX.Element;

/** ツールチップの配置調整 */
export declare type TooltipAlign = 'start' | 'center' | 'end';

export declare interface TooltipProps {
    /**
     * ツールチップに表示するラベルテキスト
     * @default 'ここにヒントを表示'
     */
    label?: string;
    /** ツールチップのトリガーとなる要素（単一のReact要素） */
    children: default_2.ReactElement;
    /**
     * ツールチップの表示方向
     * @default 'top'
     */
    side?: TooltipSide;
    /**
     * ツールチップの配置調整
     * @default 'center'
     */
    align?: TooltipAlign;
}

/** ツールチップの表示方向 */
export declare type TooltipSide = 'top' | 'bottom' | 'inline-start' | 'inline-end';

/** trash アイコン */
export declare const TrashIcon: ({ size }: {
    size?: 18 | 20 | 22 | 24;
}) => JSX.Element;

export declare const UserMessage: ({ children }: UserMessageProps) => default_2.JSX.Element;

export declare interface UserMessageProps {
    /** メッセージの内容 */
    children: default_2.ReactNode;
}

/**
 * Snackbar を表示・管理するためのhook。
 * Snackbar.Provider の内部で使用する。
 *
 * **用途: 成功フィードバック専用**
 * - Snackbar は成功時の短いフィードバックにのみ使用する
 * - 短時間で自動消去されるため、見逃してほしくない重要な情報には使わない
 * - 失敗・警告・エラーなどは InlineNotification 等の別コンポーネントで伝えること
 *
 * @example
 * ```tsx
 * const snackbar = useSnackbar();
 * snackbar.show('保存しました');
 * snackbar.show('完了しました', { size: 'medium' });
 * ```
 */
export declare function useSnackbar(): {
    /** Snackbar を表示する */
    show: (description: string, options?: SnackbarShowOptions) => string;
    /** 指定IDの Snackbar を閉じる */
    close: (toastId?: string) => void;
};

/**
 * useTableColumns
 *
 * カラムの表示項目切り替えを管理するカスタムHook。
 * メニューで項目を選択すると、ヘッダーラベルとデータキーが連動して切り替わる。
 *
 * @example
 * ```tsx
 * const columns = useTableColumns({
 *   revenue: {
 *     options: [
 *       { key: 'revenue', label: '営業利益' },
 *       { key: 'ebitda', label: 'EBITDA' },
 *     ],
 *   } as const,
 * });
 *
 * // columns.revenue.currentKey は 'revenue' | 'ebitda' 型
 * <TableHeaderCell menuItems={columns.revenue.menuItems}>
 *   {columns.revenue.currentLabel}
 * </TableHeaderCell>
 * <TableBodyCell>{row[columns.revenue.currentKey]}</TableBodyCell>
 * ```
 */
export declare function useTableColumns<Config extends Record<string, ColumnConfig<string>>>(config: Config): UseTableColumnsReturn<Config>;

/** Hook の戻り値型：各カラムIDに対応する ColumnState（キー型推論付き） */
export declare type UseTableColumnsReturn<Config extends Record<string, ColumnConfig<string>>> = {
    [P in keyof Config]: ColumnState<OptionKeysOf<Config[P]>>;
};

/**
 * useTableSort
 *
 * テーブルのソート状態管理とデータ並び替えを提供するカスタムHook。
 *
 * @example
 * ```tsx
 * const { sortedData, getSortState, createSortHandler } = useTableSort({ data: rows });
 *
 * <TableHeaderCell sortState={getSortState('name')} onSortChange={createSortHandler('name')}>
 *   企業名
 * </TableHeaderCell>
 * ```
 */
export declare function useTableSort<T extends Record<string, unknown>>({ data, compareFn, }: UseTableSortOptions<T>): UseTableSortReturn<T>;

export declare interface UseTableSortOptions<T> {
    /** ソート対象のデータ配列 */
    data: T[];
    /**
     * カスタム比較関数
     *
     * 指定しない場合、数値は数値比較、その他は文字列比較を行う。
     */
    compareFn?: (a: T, b: T, key: keyof T, direction: 'ascending' | 'descending') => number;
}

export declare interface UseTableSortReturn<T> {
    /** ソート済みデータ */
    sortedData: T[];
    /** 指定カラムの現在のソート状態を取得 */
    getSortState: (key: keyof T) => TableSortState;
    /** ソート変更ハンドラを生成（TableHeaderCell の onSortChange に渡す） */
    createSortHandler: (key: keyof T) => (nextState: TableSortState) => void;
    /** 現在のソートカラム（未ソート時は null） */
    sortKey: keyof T | null;
    /** 現在のソート方向 */
    sortState: TableSortState;
    /** ソートをリセット */
    resetSort: () => void;
}

/** ビューポート */
export declare type Viewport = 'desktop' | 'phone';

/** warning-fill アイコン */
export declare const WarningIcon: () => JSX.Element;

export { }
