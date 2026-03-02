import React from "react";

export interface HistoryItem {
  id: string;
  ip: string;
  geolocation: string;
  ipInfoJson: string;
  createdAt: string;
}

interface HistoryListProps {
  items: HistoryItem[];
  selectedIds: Set<string>;
  onSelect: (id: string, checked: boolean) => void;
  onClickItem: (item: HistoryItem) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({
  items,
  selectedIds,
  onSelect,
  onClickItem,
}) => (
  <div className="border rounded p-2 bg-white w-full">
    {items.length === 0 && (
      <div className="text-gray-500">No history found.</div>
    )}
    {items.map((item) => (
      <div
        key={item.id}
        className="flex items-center border-b last:border-b-0 py-2 hover:bg-gray-50 cursor-pointer"
      >
        <input
          type="checkbox"
          checked={selectedIds.has(item.id)}
          onChange={(e) => onSelect(item.id, e.target.checked)}
          className="mr-2"
        />
        <div className="flex-1" onClick={() => onClickItem(item)}>
          <span className="font-mono text-blue-700">{item.ip}</span>
          <span className="ml-4 text-gray-600">{item.geolocation || "-"}</span>
        </div>
      </div>
    ))}
  </div>
);

export default HistoryList;
