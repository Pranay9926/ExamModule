import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}`,
    prepareHeaders: (headers) => {
        // const data = JSON.parse(String(localStorage.getItem("token")));
        const data = "4|A7RryMau7A6c2mNyRXPcS7c6OIEkrLDV9LuB050I24edba5d";
        if (data) {
            headers.set("authorization", `Bearer ${data}`);
            // if (process.env.REACT_APP_API_URL)
            //     headers.set("x_api_key", process.env.NEXT_PUBLIC_X_API_KEY);
        }
        return headers;
    },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}`);

            // Clear localStorage and refresh the page
            // localStorage.clear();
            // window.location.reload();
            result = await baseQuery(args, api, extraOptions);

        } catch (error) {
            console.error("Error refreshing access token:", error);
        }
    }

    return result;
};
