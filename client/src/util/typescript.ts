import { ActivityCatType, ActivityType, EntryType } from '../types/types';

export const isOfType = <T>(
  varToBeChecked: any,
  propertyToCheckFor: keyof T
): varToBeChecked is T =>
  (varToBeChecked as T)[propertyToCheckFor] !== undefined;

export const isEntryType = (item: any) => isOfType<EntryType>(item, 'mood');

export const isActivityType = (item: any) =>
  isOfType<ActivityType>(item, 'icon');

export const isActivityCatType = (item: any) =>
  isOfType<ActivityCatType>(item, 'activities');
