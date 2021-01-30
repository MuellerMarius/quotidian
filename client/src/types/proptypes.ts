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

export type EntryListItemProps = {
  entry: EntryType;
  onClick: (...args: any[]) => void;
  onClose: (...args: any[]) => void;
  confirmDelete: (entry: EntryType) => void;
};

export type EntryDetailsProps = {
  entry: EntryType;
  onClose: (...args: any[]) => void;
};

export type ScreenProps = { status: StatusType };

export type ConfirmDialogProps = {
  open: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onClose: () => void;
};
