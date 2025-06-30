import { useLocation, useNavigate } from 'react-router';

import {
  Button,
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
  Label,
  Switch,
  SwitchField,
} from '@jasonruesch/ui';
import { useEffect, useState } from 'react';
import { useActionKey } from './action-key.hook';
import { useFeatureFlags } from './feature-flag-provider';

export function FeatureFlagToggleDialog() {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const { flags, setFlags, resetFlags } = useFeatureFlags();
  const { ctrlKey, metaKey } = useActionKey();
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = (key: string, checked: boolean) => {
    setFlags({ ...flags, [key]: checked });
  };

  const handleClose = () => {
    const searchParams = new URLSearchParams(search);
    searchParams.delete('dev');
    const newUrl =
      searchParams.size > 0
        ? `${pathname}?${searchParams.toString()}`
        : pathname;
    navigate(newUrl, { replace: true });
  };

  useEffect(() => {
    if (import.meta.env.PROD) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl|Command + Shift + F(lags) to toggle dev flags panel
      if (
        ((ctrlKey && event.ctrlKey) || (metaKey && event.metaKey)) &&
        event.shiftKey &&
        event.key === 'f'
      ) {
        event.preventDefault();

        const searchParams = new URLSearchParams(search);
        // Toggle the 'dev' query parameter
        if (searchParams.get('dev') === 'true') {
          searchParams.delete('dev');
        } else {
          searchParams.set('dev', 'true');
        }
        const newUrl =
          searchParams.size > 0
            ? `${pathname}?${searchParams.toString()}`
            : pathname;
        navigate(newUrl, { replace: true });
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [ctrlKey, metaKey, pathname, search, navigate]);

  useEffect(() => {
    if (import.meta.env.PROD) return;

    const searchParams = new URLSearchParams(search);
    if (searchParams.get('dev') === 'true') {
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [search]);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Feature Flags</DialogTitle>
      <DialogDescription>
        Toggle feature flags for development purposes.
      </DialogDescription>
      <DialogBody>
        {Object.entries(flags).map(([key, value]) => (
          <SwitchField key={key} className="flex items-center justify-between">
            <Label>{key}</Label>
            <Switch
              name={key}
              checked={value}
              onChange={(checked) => handleToggle(key, checked)}
            />
          </SwitchField>
        ))}
      </DialogBody>
      <DialogActions>
        <Button plain onClick={handleClose}>
          Close
        </Button>
        <Button onClick={resetFlags}>Reset Flags</Button>
      </DialogActions>
    </Dialog>
  );
}
