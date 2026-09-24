import "./globals.css";
import "antd/dist/reset.css";
import React, { Suspense } from "react";
import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import { Spin } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/side-bar/AppSidebar";
import { AuthProvider, useAuthChecker } from "./Context";
import { ProtectedRoute } from "./Hook";

const PageLoading = () => (
  <div className="flex justify-center items-center h-screen bg-slate-50">
    <Spin size="large" />
  </div>
);

const SignInPage = React.lazy(() =>
  import("./Page/sign-in/SignIn").then((m) => ({ default: m.SignInPage })),
);

const DashboardOverview = React.lazy(() =>
  import("./Page/dashboard-overview/DashboardOverview").then((m) => ({
    default: m.DashboardOverview,
  })),
);

const UsersPage = React.lazy(() =>
  import("./Page/users/UsersPage").then((m) => ({
    default: m.UsersPage,
  })),
);

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuth } = useAuthChecker();

  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        {/* Public Sign In */}
        <Route
          path="/"
          element={
            isAuth ? (
              <Navigate to="/system/dashboard_overview" replace />
            ) : (
              <SignInPage />
            )
          }
        />
        <Route
          path="/login"
          element={
            isAuth ? (
              <Navigate to="/system/dashboard_overview" replace />
            ) : (
              <SignInPage />
            )
          }
        />

        {/* Protected Parking System Routes */}
        <Route
          path="/system/*"
          element={
            <ProtectedRoute>
              <SidebarProvider>
                <div className="flex h-screen w-full overflow-hidden bg-slate-50 text-slate-900">
                  <AppSidebar />
                  <main className="flex-1 w-full overflow-y-auto bg-slate-50">
                    <Suspense fallback={<PageLoading />}>
                      <Routes>
                        <Route
                          path="dashboard_overview"
                          element={<DashboardOverview />}
                        />
                        <Route
                          path="users"
                          element={<UsersPage />}
                        />
                        <Route
                          path="*"
                          element={
                            <Navigate to="/system/dashboard_overview" replace />
                          }
                        />
                      </Routes>
                    </Suspense>
                  </main>
                </div>
              </SidebarProvider>
            </ProtectedRoute>
          }
        />

        {/* Fallback wildcard */}
        <Route
          path="*"
          element={
            <Navigate
              to={isAuth ? "/system/dashboard_overview" : "/"}
              replace
            />
          }
        />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors">
          <Router>
            <AppRoutes />
          </Router>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
