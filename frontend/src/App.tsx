import React, { useEffect, useMemo, useState, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import BackgroundLayout from "./components/Shared/BackgroundLayout";
import Navbar from "./components/Shared/Navbar";
import Footer from "./components/Shared/Footer";
import CustomButton from "./components/Shared/CustomButton";
import ErrorModal from "./components/Shared/ErrorModal";
import LoadingScreen from "./components/Shared/LoadingScreen";
import AuthModal from "./components/Shared/AuthModal";
import { authEnabled, signOut, useSession } from "./lib/auth-client";
import api from "./services/api";

//Lazy Imports
const Landing = React.lazy(() => import("./components/Main/Landing"));
const Members = React.lazy(() => import("./components/Main/Members"));
const Events = React.lazy(() => import("./components/Main/Events"));
const Gallery = React.lazy(() => import("./components/Main/Gallery"));
const EditProfile = React.lazy(() => import("./components/Main/EditProfile"));
const AddGallery = React.lazy(() => import("./components/Main/AddGallery"));
const AddEvents = React.lazy(() => import("./components/Main/AddEvents"));
const AddProfile = React.lazy(() => import("./components/Main/AddProfile"));

function App() {
  const { data: session, isPending, refetch } = useSession();
  const [pageError, setPageError] = useState<string | null>(null);
  const [profileData, setProfileData] = useState<any>(undefined);
  const [profileLoading, setProfileLoading] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const user = session?.user || null;
  const permission = user?.role || null;

  useEffect(() => {
    let isMounted = true;

    const fetchProfile = async () => {
      if (!authEnabled || !user) {
        if (isMounted) {
          setProfileData(undefined);
        }
        return;
      }

      try {
        setProfileLoading(true);
        const response = await api.get("/members/me");
        if (isMounted) {
          setProfileData(response.data.data);
        }
      } catch (error) {
        if (error?.response?.status === 404) {
          if (isMounted) {
            setProfileData(null);
          }
          return;
        }

        if (isMounted) {
          setPageError(
            error?.response?.data?.message || "Unable to load your profile."
          );
        }
      } finally {
        if (isMounted) {
          setProfileLoading(false);
        }
      }
    };

    fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const showLoading = authEnabled
    ? isPending || Boolean(user && profileLoading)
    : false;

  const profileExists = useMemo(() => {
    if (profileData === undefined) {
      return undefined;
    }

    return profileData;
  }, [profileData]);

  const handleSignOut = async () => {
    try {
      await signOut();
      setProfileData(undefined);
      window.location.href = "/";
    } catch (error) {
      setPageError("Unable to sign out right now.");
    }
  };

  return (
    <div className="App overflow-x-hidden">
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Navbar
          user={!profileLoading && user}
          profileExists={!profileLoading ? profileExists : undefined}
          permission={permission}
          onClick={() => setAuthModalOpen(true)}
          onSignOut={handleSignOut}
        >
          <CustomButton
            onClick={() => setAuthModalOpen(true)}
            className="hidden md:block pr-3"
          >
            Member Login
          </CustomButton>
        </Navbar>
        <BackgroundLayout />
        {pageError && (
          <ErrorModal
            errorText={pageError}
            clicked={() => setPageError(null)}
          />
        )}
        <AuthModal
          open={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onError={(message) => setPageError(message)}
        />
        <Suspense fallback={<LoadingScreen />}>
          {showLoading && <LoadingScreen />}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/members" element={<Members />} />
            <Route path="/events" element={<Events />} />
            <Route path="/gallery" element={<Gallery />} />
            {user && profileExists === null && (
              <Route
                path="/add-profile"
                element={
                  <AddProfile
                    user={user}
                    onProfileSaved={async () => {
                      await refetch();
                      const response = await api.get("/members/me");
                      setProfileData(response.data.data);
                    }}
                  />
                }
              />
            )}
            {user && profileExists && (
              <Route
                path="/edit-profile"
                element={
                  <EditProfile
                    user={user}
                    profileData={profileExists}
                    onProfileSaved={async () => {
                      const response = await api.get("/members/me");
                      setProfileData(response.data.data);
                    }}
                  />
                }
              />
            )}
            {permission === "admin" && (
              <Route path="/add-gallery" element={<AddGallery user={user} />} />
            )}
            {permission === "admin" && (
              <Route path="/add-events" element={<AddEvents user={user} />} />
            )}
            <Route path="*" element={<Landing />} />
          </Routes>
        </Suspense>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
