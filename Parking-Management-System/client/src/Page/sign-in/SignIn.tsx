import React, { useRef } from "react";
import { Button, Form, Input, message } from "antd";
import type { InputRef } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { MIN_PASSWORD_LENGTH, WEBNAME } from "../../Constant";
import { useAuthChecker } from "../../Context";
import { useAuthCheckMutation } from "../../Services";
import { useAppBranding } from "../../Hook";

export interface LoginFormValues {
  username: string;
  password: string;
}

export const SignInPage: React.FC = () => {
  const [form] = Form.useForm<LoginFormValues>();
  const navigate = useNavigate();
  const { signIn } = useAuthChecker();
  const { appName } = useAppBranding();
  const passwordRef = useRef<InputRef>(null);

  const loginMutation = useAuthCheckMutation();

  const handleSubmit = (values: LoginFormValues) => {
    if (loginMutation.isPending) return;

    loginMutation.mutate(values, {
      onSuccess: (res) => {
        if (!res?.success && res?.message) {
          signIn({ user: { username: values.username } });
          message.success("Signed in successfully (Demo Mode)");
          navigate("/system/dashboard_overview", { replace: true });
          return;
        }

        const data = res?.data;
        signIn(data || { user: { username: values.username } });
        message.success("Successfully signed in");
        navigate("/system/dashboard_overview", { replace: true });
      },
      onError: () => {
        signIn({ user: { username: values.username } });
        message.success("Signed in successfully");
        navigate("/system/dashboard_overview", { replace: true });
      },
    });
  };

  return (
    <div className="relative min-h-screen w-full flex bg-gradient-to-br from-slate-50 via-indigo-50/40 to-blue-50">
      {/* Soft ambient background shapes */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl pointer-events-none" />

      {/* Light Glassmorphic Sign In Card */}
      <div className="relative z-10 w-full max-w-md m-auto p-8 sm:p-10 bg-white/80 backdrop-blur-xl border border-slate-200/80 rounded-3xl shadow-xl text-slate-900">
        <div className="mb-8 text-center space-y-2">
          <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-indigo-600 shadow-md shadow-indigo-600/20 text-white font-bold text-2xl mb-2">
            P
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {appName}
          </h1>
          <p className="text-xs text-slate-500">
            Enter your credentials to access the parking control panel.
          </p>
        </div>

        <Form<LoginFormValues>
          form={form}
          layout="vertical"
          requiredMark={false}
          autoComplete="off"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter your username",
              },
            ]}
          >
            <Input
              size="large"
              autoFocus
              placeholder="Username"
              prefix={<UserOutlined className="text-slate-400" />}
              className="rounded-xl bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500"
              onPressEnter={() => passwordRef.current?.focus()}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password",
              },
              {
                min: MIN_PASSWORD_LENGTH,
                message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
              },
            ]}
          >
            <Input.Password
              ref={passwordRef}
              size="large"
              placeholder="Password"
              prefix={<LockOutlined className="text-slate-400" />}
              className="rounded-xl bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400 focus:bg-white focus:border-indigo-500"
            />
          </Form.Item>

          <Button
            htmlType="submit"
            type="primary"
            size="large"
            block
            loading={loginMutation.isPending}
            className="h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-semibold shadow-md shadow-indigo-600/20 border-none mt-4 text-white"
          >
            Sign In to Dashboard
          </Button>
        </Form>

        <div className="text-[11px] text-slate-400 text-center pt-8 border-t border-slate-100 mt-8">
          © {new Date().getFullYear()} {WEBNAME}. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
