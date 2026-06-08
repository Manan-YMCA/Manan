import { useProfile } from "@/hooks/use-profile";
import { ProfileForm } from "@/components/profile/ProfileForm";

export function Profile() {
  const { data: profile, isLoading } = useProfile();

  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-12 pb-32 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Edit Profile</h1>
      {isLoading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : profile ? (
        <ProfileForm profile={profile} />
      ) : (
        <p className="text-muted-foreground">Failed to load profile.</p>
      )}
    </div>
  );
}

export default Profile;
