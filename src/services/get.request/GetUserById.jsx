import { useQuery } from "@tanstack/react-query";
import { api } from "../../api/http";
import { USERS_URL } from "../../config";

export const GetUserById = ({ userId }) => {
  const {
    isPending: isUserPending,
    error: userError,
    data: userData,
  } = useQuery({
    queryKey: ["userData", userId],
    queryFn: () => api.get(`${USERS_URL}/${userId}`).then((res) => res.data),
  });

  if (isUserPending) return "Loading...";

  if (userError) return userError.message;

  return (
    <>
      {userData.data.user.firstname} {userData.data.user.lastname}
    </>
  );
};
