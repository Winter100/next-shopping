import NoteInbox from "@/app/components/Note/NoteInbox";
import getQueryClient from "@/utils/getQueryClient";
import { Hydrate, dehydrate } from "@tanstack/react-query";

async function getMessage(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/note/getmessage/${id}`
  );
  const messageData = (await res.json()) as any[];
  return messageData;
}

export default async function NotePage(param: { params: { id: string } }) {
  const id = param.params.id;

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["message", id], () => getMessage(id));
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="min-h-screen">
      <Hydrate state={dehydratedState}>
        <NoteInbox id={id} />
      </Hydrate>
    </div>
  );
}
