import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// 🌟 تأكد من أن مسار ملف الـ CSS صحيح 🌟
import './index.css' // أو './main.css' إذا كان هذا اسم ملفك

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
<StrictMode>
<App />
</StrictMode>,
)