import { EntryType, StatusType } from './types';

export type MoodAvatarProps = {
  mood: number;
  size?: 'large' | 'small';
  button?: boolean;
  inactive?: boolean;
  onClick?: (...args: any[]) => void;
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
  selectDate: (date: Date | null) => void;
};

export type EntryListItemProps = {
  entry: EntryType;
  selectDate: (date: Date | null) => void;
  onEdit: (entry: EntryType) => void;
  onDelete: (entry: EntryType) => void;
};

export type EntryDetailsProps = {
  entry: EntryType | null | undefined;
  onClose: (...args: any[]) => void;
  onSave: (...args: any[]) => void;
  onChange: (entry: EntryType) => void;
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
