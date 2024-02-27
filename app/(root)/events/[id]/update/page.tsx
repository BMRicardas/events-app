import { auth } from "@clerk/nextjs";
import { EventForm } from "@/components/shared/event-form";
import { UpdateEventParams } from "@/types";
import { getEventById } from "@/lib/actions/event.actions";

interface Props {
  params: {
    id: string;
  };
}

export default async function UpdateEvent({ params: { id } }: Props) {
  const { sessionClaims } = auth();

  const userId = sessionClaims?.userId as string;
  const event = await getEventById(id);

  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h3>
      </section>
      <div className="wrapper my-8">
        <EventForm
          userId={userId}
          type="update"
          event={event}
          eventId={event._id}
        />
      </div>
    </>
  );
}
