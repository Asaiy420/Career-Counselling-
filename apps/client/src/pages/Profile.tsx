import { useState } from "react";
import ProfileForm from "../components/ProfileForm";
import ProfileProgress from "../components/ProfileProgress";
import { calculateCompletion } from "../utils/profileCompletion";
import type { Profile } from "../types/profile";
import "../styles/Profile.css";

const emptyProfile: Profile = {
  fullName: "",
  email: "",
  phone: "",
  university: "",
  degree: "",
  major: "",
  graduationYear: "",
  skills: "",
  careerGoal: "",
  preferredIndustry: "",
};

export default function Profile() {
  const [profile, setProfile] = useState<Profile>(emptyProfile);

  return (
    <div className="profile-container">

      <h1 className="page-title">
        Student Profile
      </h1>

      <p className="page-subtitle">
        Complete your profile to receive personalized career recommendations.
      </p>

      <ProfileForm onProfileChange={setProfile} />

      <ProfileProgress
        completion={calculateCompletion(profile)}
      />

    </div>
  );
}