import { useState } from "react";
import {EyeOutlined, EyeInvisibleOutlined, EditOutlined, DeleteOutlined, MobileOutlined, PhoneOutlined} from '@ant-design/icons';
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
        <p>Caste : {profileDetails?.caste}</p>
        <p>Job : {profileDetails?.job}</p>
        <p>Height : {profileDetails?.height}</p>
        <p>Salary : {profileDetails?.salary}</p>
        <p>Job Address : {profileDetails?.jobAddress}</p>
        <p>Native Address : {profileDetails?.nativeAddress}</p>
        <pre style={{fontSize: "15px",margin:"0px"}}>
        <PhoneOutlined /> :{" "}
          {`${showMobileNumber ? `${profileDetails?.mobileNumber}${"    "}${profileDetails?.alternateMobileNumber ? profileDetails?.alternateMobileNumber : ""}` : "**********"}`}
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
        </pre>
        <p>Property : {profileDetails?.property}</p>
        <p>Requirement : {profileDetails?.requirement}</p>
      </div>
    </div>
  );
};

export default DetailedProfile;
