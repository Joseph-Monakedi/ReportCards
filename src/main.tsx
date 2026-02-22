import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GradeReportCard from './components/ReportCard'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GradeReportCard />
  </StrictMode>,
)
