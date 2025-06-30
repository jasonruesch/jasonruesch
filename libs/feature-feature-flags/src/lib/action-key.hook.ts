export interface ActionKey {
  key: string;
  name: string;
  ctrlKey: boolean;
  metaKey: boolean;
}

const ACTION_KEY_DEFAULT: ActionKey = {
  key: 'Ctrl ',
  name: 'Control',
  ctrlKey: true,
  metaKey: false,
};
const ACTION_KEY_APPLE: ActionKey = {
  key: '⌘',
  name: 'Command',
  ctrlKey: false,
  metaKey: true,
};

/**
 * Get the action key for the current platform.
 * @returns Either Ctrl or ⌘ depending on the platform.
 */
export function useActionKey() {
  let actionKey: ActionKey = ACTION_KEY_DEFAULT;

  if (typeof navigator !== 'undefined') {
    if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent)) {
      actionKey = ACTION_KEY_APPLE;
    }
  }

  return actionKey;
}
