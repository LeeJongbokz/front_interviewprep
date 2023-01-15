import { useState, useContext, useCallback } from 'react';
import { BACKEND_BASE_URL } from '../global_variables';
import AuthContext from '../store/auth-context';

const useHttpRequest = (isLoadingInit = false) => {
  const [isLoading, setIsLoading] = useState(isLoadingInit);
  const authCtx = useContext(AuthContext);

  const sendGetRequest = useCallback(
    async (endpoint, callback) => {
      setIsLoading(true);
      try {
        let response;
        if (authCtx.token && authCtx.refreshToken) {
          response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, {
            headers: {
              Authorization: "Bearer "+authCtx.token
            },
          });
        } else {
          response = await fetch(`${BACKEND_BASE_URL}${endpoint}`);
        }

        if (!response.ok) {
          throw Error('Some thing went Error');
        }

        const responseData = await response.json();
        callback(responseData);
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    },
    [authCtx.token, authCtx.refreshToken]
  );

  const sendPostRequest = useCallback(
    async (requestOption, callback = () => {}) => {
      // setIsLoading(true);
      const { endpoint, bodyData } = requestOption;
      try {
        const response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, {
          method: 'POST',
          body: JSON.stringify(bodyData),
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer "+authCtx.token
          },
        });

        if (!response.ok) {
          throw Error('Some thing went Error');
        }

        const responseData = await response.json();
        callback(responseData);
      } catch (err) {
        console.error(err);
      }
      // setIsLoading(false);
    },
    [authCtx.token, authCtx.refreshToken]
  );

  const sendPutRequest = useCallback(
    async (requestOption, callback = () => {}) => {
      // setIsLoading(true);
      const { endpoint, bodyData } = requestOption;
      try {
        const response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, {
          method: 'PUT',
          body: JSON.stringify(bodyData),
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer "+authCtx.token
          },
        });

        if (!response.ok) {
          throw Error('Some thing went Error');
        }

        const responseData = await response.json();
        callback(responseData);
      } catch (err) {
        console.error(err);
      }
      // setIsLoading(false);
    },
    [authCtx.token, authCtx.refreshToken]
  );

  const sendDelRequest = useCallback(
    async (requestOption, callback = () => {}) => {
      // setIsLoading(true);
      const { endpoint, bodyData } = requestOption;
      try {
        const response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, {
          method: 'DELETE',
          body: JSON.stringify(bodyData),
          headers: {
            'Content-Type': 'application/json',
            Authorization: "Bearer "+authCtx.token
          },
        });

        if (!response.ok) {
          throw Error('Some thing went Error');
        }

        const responseData = await response.json();
        callback(responseData);
      } catch (err) {
        console.error(err);
      }
      // setIsLoading(false);
    },
    [authCtx.token, authCtx.refreshToken]
  );

  return { isLoading, sendGetRequest, sendPostRequest, sendPutRequest, sendDelRequest };
};

export default useHttpRequest;
