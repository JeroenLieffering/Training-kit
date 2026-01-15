import React, {
  forwardRef,
  HTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';
import { cn } from './utils/cn';

const BaseTable = forwardRef<
  HTMLTableElement,
  HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="tw-relative tw-w-full tw-overflow-auto">
    <table
      ref={ref}
      className={cn('tw-w-full tw-caption-bottom tw-text-md', className)}
      {...props}
    />
  </div>
));
BaseTable.displayName = 'BaseTable';

const BaseTableHeader = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      '[&_tr]:tw-border-b tw-border-gray-200 tw-border-solid',
      className,
    )}
    {...props}
  />
));
BaseTableHeader.displayName = 'BaseTableHeader';

const BaseTableBody = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:tw-border-0', className)}
    {...props}
  />
));
BaseTableBody.displayName = 'BaseTableBody';

const BaseTableFooter = forwardRef<
  HTMLTableSectionElement,
  HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'tw-border-t tw-border-gray-200 tw-border-solid tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0',
      className,
    )}
    {...props}
  />
));
BaseTableFooter.displayName = 'BaseTableFooter';

const BaseTableRow = forwardRef<
  HTMLTableRowElement,
  HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'tw-border-b tw-border-gray-200 tw-border-solid tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted',
      className,
    )}
    {...props}
  />
));
BaseTableRow.displayName = 'BaseTableRow';

const BaseTableHead = forwardRef<
  HTMLTableCellElement,
  ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'tw-h-12 tw-px-4 tw-text-left tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pr-0',
      className,
    )}
    {...props}
  />
));
BaseTableHead.displayName = 'BaseTableHead';

const BaseTableCell = forwardRef<
  HTMLTableCellElement,
  TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pr-0',
      className,
    )}
    {...props}
  />
));
BaseTableCell.displayName = 'BaseTableCell';

const BaseTableCaption = forwardRef<
  HTMLTableCaptionElement,
  HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('tw-mt-4 tw-text-md tw-text-muted-foreground', className)}
    {...props}
  />
));
BaseTableCaption.displayName = 'BaseTableCaption';

export {
  BaseTable,
  BaseTableHeader,
  BaseTableBody,
  BaseTableFooter,
  BaseTableHead,
  BaseTableRow,
  BaseTableCell,
  BaseTableCaption,
};
