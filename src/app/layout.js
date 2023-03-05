import "./globals.css";
import { AnalyticsWrapper } from "@/components/analytics.component";

export const metadata = {
  title: "Formula 1 2023 calendar",
  description: "Upcoming Formula One race calendars and driver standings",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}

        <AnalyticsWrapper />
      </body>
    </html>
  );
}
