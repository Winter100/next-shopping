import { QueryClient } from "@tanstack/query-core";
import { cache } from "react";

const getQueryClient = () => new QueryClient();
export default getQueryClient;

//cashe()
