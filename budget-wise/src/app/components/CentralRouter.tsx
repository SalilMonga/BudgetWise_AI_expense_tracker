"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
// import { ReportsContainer } from "../../components/reports/ReportsContainer";

// Dynamically import your views
const TransactionPage = dynamic(
  () => import("./TransactionPage/TransactionPage"),
  {
    loading: () => <p>Loading Transactions...</p>,
  }
);

// const DashboardView = dynamic(() => import("./dashboard/DashboardPage"), {
//   loading: () => <p>Loading Dashboard...</p>,
// });
const GoalsPage = dynamic(() => import("./Goals/GoalsPage"), {
  loading: () => <p>Loading Goals...</p>,
});

const ReportsView = dynamic(() => import("./Reports/ReportsPage"), {
  loading: () => <p>Loading Reports...</p>,
});

export default function CentralRouter() {
  // We'll read the `view` query parameter from URL, e.g. /?view=transactions or /?view=other
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  switch (view) {
    case "transactions":
      return <TransactionPage />;
    // case "dashboard":
    //   return <DashboardView />;
    case "goals":
      return <GoalsPage />;
    case "reports":
      return <ReportsView />;
    default:
      // Fallback or default homepage content
      return (
        <div className="p-4 text-gray-800">
          <h2 className="text-2xl mb-4">Welcome to the Home Page</h2>
          <p>
            Use the Navbar links or /?view=transactions to see transactions.
          </p>
        </div>
      );
  }
}
