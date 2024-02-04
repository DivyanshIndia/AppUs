import { Redirect } from "expo-router";
import getToken from "../utils/getToken";
import { useEffect } from "react";

const index = () => {
  const fetchToken = async () => {
    const token = await getToken("userID");
    if (token) {
      <Redirect href="/home" />;
    }
  };
  useEffect(() => {
    fetchToken();
  }, []);

  return (
    <>
      <Redirect href="/logIn" />
    </>
  );
};

export default index;
