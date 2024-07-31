export interface LoginButtonProps {
  onClick: () => void;
}

export const LoginButton = ({ onClick }: LoginButtonProps) => {
  return (
    <div className="mb-safe fixed bottom-1 left-1 z-20 h-12 w-12 rounded-full">
      <button
        type="button"
        className="size-full cursor-pointer rounded-full"
        onClick={onClick}
      >
        <span className="sr-only">Open sign in form</span>
      </button>
    </div>
  );
};
