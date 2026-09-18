import type {OptionsType} from "cookies-next";

export const COOKIE_GLOBAL_OPTIONS: OptionsType = {
    path: "/",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30 * 6,
    secure: process.env.NODE_ENV === "production",
} as const satisfies OptionsType;