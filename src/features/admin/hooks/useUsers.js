import { useCallback, useEffect, useState } from "react";
import { userService } from "../../../services/userService";
export function useUsers() {
  const [users, setUsers] = useState([]),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [working, setWorking] = useState(false);
  const refresh = useCallback(async () => {
    setError("");
    try {
      setUsers(await userService.listUsers());
    } catch (failure) {
      setError(failure.message);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    refresh();
  }, [refresh]);
  async function run(action) {
    setWorking(true);
    setError("");
    try {
      await action();
      setUsers(await userService.listUsers());
    } catch (failure) {
      setError(failure.message);
      throw failure;
    } finally {
      setWorking(false);
    }
  }
  return { users, loading, error, working, refresh, run };
}
