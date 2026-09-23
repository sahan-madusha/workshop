import React from "react";
import { Drawer } from "antd";

interface UpgradePlanDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const UpgradePlanDrawer: React.FC<UpgradePlanDrawerProps> = ({
  open,
  onClose,
}) => {
  return (
    <Drawer
      title="System Status"
      open={open}
      onClose={onClose}
      width={400}
    >
      <div className="p-4">
        <p className="text-sm text-slate-600">Parking Management System v1.0.0</p>
      </div>
    </Drawer>
  );
};
