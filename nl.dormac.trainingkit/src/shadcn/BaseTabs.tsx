import React, {
  createContext,
  forwardRef,
  HTMLAttributes,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { cn } from './utils/cn';

type BaseTabsProps = {
  defaultTab: string;
  children: ReactNode;
  className?: string;
};

type BaseTabsContextValue = {
  activeTab: string;
  setActiveTab: (value: string) => void;
};

const BaseTabsContext = createContext<BaseTabsContextValue>({
  activeTab: 'default',
  setActiveTab() {
    return undefined;
  },
});

function BaseTabs({ children, defaultTab, className }: BaseTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <BaseTabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </BaseTabsContext.Provider>
  );
}

const BaseTabsList = forwardRef<HTMLDivElement, any>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'tw-w-full tw-inline-flex tw-h-12 tw-items-center tw-justify-center tw-rounded-md tw-bg-slate-100 tw-p-1 tw-text-slate-500',
        className,
      )}
      {...props}
    />
  ),
);
BaseTabsList.displayName = 'BaseTabsList';

type BaseTabsTriggerProps = HTMLAttributes<HTMLButtonElement> & {
  value: string;
};

const BaseTabsTrigger = forwardRef<HTMLButtonElement, BaseTabsTriggerProps>(
  ({ className, ...props }, ref) => {
    const { activeTab, setActiveTab } = useContext(BaseTabsContext);

    const isActive = props.value === activeTab;

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-1 tw-py-1.5 tw-h-10 tw-text-md tw-font-medium tw-ring-offset-white tw-transition-all focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-slate-950 focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50',
          { 'tw-bg-white tw-text-slate-950 tw-shadow-sm': isActive },
          className,
        )}
        onClick={() => setActiveTab(props.value)}
        {...props}
      />
    );
  },
);
BaseTabsTrigger.displayName = 'BaseTabsTrigger';

type BaseTabsContentProps = HTMLAttributes<HTMLDivElement> & {
  value: string;
};

const BaseTabsContent = forwardRef<HTMLDivElement, BaseTabsContentProps>(
  ({ className, ...props }, ref) => {
    const { activeTab } = useContext(BaseTabsContext);

    const isActive = props.value === activeTab;

    if (!isActive) {
      return null;
    }

    return (
      <div
        ref={ref}
        className={cn(
          'tw-mt-6 tw-ring-offset-white focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-slate-950 focus-visible:tw-ring-offset-2',
          className,
        )}
        {...props}
      />
    );
  },
);
BaseTabsContent.displayName = 'BaseTabsContent';

export { BaseTabs, BaseTabsContent, BaseTabsList, BaseTabsTrigger };
