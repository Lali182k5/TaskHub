import { Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardPage } from "./pages/DashboardPage";
import { CreateTaskPage } from "./pages/CreateTaskPage";
import { EditTaskPage } from "./pages/EditTaskPage";
import { TaskDeletePage } from "./pages/TaskDeletePage";
import { TaskDetailsPage } from "./pages/TaskDetailsPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { LandingPage } from "./pages/LandingPage";
import { InsightsPage } from "./pages/InsightsPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/insights" element={<InsightsPage />} />
          <Route path="/tasks/new" element={<CreateTaskPage />} />
          <Route path="/tasks/:id" element={<TaskDetailsPage />} />
          <Route path="/tasks/:id/edit" element={<EditTaskPage />} />
          <Route path="/tasks/:id/delete" element={<TaskDeletePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
