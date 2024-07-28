export interface FeatureFlagsManagerButtonProps {
  onClick: () => void;
}

export const FeatureFlagsManagerButton = ({
  onClick,
}: FeatureFlagsManagerButtonProps) => {
  return (
    <div className="ml-safe mb-safe fixed bottom-1 left-1 z-20 h-12 w-12 rounded-full">
      <button
        type="button"
        className="size-full cursor-pointer rounded-full"
        onClick={onClick}
      >
        <span className="sr-only">Open flags manager</span>
      </button>
    </div>
  );
};
