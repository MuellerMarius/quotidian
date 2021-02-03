import { DialogState, EntryType, StatusType } from './types';

export type MoodAvatarProps = {
  mood: number;
  size?: 'large' | 'small';
  inactive?: boolean;
};

export type MoodSelectorProps = {
  mood: number;
  onChange: (mood: number) => void;
};

export type MoodAvatarRadioProps = { mood: number };

export type EntryListProps = {
  status: StatusType;
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

export type ScreenProps = { status: StatusType };

export type ConfirmDialogProps = {
  open: boolean;
  title: string;
  content: string;
  onConfirm?: (...args: any[]) => void | null | undefined;
  onCancel?: (...args: any[]) => void | null | undefined;
  onClose: (...args: any[]) => void;
};
