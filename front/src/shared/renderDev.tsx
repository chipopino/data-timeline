import React from 'react';
import ReactDOM from "react-dom/client";

export default function renderDev(tsx: React.ReactNode) {
    const root = ReactDOM.createRoot(document.getElementById("root")!);
    root.render(<div className='w-full h-full' >
        {tsx}
    </div>)
}
