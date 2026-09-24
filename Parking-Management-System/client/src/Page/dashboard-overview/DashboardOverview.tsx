import React from "react";
import { Card, Statistic, Button } from "antd";
import { UserOutlined, KeyOutlined, SafetyCertificateOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuthChecker } from "../../Context";
import { useGetUsersQuery } from "../../Services";

export const DashboardOverview: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthChecker();
  const { data: usersResponse } = useGetUsersQuery();

  const totalUsers = Array.isArray(usersResponse?.data) ? usersResponse.data.length : 0;

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white p-8 shadow-xl">
        <div className="relative z-10 space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-semibold uppercase tracking-wider">
            JWT Authenticated Session
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Welcome back, {user?.username || "Admin"}! 👋
          </h1>
          <p className="text-indigo-200/80 text-sm max-w-xl">
            Parking Management Control Panel is active. You are logged in with JWT security.
          </p>
          <div className="pt-4">
            <Button
              type="primary"
              icon={<UserOutlined />}
              onClick={() => navigate("/system/users")}
              className="h-10 rounded-xl bg-indigo-500 hover:bg-indigo-600 border-none font-semibold shadow-lg shadow-indigo-500/30"
            >
              Manage Users <ArrowRightOutlined />
            </Button>
          </div>
        </div>
        <div className="absolute -right-10 -bottom-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <Statistic
            title={<span className="text-slate-500 font-medium">Active System Users</span>}
            value={totalUsers}
            prefix={<UserOutlined className="text-indigo-600 mr-2" />}
          />
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <Statistic
            title={<span className="text-slate-500 font-medium">Authentication</span>}
            value="JWT (Bearer Token)"
            prefix={<KeyOutlined className="text-emerald-600 mr-2" />}
            valueStyle={{ fontSize: "1.2rem", fontWeight: "bold" }}
          />
        </Card>

        <Card className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <Statistic
            title={<span className="text-slate-500 font-medium">Database Table</span>}
            value="user (MySQL)"
            prefix={<SafetyCertificateOutlined className="text-purple-600 mr-2" />}
            valueStyle={{ fontSize: "1.2rem", fontWeight: "bold" }}
          />
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
