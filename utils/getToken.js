import * as SecureStore from "expo-secure-store";

const getToken = async (tokenName) => {
  try {
    const token = await SecureStore.getItemAsync(tokenName);
    return token;
  } catch (error) {
    console.error("Error getting token from SecureStore", error);
    return "";
  }
};

export default getToken;
