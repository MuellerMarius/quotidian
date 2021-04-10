export type EntryType = {
  _id?: string;
  __v?: number | null;
  user?: string;
  mood: number;
  date: Date;
  activities: string[];
  comment: string;
};

export type ActivityCatType = {
  _id: string;
  name: string;
  activities: ActivityType[];
};

export type ActivityType = {
  _id: string;
  name: string;
  icon: string;
  parentCatId?: string;
};

export type AvatarType = {
  topType: string;
  accessoriesType: string;
  hairColor: string;
  hatColor: string;
  facialHairType: string;
  facialHairColor: string;
  clotheType: string;
  clotheColor: string;
  eyebrowType: string;
  mouthType: string;
  skinColor: string;
};

export type UserType = {
  _id: string;
  name: string;
  email: string;
  token: string;
  avatar: AvatarType;
};

export type CommonUserDataType = {
  entries: EntryType[];
  activities: ActivityCatType[];
};

export type SeverityType = 'error' | 'success' | 'info' | 'warning';

export type SnackBarType = {
  message: string;
  severity: SeverityType | undefined;
  open?: boolean;
  autoHideDuration?: number;
};

export type DialogState = {
  open: boolean;
  title: string;
  content: string;
  onConfirm?: (...args: any[]) => void | null | undefined;
  onCancel?: (...args: any[]) => void | null | undefined;
};

export type FormValidationType =
  | 'email'
  | 'password'
  | 'nonEmptyField'
  | 'date'
  | 'equals';

export type FormRuleType =
  | {
      type: Exclude<FormValidationType, 'equals'>;
    }
  | {
      type: 'equals';
      field: string;
    };

export type FormValidationConfig = {
  inputName: string;
  rules: FormRuleType[];
};

export type StatusType = 'idle' | 'loading' | 'resolved' | 'error';
