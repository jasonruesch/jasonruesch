import { forwardRef } from "react";

import clsx from "clsx";

export const ContainerOuter = forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(function OuterContainer({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={clsx(
        "sm:pr-[calc(env(safe-area-inset-right)+(--spacing(8)))] sm:pl-[calc(env(safe-area-inset-left)+(--spacing(8)))]",
        className,
      )}
      {...props}
    >
      <div
        className={clsx(
          "mx-auto w-full",
          "max-w-[calc(var(--container-7xl)-env(safe-area-inset-right)-env(safe-area-inset-left))]",
          "lg:pr-[calc(env(safe-area-inset-right)+(--spacing(8)))] lg:pl-[calc(env(safe-area-inset-left)+(--spacing(8)))]",
        )}
      >
        {children}
      </div>
    </div>
  );
});

export const ContainerInner = forwardRef<
  React.ComponentRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(function InnerContainer({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={clsx("relative px-4 sm:px-8 lg:px-12", className)}
      {...props}
    >
      <div className="mx-auto max-w-2xl lg:max-w-5xl">{children}</div>
    </div>
  );
});

export const Container = forwardRef<
  React.ComponentRef<typeof ContainerOuter>,
  React.ComponentPropsWithoutRef<typeof ContainerOuter>
>(function Container({ children, ...props }, ref) {
  return (
    <ContainerOuter ref={ref} {...props}>
      <ContainerInner>{children}</ContainerInner>
    </ContainerOuter>
  );
});
