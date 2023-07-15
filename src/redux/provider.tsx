"use client"
import { Provider } from "react-redux";
import { store } from "./store";
import type { AppProps } from 'next/app';

import React from 'react'

export const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}

