import React, { ReactNode } from "react";
import { Button } from "antd";
import type { ButtonProps } from "antd";
import type { TablePaginationConfig } from "antd/es/table";

export const APP_BUTTON_SIZE: ButtonProps["size"] = "middle";

export const DRAWER_FORM_WIDTH = 660;
export const DRAWER_DETAIL_WIDTH = 640;
export const DRAWER_WIDE_WIDTH = 720;

const classNames = (...values: Array<string | false | null | undefined>) =>
  values.filter(Boolean).join(" ");

export const drawerTitle = (title: ReactNode, subtitle?: ReactNode) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-sm font-semibold text-gray-900 leading-5">
      {title}
    </span>
    {subtitle && (
      <span className="text-xs font-normal text-gray-400 leading-4">
        {subtitle}
      </span>
    )}
  </div>
);

interface DrawerFooterAction {
  key?: React.Key;
  label: ReactNode;
  onClick?: () => void;
  loading?: boolean;
  disabled?: boolean;
  danger?: boolean;
  type?: ButtonProps["type"];
  htmlType?: ButtonProps["htmlType"];
  className?: string;
  icon?: ReactNode;
}

export const drawerFooter = ({
  left,
  actions,
  className,
}: {
  left?: ReactNode;
  actions: DrawerFooterAction[];
  className?: string;
}) => (
  <div
    className={classNames(
      "flex flex-wrap items-center gap-3 py-2",
      left ? "justify-between" : "justify-end",
      className,
    )}
  >
    {left && <div className="text-xs font-medium text-gray-500">{left}</div>}
    <div className="flex flex-wrap items-center justify-end gap-2">
      {actions.map((action, index) => (
        <Button
          key={action.key ?? index}
          size={APP_BUTTON_SIZE}
          type={action.type}
          htmlType={action.htmlType}
          danger={action.danger}
          loading={action.loading}
          disabled={action.disabled}
          onClick={action.onClick}
          icon={action.icon}
          className={classNames("min-w-[96px]", action.className)}
        >
          {action.label}
        </Button>
      ))}
    </div>
  </div>
);

export const modalTitle = drawerTitle;
export const modalFooter = drawerFooter;

export const tablePagination = ({
  current,
  pageSize,
  total,
  onChange,
  itemName,
}: {
  current: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
  itemName?: string;
}): TablePaginationConfig => ({
  current,
  pageSize,
  total,
  showSizeChanger: false,
  size: "small",
  position: ["bottomRight"],
  onChange: (page) => onChange(page),
  showTotal: (count, range) =>
    count > 0
      ? `Showing ${range[0]}-${range[1]} of ${count}${itemName ? ` ${itemName}` : ""}`
      : `No${itemName ? ` ${itemName}` : " records"}`,
});
