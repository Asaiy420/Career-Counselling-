import { useState, useEffect } from "react";
import type { Profile } from "../types/profile";

interface ProfileFormProps {
  onProfileChange: (profile: Profile) => void;
}

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

export default function ProfileForm({
  onProfileChange,
}: ProfileFormProps) {
  const [profile, setProfile] = useState<Profile>(emptyProfile);

  useEffect(() => {
    const savedProfile = localStorage.getItem("studentProfile");

    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      onProfileChange(parsedProfile);
    }
  }, [onProfileChange]);

const handleChange = (
  e: React.ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >
) => {
    const updatedProfile = {
      ...profile,
      [e.target.name]: e.target.value,
    };

    setProfile(updatedProfile);
    onProfileChange(updatedProfile);
  };

  const handleSave = () => {

  if (!profile.fullName.trim()) {
    alert("Full Name is required.");
    return;
  }

  if (!profile.email.trim()) {
    alert("Email is required.");
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(profile.email)) {
    alert("Please enter a valid email.");
    return;
}
if (!/^\d{10}$/.test(profile.phone)) {
    alert("Phone number must contain exactly 10 digits.");
    return;
}
  if (!profile.university.trim()) {
    alert("University is required.");
    return;
  }

  if (!profile.degree.trim()) {
    alert("Degree is required.");
    return;
  }

  if (!profile.careerGoal.trim()) {
    alert("Career Goal is required.");
    return;
  }

  localStorage.setItem(
    "studentProfile",
    JSON.stringify(profile)
  );

  alert("Profile saved successfully!");
};

  return (
    <div>

      {/* Personal Information */}

      <div className="section">
        <h3>👤 Personal Information</h3>

        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </div>
      </div>

      {/* Educational Background */}

      <div className="section">
        <h3>🎓 Educational Background</h3>

        <div className="form-group">
          <label>University</label>
          <input
            type="text"
            name="university"
            value={profile.university}
            onChange={handleChange}
            placeholder="Enter your university"
          />
        </div>

        <div className="form-group">
          <label>Degree</label>
         <select
  name="degree"
  value={profile.degree}
  onChange={handleChange}
>
  <option value="">Select Degree</option>
  <option value="Bachelor's">Bachelor's</option>
  <option value="Master's">Master's</option>
  <option value="PhD">PhD</option>
  <option value="Diploma">Diploma</option>
</select>
        </div>

        <div className="form-group">
          <label>Major</label>
          <input
            type="text"
            name="major"
            value={profile.major}
            onChange={handleChange}
            placeholder="Enter your major"
          />
        </div>

        <div className="form-group">
          <label>Graduation Year</label>
          <input
            type="text"
            name="graduationYear"
            value={profile.graduationYear}
            onChange={handleChange}
            placeholder="e.g. 2028"
          />
        </div>
      </div>

      {/* Career Preferences */}

      <div className="section">
        <h3>💼 Career Preferences</h3>

        <div className="form-group">
          <label>Skills</label>
         <textarea
  name="skills"
  value={profile.skills}
  onChange={handleChange}
  placeholder="List your technical and soft skills..."
  rows={4}
/>
        </div>

        <div className="form-group">
          <label>Career Goal</label>
          <textarea
  name="careerGoal"
  value={profile.careerGoal}
  onChange={handleChange}
  placeholder="Describe your career goals..."
  rows={4}
/>
        </div>

        <div className="form-group">
          <label>Preferred Industry</label>
          <input
            type="text"
            name="preferredIndustry"
            value={profile.preferredIndustry}
            onChange={handleChange}
            placeholder="Information Technology"
          />
        </div>
      </div>

      <button
        className="save-btn"
        onClick={handleSave}
      >
        💾 Save Profile
      </button>

    </div>
  );
}