import {
  ActivityCatType,
  ActivityType,
  DialogState,
  EntryType,
  StatusType,
} from './types';

export type LinkProps = {
  to: string;
  onClick: React.MouseEventHandler<HTMLLIElement>;
};

export type MoodAvatarProps = {
  mood: number;
  size?: 'large' | 'small';
  inactive?: boolean;
};

export type MoodSelectorProps = {
  mood: number;
  onChange: (mood: number) => void;
  autoFocus?: boolean;
};

export type ActivitySelectorProps = {
  active: string[];
  onChange: (category: string) => void;
};

export type MoodAvatarRadioProps = { mood: number; autoFocus?: boolean };

export type EntryListProps = {
  status: StatusType;
  activeMonth: Date;
  onAdd: (...args: any) => void;
  onEdit: (entry: EntryType) => void;
  onDelete: (entry: EntryType) => void;
};

export type EntryListItemProps = {
  entry: EntryType;
  onEdit: (entry: EntryType) => void;
  onDelete: (entry: EntryType) => void;
};

export type EntryEditorProps = {
  setDialog: (dialog: DialogState) => void;
};

export type EntryScreenProps = { status: StatusType };

export type EntriesProps = EntryScreenProps & {
  activeMonth: Date;
};

export type ConfirmDialogProps = {
  open: boolean;
  title: string;
  content: string;
  onConfirm?: (...args: any[]) => void | null | undefined;
  onCancel?: (...args: any[]) => void | null | undefined;
  onClose: (...args: any[]) => void;
};

export type CalendarProps = {
  activeMonth: Date;
  setActiveMonth: (month: Date) => void;
};

export type EditableTypoProps = {
  text: string;
  onSubmit: (value: string) => void;
  onEscape?: () => void;
  autoFocus?: boolean;
};

export type ActivityEditorProps = {
  status: StatusType;
};

export type ActivityListItemProps = {
  activity: ActivityType;
  setDialog: (dialog: DialogState) => void;
};

export type ActivityListCategoryProps = {
  category: ActivityCatType;
  setDialog: (dialog: DialogState) => void;
};

export type ActivityListAddProps =
  | {
      type: 'activity';
      category: ActivityCatType;
    }
  | { type: 'category' };

export type IconPickerProps = {
  onChange: (icon: string) => void;
};

export type IconSearchFilterProps = {
  onSearch: (filter: string) => void;
  onReset: () => void;
};
