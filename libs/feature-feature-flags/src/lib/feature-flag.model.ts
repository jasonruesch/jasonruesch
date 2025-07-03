export enum FeatureFlag {
  AllNavigation = 'all_navigation',
  HiddenNavigation = 'hidden_navigation',
}

export type FeatureFlags = Record<FeatureFlag | string, boolean>;

export const defaultFlags: FeatureFlags = {
  [FeatureFlag.AllNavigation]: false,
  [FeatureFlag.HiddenNavigation]: false,
};
