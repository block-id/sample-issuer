const getParams = () => new URLSearchParams(window.location.search);

const getQueryParam = (param: string): string | null => getParams().get(param);

const getAllParams = (): {[key: string]: string} => Object.fromEntries(getParams().entries());

const setQueryParams = (params: {[key: string]: string | null | undefined}): void => {
  const url = new URL(window.location.href);
  Object.entries(params).forEach(
    ([key, val]) => {
      if (val === null || val === undefined) url.searchParams.delete(key);
      else url.searchParams.set(key, val);
    },
  );

  window.history.replaceState(null, '', url);
};

export { getQueryParam, getAllParams, setQueryParams };
