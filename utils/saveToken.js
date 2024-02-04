import * as SecureStore from "expo-secure-store";

const saveToken = async (tokenName, token) => {
  try {
    const tokenValue =
      typeof token === "string" ? token : JSON.stringify(token);

    await SecureStore.setItemAsync(tokenName, tokenValue);
    console.log(tokenName, tokenValue);
  } catch (error) {
    console.error("Error saving token to SecureStore", error);
  }
};

export default saveToken;
