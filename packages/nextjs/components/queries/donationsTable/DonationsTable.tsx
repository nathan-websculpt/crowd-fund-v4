import { useEffect, useState } from "react";
import { DonationRow } from "./DonationRow";
import { useApolloClient } from "@apollo/client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { Spinner } from "~~/components/Spinner";
import { GQL_DONATIONS } from "~~/helpers/getQueries";

export const DonationsTable = () => {
  const client = useApolloClient();
  const [userSearchInput, setUserSearchInput] = useState("");
  const [pageSize, setPageSize] = useState(25);
  const [pageNum, setPageNum] = useState(0);
  const [data, setData] = useState({});
  const [queryLoading, setQueryLoading] = useState(false);

  useEffect(() => {
    preQuery();
  }, [pageSize, pageNum, userSearchInput]);

  const preQuery = async () => {
    if (userSearchInput.trim().length === 0) {
      doQuery({
        limit: pageSize,
        offset: pageNum * pageSize,
      });
    } else {
      doQuery({
        limit: pageSize,
        offset: pageNum * pageSize,
        searchBy: userSearchInput,
      });
    }
  };

  //NOTE: useLazyQuery gets executed again IF ANY of the Options change
  //^^^https://github.com/apollographql/apollo-client/issues/5912#issuecomment-797060422
  //Here, I am just using the Apollo Client directly in order to allow:
  //     - the table to initially load with data
  //     - then, the filtering of the data via the Search Bar
  const doQuery = async (options: object) => {
    setQueryLoading(true);
    await client
      .query({
        query: GQL_DONATIONS(userSearchInput),
        variables: options,
        fetchPolicy: "no-cache",
      })
      .then(d => {
        setData(d.data);
      })
      .catch(e => {
        console.log("QUERY ERROR: ", e);
      });
    setQueryLoading(false);
  };

  const refreshTbl = (clearSearch: boolean) => {
    if (clearSearch) {
      setUserSearchInput("");
    }
    if (pageNum !== 0) setPageNum(0);
  };
  return (
    <>
      <div className="flex justify-between pt-5 mb-3">
        <div className="flex gap-3">
          <span className="my-auto text-lg">DONATIONS (BY FUND RUN)</span>
          <select
            className="px-4 py-2 text-xl bg-primary"
            onChange={event => setPageSize(parseInt(event.target.value))}
            value={pageSize.toString()}
          >
            <option value="25">Showing 25</option>
            <option value="10">Showing 10</option>
            <option value="1">Showing 1</option>
          </select>
        </div>

        <div className="flex w-5/12 gap-3">
          <input
            className="w-full pl-4 bg-secondary text-secondary-content"
            placeholder="Search by Fund Run Title"
            value={userSearchInput}
            onChange={e => setUserSearchInput(e.target.value)}
          ></input>
          <button className="px-8 py-2 text-xl bg-primary" onClick={() => preQuery()}>
            SEARCH
          </button>
          <button className="px-4 py-2 text-xl bg-primary" onClick={() => refreshTbl(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="white"
                d="M9 12l-4.463 4.969-4.537-4.969h3c0-4.97 4.03-9 9-9 2.395 0 4.565.942 6.179 2.468l-2.004 2.231c-1.081-1.05-2.553-1.699-4.175-1.699-3.309 0-6 2.691-6 6h3zm10.463-4.969l-4.463 4.969h3c0 3.309-2.691 6-6 6-1.623 0-3.094-.65-4.175-1.699l-2.004 2.231c1.613 1.526 3.784 2.468 6.179 2.468 4.97 0 9-4.03 9-9h3l-4.537-4.969z"
              />
            </svg>
          </button>
        </div>
      </div>

      {queryLoading ? (
        <div className="flex justify-center w-full min-w-full gap-2 p-2 m-4 border shadow-xl border-base-300 bg-base-200 sm:rounded-lg">
          <Spinner width="150px" height="150px" />
        </div>
      ) : (
        <table className="table w-full text-xl table-auto bg-base-100 md:table-lg table-xs">
          <thead>
            <tr className="text-sm rounded-xl text-base-content">
              <th className="bg-primary">Donor</th>
              <th className="bg-primary">Amount</th>
              <th className="bg-primary">Fund Run Title</th>
            </tr>
          </thead>
          <tbody>
            {data?.donations?.map(donation => (
              <DonationRow
                key={donation?.id}
                id={donation?.id}
                donor={donation?.donor}
                amount={donation?.amount}
                fundRunTitle={donation?.fundRun?.title}
              />
            ))}
          </tbody>
        </table>
      )}

      <div className="flex justify-end gap-3 mx-5 mt-5">
        <button className="btn btn-sm" disabled={!pageNum} onClick={() => setPageNum(0)}>
          <ArrowLeftIcon className="w-4 h-4" />
          <ArrowLeftIcon className="w-4 h-4" />
        </button>
        <span>...</span>
        <button className="btn btn-sm" disabled={!pageNum} onClick={() => setPageNum(prev => prev - 1)}>
          <ArrowLeftIcon className="w-4 h-4" />
        </button>
        <span className="self-center font-medium text-primary-content">Page {pageNum + 1}</span>
        <button className="btn btn-sm" onClick={() => setPageNum(prev => prev + 1)}>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};
