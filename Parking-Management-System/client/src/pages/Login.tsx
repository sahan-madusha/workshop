import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, AppstoreOutlined } from "@ant-design/icons";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SYSTEM_NAME = process.env.REACT_APP_SYSTEM_NAME || "System Control Panel";

export const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      await login(values);
      message.success("Signed in successfully!");
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      message.error(err.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      {/* Background Decorator */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-200/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-200/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-indigo-600 text-white text-2xl shadow-lg shadow-indigo-600/30 mb-4">
            <AppstoreOutlined />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {SYSTEM_NAME}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Please enter your credentials to access your account.
          </p>
        </div>

        {/* Login Form */}
        <Form layout="vertical" onFinish={handleSubmit} requiredMark={false}>
          <Form.Item
            label={<span className="font-medium text-slate-700">Username</span>}
            name="username"
            rules={[{ required: true, message: "Username is required" }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="text-slate-400" />}
              placeholder="e.g. admin"
              className="rounded-xl"
            />
          </Form.Item>

          <Form.Item
            label={<span className="font-medium text-slate-700">Password</span>}
            name="password"
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password
              size="large"
              prefix={<LockOutlined className="text-slate-400" />}
              placeholder="••••••••"
              className="rounded-xl"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            block
            loading={loading}
            className="h-12 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-semibold shadow-lg shadow-indigo-600/20 border-none mt-2"
          >
            Sign In
          </Button>
        </Form>

        {/* Footer */}
        <div className="text-center text-xs text-slate-400 mt-8 pt-6 border-t border-slate-100">
          © {new Date().getFullYear()} All Rights Reserved.
        </div>
      </div>
    </div>
  );
};
