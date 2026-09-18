"use client";

import {
  dealerRestockOrders,
  type RestockOrder,
  type RestockStatus,
} from "@/data/dealer";
import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "softcell_restock_orders";
const SYNC_EVENT = "softcell-restock-sync";

function readOrders(): RestockOrder[] {
  if (typeof window === "undefined") return dealerRestockOrders;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as RestockOrder[];
  } catch {
    // ignore corrupted storage
  }
  return dealerRestockOrders;
}

function writeOrders(orders: RestockOrder[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // ignore storage failures
  }
  window.dispatchEvent(new Event(SYNC_EVENT));
}

export function useRestockOrders() {
  const [orders, setOrders] = useState<RestockOrder[]>([]);

  useEffect(() => {
    setOrders(readOrders());

    const handleSync = () => setOrders(readOrders());
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setOrders(readOrders());
    };

    window.addEventListener(SYNC_EVENT, handleSync);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener(SYNC_EVENT, handleSync);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const addOrder = useCallback(
    (order: Omit<RestockOrder, "id">) => {
      setOrders((prev) => {
        const next = [
          {
            ...order,
            id: `rr-${Date.now()}`,
          },
          ...prev,
        ];
        writeOrders(next);
        return next;
      });
    },
    [],
  );

  const setStatus = useCallback((id: string, status: RestockStatus) => {
    setOrders((prev) => {
      const next = prev.map((o) => (o.id === id ? { ...o, status } : o));
      writeOrders(next);
      return next;
    });
  }, []);

  return { orders, addOrder, setStatus };
}