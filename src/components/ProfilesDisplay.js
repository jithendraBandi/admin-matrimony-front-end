import DetailedProfile from "./DetailedProfile";
import "./components.css";

const ProfilesDisplay = ({ 
    profiles,
    editProfileModal,
    deleteProfile,
 }) => {
  return (
    <div className="detailed-profiles">
      {profiles?.map((profileDetails) => (
        <div className="detailed-profile">
            <DetailedProfile 
                profileDetails={profileDetails} 
                deleteProfile={deleteProfile} 
                editProfileModal={editProfileModal}
            />
        </div>
      ))}
    </div>
  );
};

export default ProfilesDisplay;
