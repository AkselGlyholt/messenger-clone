import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { FullConversationType } from "../types";
import { User } from "@prisma/client";

const useOtherUser = (
  conversation:
    | FullConversationType
    | {
        users: User[];
      }
) => {
  const { data: session } = useSession();

  const otherUser = useMemo(() => {
    const currentUserEmail = session?.user?.email;

    if (!currentUserEmail) return undefined;

    const otherUser = conversation.users.find((user) => user.email !== currentUserEmail);

    return otherUser;
  }, [session?.user?.email, conversation.users]);

  return otherUser;
};

export default useOtherUser;
