import { useCallback, useEffect, useMemo, useState } from 'react';

import StarWarsApi from 'services/StarWarsClient';

import { VehicleType } from 'types/VehicleType';

type VehiclesType = () => {
  vehicles: VehicleType[];
  vehicle: VehicleType | null;
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  fetchVehicles: (page?: number, search?: string) => Promise<void>;
  fetchVehicle: (id: string) => Promise<void>;
  search: string;
};

const useVehicles: VehiclesType = () => {
  const [vehicles, setVehicles] = useState<VehicleType[]>([]);
  const [vehicle, setVehicle] = useState<VehicleType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const fetchVehicles = useCallback(async (page = 1, _search = '') => {
    try {
      setLoading(true);
      const params = { page, search: _search };

      const {
        data: { results, count },
      } = await StarWarsApi.get('/vehicles', { params });
      setVehicles(results);
      setTotalPages(Math.ceil(count / 10));
      setCurrentPage(page);
      setSearch(_search);
    } catch {
      setError('Vehicles not found');
      setVehicles([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchVehicle = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const { data } = await StarWarsApi.get(`/vehicles/${id}`);
      setVehicle(data);
    } catch {
      setError('Vehicle not found');
      setVehicle(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVehicles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useMemo(
    () => ({
      vehicles,
      vehicle,
      loading,
      error,
      totalPages,
      currentPage,
      fetchVehicles,
      fetchVehicle,
      search,
    }),
    [
      vehicles,
      loading,
      error,
      totalPages,
      currentPage,
      fetchVehicles,
      fetchVehicle,
      search,
      vehicle,
    ],
  );
};

export default useVehicles;
