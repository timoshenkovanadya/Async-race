export const createQueryString = (params: Record<string, string | number> | Record<string, never>) => {
    if (!Object.keys(params).length) return "";
    return (
        "/?" +
        Object.keys(params)
            .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key]))
            .join("&")
    );
};
