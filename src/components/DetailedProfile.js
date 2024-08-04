import { useState } from "react";
import {EyeOutlined, EyeInvisibleOutlined, EditOutlined, DeleteOutlined} from '@ant-design/icons';
import { GET_PROFILE_IMAGE } from "../utils/constants";
import { Space } from "antd";

const DetailedProfile = ({
    profileDetails,
    editProfileModal,
    deleteProfile,
}) => {
    const [showMobileNumber, setShowMobileNumber] = useState(false);
  return (
    <div style={{ display: "flex" }}>
      <img
        style={{ maxHeight: "350px", maxWidth: "350px" }}
        src={GET_PROFILE_IMAGE + profileDetails?.codeNo}
        alt="preview"
        className="profile-image"
      />
      <div className="profile-details-container" style={{ marginLeft: "40px" }}>
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <h4 style={{textTransform:"capitalize"}}>{`${profileDetails?.codeNo}: ${profileDetails?.firstName} ${profileDetails?.lastName}`}</h4>
            <Space size="middle">
                {editProfileModal && (
                    <EditOutlined
                        style={{ color: "blue" }}
                        onClick={() => editProfileModal(profileDetails)}
                    />
                )}
                {deleteProfile && (
                    <DeleteOutlined
                        style={{ color: "red" }}
                        onClick={() => deleteProfile(profileDetails)}
                    />
                )}
            </Space>
        </div>
        <p>Date of Birth : {profileDetails?.dob}</p>
        <p>Star: {profileDetails?.star}</p>
        <p>Qualification : {profileDetails?.qualification}</p>
        <p>Job : {profileDetails?.job}</p>
        <p>Salary : {profileDetails?.salary}</p>
        <p>Job Address : {profileDetails?.jobAddress}</p>
        <p>Native Address : {profileDetails?.nativeAddress}</p>
        <p>
          Mobile Number :{" "}
          {`${showMobileNumber ? profileDetails?.mobileNumber : "**********"}`}
          {showMobileNumber ? (
            <EyeOutlined
              onClick={() => setShowMobileNumber(!showMobileNumber)}
              style={{ marginLeft: "20px" }}
            />
          ) : (
            <EyeInvisibleOutlined
              style={{ marginLeft: "20px" }}
              onClick={() => setShowMobileNumber(!showMobileNumber)}
            />
          )}
        </p>
        <p>Property : {profileDetails?.property}</p>
        <p>Requirement : {profileDetails?.requirement}</p>
      </div>
    </div>
  );
};

export default DetailedProfile;
