import { type FetchResponse, openmrsFetch, type OpenmrsResource, restBaseUrl } from '@openmrs/esm-framework';
import { useSystemVisitSetting, useVisitOrOfflineVisit } from '@openmrs/esm-patient-common-lib';
import useSWR, { useSWRConfig } from 'swr';

export async function deletePatientProcedure(procedureUuid: string) {
  const controller = new AbortController();
  const url = ``;

  await openmrsFetch(url, {
    method: 'DELETE',
    signal: controller.signal,
  });
}

export function useProcedures(patientUuid: string, encounterTypeUuid: string) {
  const { systemVisitEnabled, isLoadingSystemVisitSetting, errorFetchingSystemVisitSetting } = useSystemVisitSetting();

  const results = useSWR<FetchResponse<{ results: Array<OpenmrsResource> }>, Error>(
    !isLoadingSystemVisitSetting && !systemVisitEnabled && patientUuid
      ? `${restBaseUrl}/encounter?patient=${patientUuid}&encounterType=${encounterTypeUuid}`
      : null,
    openmrsFetch,
  );

  return {
    data: results ?? [],
  };
}
