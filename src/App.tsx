
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'
import { NoaProvider } from './contexts/NoaContext'
import { RealtimeProvider } from './contexts/RealtimeContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import SmartDashboardRedirect from './components/SmartDashboardRedirect'

// Pages
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import StudyArea from './pages/StudyArea'
import Library from './pages/Library'
import ChatGlobal from './pages/ChatGlobal'
import PatientChat from './pages/PatientChat'
import ForumCasosClinicos from './pages/ForumCasosClinicos'
import Gamificacao from './pages/Gamificacao'
import Profile from './pages/Profile'
import AdminDashboardWrapper from './components/AdminDashboardWrapper'
import ExperienciaPaciente from './pages/ExperienciaPaciente'
import CursoEduardoFaveret from './pages/CursoEduardoFaveret'
import TermosLGPD from './pages/TermosLGPD'
import TestPage from './pages/TestPage'
import AIDocumentChat from './pages/AIDocumentChat'
import Patients from './pages/Patients'
import Evaluations from './pages/Evaluations'
import Reports from './pages/Reports'
import DebateRoom from './pages/DebateRoom'
import PatientDoctorChat from './pages/PatientDoctorChat'
import PatientProfile from './pages/PatientProfile'
import ProfessionalScheduling from './pages/ProfessionalScheduling'
import PatientAppointments from './pages/PatientAppointments'
import PatientNOAChat from './pages/PatientNOAChat'
import ArteEntrevistaClinica from './pages/ArteEntrevistaClinica'
import PatientDashboard from './pages/PatientDashboard'
import PatientAgenda from './pages/PatientAgenda'
import PatientKPIs from './pages/PatientKPIs'
import ProfessionalDashboard from './pages/ProfessionalDashboard'
import AlunoDashboard from './pages/AlunoDashboard'
import ClinicaDashboard from './pages/ClinicaDashboard'
import EnsinoDashboard from './pages/EnsinoDashboard'
import PesquisaDashboard from './pages/PesquisaDashboard'
import AdminDashboard from './pages/AdminDashboard'
import MedCannLabStructure from './pages/MedCannLabStructure'
import NotFound from './pages/NotFound'
import ClinicalAssessment from './pages/ClinicalAssessment'
import PatientOnboarding from './pages/PatientOnboarding'
import Scheduling from './pages/Scheduling'
import Prescriptions from './pages/Prescriptions'
import PatientsManagement from './pages/PatientsManagement'
import NewPatientForm from './pages/NewPatientForm'
import ProfessionalChat from './pages/ProfessionalChat'
import { SubscriptionPlans } from './pages/SubscriptionPlans'
import { PaymentCheckout } from './pages/PaymentCheckout'
import { LessonPreparation } from './pages/LessonPreparation'
import { ProfessionalFinancial } from './pages/ProfessionalFinancial'
import TestMonitoringDashboard from './components/TestMonitoringDashboard'

function App() {
  return (
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <AuthProvider>
            <ToastProvider>
              <NoaProvider>
                <RealtimeProvider>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/termos-lgpd" element={<TermosLGPD />} />
              <Route path="/experiencia-paciente" element={<ExperienciaPaciente />} />
              <Route path="/curso-eduardo-faveret" element={<CursoEduardoFaveret />} />
              <Route path="/patient-onboarding" element={<PatientOnboarding />} />
              
              <Route path="/app" element={<Layout />}>
                <Route index element={<SmartDashboardRedirect />} />
                <Route path="home" element={<Dashboard />} />
                <Route path="test" element={<TestPage />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="courses" element={<Courses />} />
                <Route path="arte-entrevista-clinica" element={<ArteEntrevistaClinica />} />
                <Route path="study-area" element={<StudyArea />} />
            <Route path="patient-dashboard" element={<PatientDashboard />} />
            <Route path="patient-agenda" element={<PatientAgenda />} />
            <Route path="patient-kpis" element={<PatientKPIs />} />
            <Route path="professional-dashboard" element={<ProfessionalDashboard />} />
            <Route path="aluno-dashboard" element={<AlunoDashboard />} />
            <Route path="clinica-dashboard" element={<ClinicaDashboard />} />
            <Route path="ensino-dashboard" element={<EnsinoDashboard />} />
            <Route path="pesquisa-dashboard" element={<PesquisaDashboard />} />
                <Route path="library" element={<Library />} />
                <Route path="chat" element={<ChatGlobal />} />
                <Route path="chat-noa-esperanca" element={<PatientNOAChat />} />
                <Route path="patient-chat" element={<PatientChat />} />
                    <Route path="forum" element={<ForumCasosClinicos />} />
                <Route path="gamificacao" element={<Gamificacao />} />
                <Route path="profile" element={<Profile />} />
                <Route path="admin" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboardWrapper />
                  </ProtectedRoute>
                } />
                <Route path="ai-documents" element={<AIDocumentChat />} />
                <Route path="evaluations" element={<Evaluations />} />
                <Route path="reports" element={<Reports />} />
                <Route path="debate/:debateId" element={<DebateRoom />} />
                <Route path="patient-chat/:patientId" element={
                  <ProtectedRoute requiredRole="professional">
                    <PatientDoctorChat />
                  </ProtectedRoute>
                } />
                <Route path="patient/:patientId" element={<PatientProfile />} />
                <Route path="appointments" element={<Profile />} />
                <Route path="scheduling" element={<Scheduling />} />
                <Route path="prescriptions" element={<Prescriptions />} />
                <Route path="patients" element={<PatientsManagement />} />
                <Route path="new-patient" element={<NewPatientForm />} />
                <Route path="professional-scheduling" element={
                  <ProtectedRoute requiredRole="professional">
                    <ProfessionalScheduling />
                  </ProtectedRoute>
                } />
                <Route path="patient-appointments" element={
                  <ProtectedRoute requiredRole="patient">
                    <PatientAppointments />
                  </ProtectedRoute>
                } />
                <Route path="patient-noa-chat" element={
                  <ProtectedRoute requiredRole="patient">
                    <PatientNOAChat />
                  </ProtectedRoute>
                } />
                <Route path="clinical-assessment" element={
                  <ProtectedRoute requiredRole="patient">
                    <ClinicalAssessment />
                  </ProtectedRoute>
                } />
                <Route path="professional-chat" element={
                  <ProtectedRoute requiredRole="professional">
                    <ProfessionalChat />
                  </ProtectedRoute>
                } />
                <Route path="subscription-plans" element={<SubscriptionPlans />} />
                <Route path="checkout" element={<PaymentCheckout />} />
                <Route path="lesson-prep" element={<LessonPreparation />} />
                <Route path="professional-financial" element={<ProfessionalFinancial />} />
                <Route path="test-monitoring" element={<TestMonitoringDashboard />} />
                <Route path="admin/users" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboardWrapper />
                  </ProtectedRoute>
                } />
                <Route path="admin/courses" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboardWrapper />
                  </ProtectedRoute>
                } />
                <Route path="admin/analytics" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboardWrapper />
                  </ProtectedRoute>
                } />
                <Route path="admin/system" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboardWrapper />
                  </ProtectedRoute>
                } />
                <Route path="admin/reports" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboardWrapper />
                  </ProtectedRoute>
                } />
                <Route path="admin/upload" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboardWrapper />
                  </ProtectedRoute>
                } />
                <Route path="admin/chat" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboardWrapper />
                  </ProtectedRoute>
                } />
                <Route path="admin/forum" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboardWrapper />
                  </ProtectedRoute>
                } />
                <Route path="admin/gamification" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboardWrapper />
                  </ProtectedRoute>
                } />
                <Route path="admin/renal" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboardWrapper />
                  </ProtectedRoute>
                } />
                <Route path="admin/unification" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboardWrapper />
                  </ProtectedRoute>
                } />
                <Route path="admin/financial" element={
                  <ProtectedRoute requiredRole="admin">
                    <AdminDashboardWrapper />
                  </ProtectedRoute>
                } />
              </Route>
              
              <Route path="*" element={<NotFound />} />
            </Routes>
                </RealtimeProvider>
              </NoaProvider>
            </ToastProvider>
          </AuthProvider>
        </BrowserRouter>
  )
}

export default App