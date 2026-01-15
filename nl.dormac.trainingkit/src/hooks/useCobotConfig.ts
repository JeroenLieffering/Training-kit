import { useEffect, useState } from 'react';
import { CobotConfig } from '../core/models/cobot-config-types';
import { loadCobotConfig } from '../core/services/cobot-config-service';
import { useDatabase } from './useDatabase';

export function useCobotConfig() {
  const database = useDatabase();

  const [cobotConfig, setCobotConfig] = useState<CobotConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await loadCobotConfig(database);
      setCobotConfig(data);
      setLoading(false);
    }

    load();
  }, []);

  return [cobotConfig, loading] as const;
}
