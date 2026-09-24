import React, { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Tag,
  Space,
  Popconfirm,
  message,
  Card,
  Spin,
} from "antd";
import {
  UserOutlined,
  PlusOutlined,
  DeleteOutlined,
  ReloadOutlined,
  LockOutlined,
  IdcardOutlined,
  SafetyCertificateOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useGetUsersQuery, useCreateUserMutation, useDeleteUserMutation } from "../../Services";

export const UsersPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const { data: usersResponse, isLoading, refetch } = useGetUsersQuery();
  const createUserMutation = useCreateUserMutation();
  const deleteUserMutation = useDeleteUserMutation();

  const usersList = Array.isArray(usersResponse?.data) ? usersResponse.data : [];

  const handleAddUser = (values: any) => {
    createUserMutation.mutate(values, {
      onSuccess: (res) => {
        if (res.success) {
          message.success(res.message || "User created successfully!");
          setIsModalOpen(false);
          form.resetFields();
        } else {
          message.error(res.message || "Failed to create user.");
        }
      },
      onError: (err: any) => {
        message.error(err?.message || "Error creating user");
      },
    });
  };

  const handleDelete = (id: number) => {
    deleteUserMutation.mutate(id, {
      onSuccess: (res) => {
        if (res.success) {
          message.success("User deleted successfully!");
        } else {
          message.error(res.message || "Failed to delete user.");
        }
      },
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      render: (id: number) => <span className="font-mono text-slate-500">#{id}</span>,
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (username: string) => (
        <div className="flex items-center gap-3">
          <div className="size-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-sm">
            {username ? username.charAt(0).toUpperCase() : "U"}
          </div>
          <span className="font-semibold text-slate-800">{username}</span>
        </div>
      ),
    },
    {
      title: "Employee ID",
      dataIndex: "employee_id",
      key: "employee_id",
      render: (empId: number | null) =>
        empId ? (
          <Tag color="blue" className="rounded-md">
            EMP-{empId}
          </Tag>
        ) : (
          <span className="text-slate-400 text-xs">N/A</span>
        ),
    },
    {
      title: "User Role ID",
      dataIndex: "user_role_id",
      key: "user_role_id",
      render: (roleId: number | null) =>
        roleId ? (
          <Tag color="purple" className="rounded-md">
            Role #{roleId}
          </Tag>
        ) : (
          <Tag color="default" className="rounded-md">
            Standard
          </Tag>
        ),
    },
    {
      title: "Last Login",
      dataIndex: "last_login",
      key: "last_login",
      render: (lastLogin: string | null) => (
        <span className="text-slate-500 text-xs flex items-center gap-1">
          <ClockCircleOutlined />
          {lastLogin ? new Date(lastLogin).toLocaleString() : "Never"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 100,
      render: (_: any, record: any) => (
        <Popconfirm
          title="Delete User"
          description={`Are you sure you want to delete user "${record.username}"?`}
          onConfirm={() => handleDelete(record.id)}
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
        >
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            loading={deleteUserMutation.isPending}
          />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <UserOutlined className="text-indigo-600" /> User Management
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage system access accounts, roles, and credentials.
          </p>
        </div>
        <Space>
          <Button icon={<ReloadOutlined />} onClick={() => refetch()} className="rounded-xl">
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
            className="rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/20"
          >
            Add New User
          </Button>
        </Space>
      </div>

      {/* Users Table Card */}
      <Card className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="py-12 text-center">
            <Spin size="large" />
            <p className="text-slate-400 mt-4 text-sm">Loading users from database...</p>
          </div>
        ) : (
          <Table
            dataSource={usersList}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10 }}
            className="rounded-xl"
          />
        )}
      </Card>

      {/* Add User Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-lg font-bold text-slate-800 pb-2 border-b">
            <PlusOutlined className="text-indigo-600" /> Add New User
          </div>
        }
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
        footer={null}
        destroyOnClose
        className="rounded-2xl"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleAddUser}
          className="pt-4 space-y-4"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please enter a username" }]}
          >
            <Input
              prefix={<UserOutlined className="text-slate-400" />}
              placeholder="e.g. saman"
              className="rounded-xl"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter a password" },
              { min: 6, message: "Password must be at least 6 characters" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-slate-400" />}
              placeholder="Enter password (e.g. 123123)"
              className="rounded-xl"
            />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Employee ID" name="employee_id">
              <InputNumber
                prefix={<IdcardOutlined className="text-slate-400" />}
                placeholder="e.g. 1"
                className="w-full rounded-xl"
                min={1}
              />
            </Form.Item>

            <Form.Item label="User Role ID" name="user_role_id">
              <InputNumber
                prefix={<SafetyCertificateOutlined className="text-slate-400" />}
                placeholder="e.g. 1"
                className="w-full rounded-xl"
                min={1}
              />
            </Form.Item>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              onClick={() => {
                setIsModalOpen(false);
                form.resetFields();
              }}
              className="rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={createUserMutation.isPending}
              className="rounded-xl bg-indigo-600 hover:bg-indigo-700 font-semibold"
            >
              Save User
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default UsersPage;
