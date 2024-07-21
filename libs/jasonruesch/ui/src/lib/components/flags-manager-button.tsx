export interface FlagsManagerButtonProps {
  onClick: () => void;
}

export const FlagsManagerButton = ({ onClick }: FlagsManagerButtonProps) => {
  return (
    <div className="ml-safe mb-safe fixed bottom-0 left-0 z-20 h-12 w-12 rounded-full">
      <button
        type="button"
        className="flex h-full w-full cursor-pointer items-center justify-center focus-visible:outline-none"
        onClick={onClick}
      >
        <span className="sr-only">Open flags manager</span>
      </button>
    </div>
  );
};
