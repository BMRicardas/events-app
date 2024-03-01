import { IEvent } from "@/lib/database/models/event.model";
import { Card } from "./card";
import { Pagination } from "./pagination";

type CollectionType = "events_organized" | "my_tickets" | "all_events";

interface Props {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: CollectionType;
}

export function Collection({
  data,
  emptyTitle,
  emptyStateSubtext,
  limit,
  page,
  totalPages,
  urlParamName,
  collectionType,
}: Props) {
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((event) => {
              const hasOrderLink = collectionType === "events_organized";
              const hidePrice = collectionType === "my_tickets";

              return (
                <li key={event._id} className="flex justify-center">
                  <Card
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}

            {totalPages > 1 && (
              <Pagination
                urlParamName={urlParamName}
                page={page}
                totalPages={totalPages}
              />
            )}
          </ul>
        </div>
      ) : (
        <div className="flex-center wrapper min-h-[200px] w-full flex-col gap-3 rounded-[14px] bg-grey-50 py-28 text-center">
          <h3 className="p-bold-20 md:h5-bold">{emptyTitle}</h3>
          <p className="p-regular-14">{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
}
