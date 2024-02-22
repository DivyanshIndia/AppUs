import React, { useEffect } from "react";
import EditProfileScreen from "../../screens/editProfile/EditProfile";
import apiUrls from "../../api/apiUrls";
import useApiGet from "../../hooks/useApiGet";
import getToken from "../../utils/getToken";

const index = () => {
  const { data, loading, error, getData } = useApiGet();

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await getToken("userId");
      if (userId) {
        console.log("userId", userId); // Now logging the resolved userId
        await getData(apiUrls.getUser(userId));
      }
    };

    fetchUserData().catch(console.error);

    // This log will not show updated `data` immediately as `getData` is async
    console.log("data", data);
  }, []);

  console.log("EditProfile", data);

  return <EditProfileScreen data={data} />;
};

export default index;
