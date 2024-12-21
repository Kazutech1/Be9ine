import React, { useState, useEffect } from "react";
import { TransactionList } from "../components/history/TransactionList";
import { useTransactions } from "../hooks/useHistory";
import { useWithdrawalHistory } from "../hooks/useHistory";
import useDashboard from "../hooks/useDashboard";

const HistoryPage = () => {
  const { user } = useDashboard();
  const userId = user?._id || null; // Ensure we get the correct userId
  const { transactions, loading: transactionsLoading, error: transactionError, fetchTransactions } = useTransactions();
  const { withdrawalHistory, loading: withdrawalLoading, error: withdrawalError } = useWithdrawalHistory(userId);

  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [historyList, setHistoryList] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  useEffect(() => {
    const combinedHistory = [
      ...transactions.map((tx) => ({ ...tx, type: "transaction" })),
      ...withdrawalHistory.map((wh) => ({ ...wh, type: "withdrawal" })),
    ];

    // Sort the combined history by date in descending order
    combinedHistory.sort((a, b) => new Date(b.date) - new Date(a.date));

    setHistoryList(combinedHistory);
  }, [transactions, withdrawalHistory]);

  const handleTransactionClick = (transaction) => {
    setSelectedTransaction(selectedTransaction === transaction ? null : transaction);
  };

  const isLoading = transactionsLoading || withdrawalLoading;

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col p-6">
      <h1 className="text-3xl font-bold text-green-500 mb-6">Transaction History</h1>

      {isLoading && <div className="text-center text-green-500 animate-pulse">Loading history...</div>}

      {(transactionError || withdrawalError) && (
        <div className="text-center text-red-500">
          {transactionError && <p>{transactionError}</p>}
          {withdrawalError && <p>{withdrawalError}</p>}
        </div>
      )}

      {!isLoading && historyList.length === 0 && (
        <div className="text-center text-gray-400">No transaction or withdrawal history found.</div>
      )}

      {!isLoading && historyList.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 overflow-y-auto">
          <div className="flex-1 space-y-6">
            <TransactionList
              transactions={historyList}
              onSelectTransaction={handleTransactionClick}
              selectedTransaction={selectedTransaction}
            />
          </div>
         
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
