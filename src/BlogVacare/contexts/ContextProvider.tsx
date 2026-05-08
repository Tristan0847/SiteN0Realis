'use client';

import {AuthProvider} from "@BlogsFront/contexts/AuthContext";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactNode, useState} from "react";

/**
 * Provider de contextes du site
 * @param children Noeuds enfant du provider
 * @constructor
 */
export default function Providers({children} : { children : ReactNode}) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 5 * 60 * 1000,
                        retry: false,
                        refetchOnWindowFocus: false,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                {children}
            </AuthProvider>
        </QueryClientProvider>
    )
}