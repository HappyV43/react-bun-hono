/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AboutImport } from './routes/about'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'
import { Route as AuthenticatedProfileImport } from './routes/_authenticated/profile'
import { Route as AuthenticatedExpensesImport } from './routes/_authenticated/expenses'
import { Route as AuthenticatedCreateExpensesImport } from './routes/_authenticated/createExpenses'

// Create/Update Routes

const AboutRoute = AboutImport.update({
  path: '/about',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedProfileRoute = AuthenticatedProfileImport.update({
  path: '/profile',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedExpensesRoute = AuthenticatedExpensesImport.update({
  path: '/expenses',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedCreateExpensesRoute =
  AuthenticatedCreateExpensesImport.update({
    path: '/createExpenses',
    getParentRoute: () => AuthenticatedRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/about': {
      id: '/about'
      path: '/about'
      fullPath: '/about'
      preLoaderRoute: typeof AboutImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/createExpenses': {
      id: '/_authenticated/createExpenses'
      path: '/createExpenses'
      fullPath: '/createExpenses'
      preLoaderRoute: typeof AuthenticatedCreateExpensesImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/expenses': {
      id: '/_authenticated/expenses'
      path: '/expenses'
      fullPath: '/expenses'
      preLoaderRoute: typeof AuthenticatedExpensesImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/profile': {
      id: '/_authenticated/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AuthenticatedProfileImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/': {
      id: '/_authenticated/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof AuthenticatedImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  AuthenticatedRoute: AuthenticatedRoute.addChildren({
    AuthenticatedCreateExpensesRoute,
    AuthenticatedExpensesRoute,
    AuthenticatedProfileRoute,
    AuthenticatedIndexRoute,
  }),
  AboutRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated",
        "/about"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/createExpenses",
        "/_authenticated/expenses",
        "/_authenticated/profile",
        "/_authenticated/"
      ]
    },
    "/about": {
      "filePath": "about.tsx"
    },
    "/_authenticated/createExpenses": {
      "filePath": "_authenticated/createExpenses.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/expenses": {
      "filePath": "_authenticated/expenses.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/profile": {
      "filePath": "_authenticated/profile.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/": {
      "filePath": "_authenticated/index.tsx",
      "parent": "/_authenticated"
    }
  }
}
ROUTE_MANIFEST_END */
