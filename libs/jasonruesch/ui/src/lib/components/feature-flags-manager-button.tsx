export interface FeatureFlagsManagerButtonProps {
  onClick: () => void;
}

export const FeatureFlagsManagerButton = ({
  onClick,
}: FeatureFlagsManagerButtonProps) => {
  return (
    <div className="mb-safe fixed bottom-1 left-1 z-20 size-12 rounded-full">
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
