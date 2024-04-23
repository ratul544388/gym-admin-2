import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

export const useQueryString = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const push = (query: { [key: string]: string | number }) => {
    const currentQuery = qs.parse(searchParams.toString());

    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          ...currentQuery,
          ...query,
        },
      },
      { skipEmptyString: true, skipNull: true },
    );

    router.push(url);
  };

  return { push };
};
