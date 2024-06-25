'use client';
import { SnackbarProvider } from 'notistack';
import React from 'react';
function ToustProvider({ children }) {
    return (<SnackbarProvider maxSnack={5}>
            {children}
        </SnackbarProvider>);
}
export default ToustProvider;
//# sourceMappingURL=ToustProvider.js.map