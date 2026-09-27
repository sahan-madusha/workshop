import React from "react";
import { Card, Statistic } from "antd";
import {
  UserOutlined,
  CheckCircleOutlined,
  SafetyCertificateOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { useAuth } from "../context/AuthContext";
import { Navbar } from "../components/Navbar";

const SYSTEM_NAME = process.env.REACT_APP_SYSTEM_NAME || "System Dashboard";

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto p-6 md:p-8 space-y-8">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 shadow-xl">
          <div className="relative z-10 space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold uppercase tracking-wider">
              Authenticated Session
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Welcome back, {user?.username || "Admin"}! 👋
            </h1>
            <p className="text-indigo-200/80 text-sm max-w-xl">
              {SYSTEM_NAME} is active and online. You are signed in securely.
            </p>
          </div>
          <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title={<span className="text-slate-500 font-medium">Logged In User</span>}
              value={user?.username || "Admin"}
              prefix={<UserOutlined className="text-indigo-600 mr-2" />}
              valueStyle={{ fontWeight: "bold", color: "#1e293b" }}
            />
          </Card>

          <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title={<span className="text-slate-500 font-medium">System Status</span>}
              value="Operational"
              prefix={<CheckCircleOutlined className="text-emerald-600 mr-2" />}
              valueStyle={{ fontWeight: "bold", color: "#059669" }}
            />
          </Card>

          <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <Statistic
              title={<span className="text-slate-500 font-medium">Security Mode</span>}
              value="JWT Bearer Auth"
              prefix={<SafetyCertificateOutlined className="text-purple-600 mr-2" />}
              valueStyle={{ fontSize: "1.2rem", fontWeight: "bold", color: "#7c3aed" }}
            />
          </Card>
        </div>

        {/* Dashboard Content Card */}
        <Card className="rounded-2xl border-slate-200 shadow-sm p-4">
          <div className="flex items-center gap-4 py-4">
            <div className="size-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-2xl font-bold">
              <AppstoreOutlined />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Control Panel Overview</h3>
              <p className="text-slate-500 text-sm">
                System initialized and ready for application features and user operations.
              </p>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
};
