/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from "react";

import { GoogleAuthProvider } from "firebase/auth";
import { CssBaseline, Select, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
/* eslint-disable @typescript-eslint/no-explicit-any */
import "typeface-rubik";
import "@fontsource/ibm-plex-mono";
import {
  buildCollection,
  CircularProgressCenter,
  createCMSDefaultTheme,
  FirebaseAuthController,
  FirebaseLoginView,
  FireCMS,
  FireCMSHomePage,
  ModeControllerProvider,
  NavigationRoutes,
  Scaffold,
  useInitializeAppCheck,
  SideDialogs,
  SnackbarProvider,
  useBuildModeController,
  useFirebaseAuthController,
  useFirebaseStorageSource,
  useFirestoreDataSource,
  useInitialiseFirebase,
  useValidateAuthenticator,
} from "firecms";

import { CollecionGroupProducsComentarios } from "./collections/collectionGroupsComents";
import { collectioStuff } from "./collections/stuff";
import { collectionGroupComentarios, productsCollection } from "./collections";
import ActionButtom from "./components/ActionButtom";
import { useInitializeAppCheckCustom } from "./hooks/useInitializeAppCheckCustom";
import { useInitialiseCustomFirebase } from "./hooks/useInitialiseCustomFirebase";
import { useCustomDatasource } from "./customDataSource/CustomDataSource";
import SelectDatabase from "./components/SelectDatabase";

const DEFAULT_SIGN_IN_OPTIONS = [GoogleAuthProvider.PROVIDER_ID];
const firebaseConfig = {
  apiKey: "AIzaSyCEIgV3d7k0PHDac5TF14qnVlhs4gVuL3o",
  authDomain: "firecms-e8f59.firebaseapp.com",
  projectId: "firecms-e8f59",
  storageBucket: "firecms-e8f59.appspot.com",
  messagingSenderId: "19098055688",
  appId: "1:19098055688:web:4314c4e1b282528c710dbd",
};

function CustomCMSApp() {
  const signInOptions = DEFAULT_SIGN_IN_OPTIONS;

  const {
    firebaseApp,
    firebaseConfigLoading,
    configError,
    firebaseConfigError,
  } = useInitialiseCustomFirebase({ firebaseConfig });

  const authController: FirebaseAuthController = useFirebaseAuthController({
    firebaseApp,
    signInOptions,
  });

  // const dataSource = useFirestoreDataSource({
  //   firebaseApp,

  //   // You can add your `FirestoreTextSearchController` here
  // });
  const dataSource = useCustomDatasource({
    firebaseApp,
    // databaseId: "(default)",
  });
  // const dataSourcePrueba = useCustomDatasource({
  //   firebaseApp,
  //   databaseId: "prueba",
  // });

  const catpcha = "dlasjdf";
  useInitializeAppCheckCustom({
    firebaseApp,
    options: {
      providerKey: catpcha,
      useEnterpriseRecaptcha: false,
      // providerKey: string;
      // useEnterpriseRecaptcha: boolean;
      // isTokenAutoRefreshEnabled?: boolean;
      isTokenAutoRefreshEnabled: true,
      // debugToken?: string;
      // forceRefresh?: boolean;
    },
  });

  const storageSource = useFirebaseStorageSource({ firebaseApp });

  const modeController = useBuildModeController();
  const theme = useMemo(
    () => createCMSDefaultTheme({ mode: modeController.mode }),
    []
  );
  const customViews = [
    {
      path: "mi_custom_view",
      name: "Mi customized",
      description:
        "This is an example of an additional view that is defined by the user",
      // This can be any React component
      view: <ActionButtom />,
    },
  ];
  const { authLoading, canAccessMainView, notAllowedError } =
    useValidateAuthenticator({
      authController,
      authentication: async ({ user }) => {
        console.log("Allowing access to", user?.email);
        try {
          return true;
        } catch (error) {
          throw new Error("Error al validar");
        }
      },
      dataSource,
      storageSource,
    });

  if (configError) {
    return <div> {configError} </div>;
  }

  if (firebaseConfigError) {
    return (
      <div>
        It seems like the provided Firebase config is not correct. If you are
        using the credentials provided automatically by Firebase Hosting, make
        sure you link your Firebase app to Firebase Hosting.
      </div>
    );
  }

  if (firebaseConfigLoading || !firebaseApp) {
    return <CircularProgressCenter />;
  }
  const products = [
    productsCollection,
    CollecionGroupProducsComentarios,
    collectionGroupComentarios,
  ];
  const admin =
    authController.user?.email === "ivanandasj"
      ? [collectioStuff]
      : [collectioStuff];
  console.log("authController.user?.email ", authController.user?.email);
  return (
    <Router>
      <SnackbarProvider>
        <ModeControllerProvider value={modeController}>
          <FireCMS
            authController={authController}
            collections={[...products, ...admin]}
            dataSource={dataSource}
            views={customViews}
            storageSource={storageSource}
            // basePath={"/collection"}
            entityLinkBuilder={({ entity }) =>
              `https://console.firebase.google.com/project/${firebaseApp.options.projectId}/firestore/data/${entity.path}/${entity.id}`
            }
          >
            {({ context, loading }) => {
              let component;
              if (loading) {
                component = <CircularProgressCenter />;
              } else if (!canAccessMainView) {
                component = (
                  <FirebaseLoginView
                    allowSkipLogin={false}
                    disableSignupScreen={true}
                    signInOptions={signInOptions}
                    firebaseApp={firebaseApp}
                    authController={authController}
                  />
                );
              } else {
                component = (
                  <Scaffold
                    name={"Mi tienda"}
                    toolbarExtraWidget={
                      <div>
                        <SelectDatabase />
                      </div>
                    }
                  >
                    <NavigationRoutes
                      HomePage={() => {
                        return (
                          <div>
                            <FireCMSHomePage />
                          </div>
                        );
                      }}
                    />
                    <SideDialogs />
                  </Scaffold>
                );
              }

              return (
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  {component}
                </ThemeProvider>
              );
            }}
          </FireCMS>
        </ModeControllerProvider>
      </SnackbarProvider>
    </Router>
  );
}

export default CustomCMSApp;
