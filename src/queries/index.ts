import { queryOptions, useMutation } from "@tanstack/react-query";

import type { Project, ApiResponse, Meta, Unit } from "@/types";
import api from "@/lib/api";

export interface GeneralPageParams {
  /**
   * Page number.
   */
  page?: number;

  /**
   * Number of items per page.
   */
  limit?: number;

  /**
   * Search term for filtering
   */
  term?: string;

  /**
   * General search query
   */
  search?: string;

  [key: string]: string | number | boolean | undefined | any;
  /**
   * Initial data for query prefetching
   */

  initialData?: any;

  enabled?: boolean;
}

const getProjectById = async (id: string): Promise<Project> => {
  const response = await api.request.get<Project>(`guest/projects/${id}`);
  if (!response) {
    throw new Error("Failed to fetch project");
  }
  return response;
};

export const projectQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["project", id],
    queryFn: () => getProjectById(id),
  });

const getProjects = async (
  params: GeneralPageParams,
): Promise<{ data: Project[]; meta?: Meta | undefined }> => {
  const response = await api.request.get<ApiResponse<Project[]>>(
    "guest/projects",
    params,
  );
  if (response.status !== "success") {
    throw new Error("Failed to fetch project");
  }
  return response?.result;
};

export const projectsQueryOptions = (params: GeneralPageParams) =>
  queryOptions({
    queryKey: ["projects", params],
    queryFn: () => getProjects(params),
  });
const getUnits = async (
  params: GeneralPageParams,
): Promise<{ data: Unit[]; meta?: Meta | undefined }> => {
  const response = await api.request.get<ApiResponse<Unit[]>>(
    "guest/units",
    params,
  );
  if (response.status !== "success") {
    throw new Error("Failed to fetch units");
  }
  return response?.result;
};

export const unitsQueryOptions = (params: GeneralPageParams) =>
  queryOptions({
    queryKey: ["units", params],
    queryFn: () => getUnits(params),
  });

const getUnitById = async (id: string): Promise<Unit> => {
  const response = await api.request.get<ApiResponse<Unit>>(
    `guest/units/${id}`,
  );
  if (response.status !== "success") {
    throw new Error("Failed to fetch unit");
  }
  return response?.result?.data;
};

export const unitQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ["unit", id],
    queryFn: () => getUnitById(id),
  });
