"use client";

import { createContext, useContext, useState } from "react";
import { ThemeProvider } from "next-themes";

const DashboardMenuContext = createContext(null);

export const useDashboardMenu = () => {
  return useContext(DashboardMenuContext);
};

export default function Providers({ children }) {
  const [isDashboardMenuOpen, setIsDashboardMenuOpen] = useState(false);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <DashboardMenuContext.Provider
        value={{
          isDashboardMenuOpen,
          setIsDashboardMenuOpen,
        }}
      >
        {children}
      </DashboardMenuContext.Provider>
    </ThemeProvider>
  );
}
