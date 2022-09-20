import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useTranslation } from 'react-i18next';

import StarWarsApi from 'services/StarWarsClient';

import { VehicleType } from 'types/VehicleType';

import useTitle from './useTitle';

interface IQueryParams {
  name?: string;
  model?: string;
  page?: number;
  search?: string;
}

type VehiclesType = () => {
  vehicles: VehicleType[] | undefined;
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
  fetchStarWarsApi: (params?: IQueryParams) => Promise<void>;
  setValue: Dispatch<SetStateAction<string | undefined>>;
  value: string | undefined;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

const useVehicles: VehiclesType = () => {
  const { t, i18n } = useTranslation();
  const setTitle = useTitle();
  const [vehicles, setVehicles] = useState<VehicleType[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState<string>();
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  const fetchStarWarsApi = useCallback(
    async (params?: IQueryParams) => {
      try {
        setLoading(true);
        let queryParams = { ...params };
        if (!params?.search?.length && search.length > 0) {
          queryParams = {
            ...queryParams,
            search,
          };
        }
        if (!params?.page && currentPage) {
          queryParams = {
            ...queryParams,
            page: currentPage,
          };
        }
        const {
          data: { results, count },
        } = await StarWarsApi.get('/vehicles', { params: queryParams });
        setVehicles(results);
        setTotalPages(count / 10);
        setCurrentPage(queryParams?.page ?? 1);
        setSearch(queryParams?.search ?? '');
      } catch {
        setError('Vehicles not found');
      } finally {
        setLoading(false);
      }
    },
    [currentPage, search],
  );
  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (value?.length) {
        fetchStarWarsApi({ search: value });
      }
    },
    [fetchStarWarsApi, value],
  );

  useEffect(() => {
    setTitle(t(''));
    fetchStarWarsApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i18n.resolvedLanguage]);

  return useMemo(
    () => ({
      vehicles,
      loading,
      error,
      totalPages,
      currentPage,
      fetchStarWarsApi,
      setValue,
      value,
      handleSubmit,
    }),
    [
      currentPage,
      error,
      fetchStarWarsApi,
      handleSubmit,
      loading,
      totalPages,
      value,
      vehicles,
    ],
  );
};

export default useVehicles;
