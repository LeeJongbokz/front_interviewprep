import { useContext } from "react";
import { BACKEND_BASE_URL } from "../../../global_variables"
import AuthContext from "../../../store/auth-context";

import { useQuery, useMutation } from 'react-query';
import { QueryClient } from 'react-query';


const queryClient = new QueryClient();

function useFetchForQuery(url, queryKey, staleTime){
  const authCtx = useContext(AuthContext);
  
  const { data, isLoading } = useQuery(
    queryKey,
    async () => {
      const response = await fetch(`${BACKEND_BASE_URL}${url}`, {
        headers: {
          Authorization: "Bearer "+authCtx.token
        },
      });
      return await response.json();
    },
    {
      staleTime,
    }
  );
  
  return { data, isLoading };
}

export { queryClient, useFetchForQuery, useMutation };
