export const TransactionList = ({ transactions, onSelectTransaction }) => {
  if (!transactions || transactions.length === 0) {
    return <div>No transactions available.</div>;
  }

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
      <h3 className="text-xl font-semibold text-green-500 mb-4">Transaction List</h3>
      <ul className="space-y-4">
        {transactions.map((item, index) => {
          const isTransaction = item.type === "transaction";

          // Extract details based on type
          const amount = isTransaction
            ? item.raw_data?.contract?.[0]?.parameter?.value?.amount / 1000000 || 0 // Convert sun to TRX
            : item.amount; // Direct amount for withdrawals

          const status = isTransaction
            ? item.ret?.[0]?.contractRet === "SUCCESS"
              ? "Completed"
              : "Pending"
            : item.status; // Use withdrawal status directly

          // Use item.txID or item.id as key, with fallback to index if needed
          const key = item.txID || item.id || `fallback-${index}`;

          return (
            <li
              key={key} // Ensure unique keys for both types, fallback to index if needed
              className="flex justify-between items-center p-4 bg-gray-700 rounded-md cursor-pointer hover:bg-gray-600"
              onClick={() => onSelectTransaction(item)}
            >
              <span
                className={`text-lg ${isTransaction ? "text-green-500" : "text-red-500"}`}
              >
                {isTransaction ? "+" : "-$"} {amount} {isTransaction ? "TRX" : ""}
              </span>
              <span className={`text-lg ${status === "Pending" ? "text-yellow-500" : "text-green-500"}`}>
                {status}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
