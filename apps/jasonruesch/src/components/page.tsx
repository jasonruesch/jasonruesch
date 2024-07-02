import { twMerge } from 'tailwind-merge';

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

export const Page = ({ children, className }: PageProps) => {
  return (
    <div
      className={twMerge(
        'min-h-dvh flex flex-col px-4 py-16',
        'bg-neutral-100 dark:bg-neutral-900',
        // 'bg-neutral-100/30 dark:bg-neutral-900/30 backdrop-blur backdrop-brightness-150',
        className,
      )}
    >
      {children}
    </div>
  );
};
