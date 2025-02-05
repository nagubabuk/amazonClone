// src/env.d.ts

/// <reference types="react-scripts" />

declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test';
        readonly REACT_APP_API_URL: string;
        // Add other environment variables as needed
    }
}
