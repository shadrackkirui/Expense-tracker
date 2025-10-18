import React from "react";

const ExportCSV = ({ expenses }) => {
  const handleExport = () => {
    if (!expenses || expenses.length === 0) {
      alert("No expenses to export!");
      return;
    }

    // Define CSV header
    const header = ["Date", "Description", "Amount (Ksh)"];
    const rows = expenses.map((exp) => [
      new Date(exp.id).toLocaleDateString(),
      exp.desc,
      exp.amount,
    ]);

    // Join into CSV format
    const csvContent = [header, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleExport}
      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
    >
      Export Expenses (CSV)
    </button>
  );
};

export default ExportCSV;
