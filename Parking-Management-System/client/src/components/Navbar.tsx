import React from "react";
import { Button } from "antd";
import { LogoutOutlined, AppstoreOutlined, UserOutlined } from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SYSTEM_NAME = process.env.REACT_APP_SYSTEM_NAME || "Management System";

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <header className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-indigo-600/20">
            <AppstoreOutlined />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-base leading-tight">
              {SYSTEM_NAME}
            </h1>
            <p className="text-xs text-slate-500">Control Panel</p>
          </div>
        </div>

        {/* User profile & Logout */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200">
            <div className="size-7 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
              <UserOutlined />
            </div>
            <span className="text-sm font-semibold text-slate-800">
              {user?.username || "Admin"}
            </span>
          </div>

          <Button
            type="text"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className="rounded-xl font-medium"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};
