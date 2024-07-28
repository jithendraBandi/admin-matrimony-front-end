import { Modal } from "antd"
import { useState } from "react";
import {EyeOutlined,EyeInvisibleOutlined} from '@ant-design/icons';
import { GET_PROFILE_IMAGE } from "../utils/constants";

const ProfileDetailsModal = ({
    setProfileDetailsModal,
    profileDetailsModal,
    profileDetails,
    setProfileDetails,
}) => {
    const [showMobileNumber, setShowMobileNumber] = useState(true);
    const handleCancel = () => {
        setProfileDetails(null);
        setProfileDetailsModal(false);
        setShowMobileNumber(false);
    }
  return (
    <Modal
    open={profileDetailsModal}
    onCancel={handleCancel}
    title={`${profileDetails?.codeNo}: ${profileDetails?.firstName} ${profileDetails?.lastName}`}
    // centered
    width={900}
    footer={null}
    >
        <div style={{display:"flex"}}>
            {/* <img style={{maxHeight:"350px", maxWidth:"350px"}} src={profileDetails?.imageUrl} alt="preview" /> */}
            <img style={{maxHeight:"350px", maxWidth:"350px"}} src={GET_PROFILE_IMAGE+profileDetails?.codeNo} alt="preview" />
            <div style={{marginLeft:"30px"}}>
                <p>Date of Birth : {profileDetails?.dob}</p>
                <p>Star: {profileDetails?.star}</p>
                <p>Qualification : {profileDetails?.qualification}</p>
                <p>Job : {profileDetails?.job}</p>
                <p>Salary : {profileDetails?.salary}</p>
                <p>Job Address : {profileDetails?.jobAddress}</p>
                <p>Native Address : {profileDetails?.nativeAddress}</p>
                <p>Mobile Number : {`${showMobileNumber ? profileDetails?.mobileNumber : "**********"}`}{showMobileNumber ? <EyeOutlined onClick={() => setShowMobileNumber(!showMobileNumber)} style={{marginLeft:"20px"}} /> : <EyeInvisibleOutlined style={{marginLeft:"20px"}} onClick={() => setShowMobileNumber(!showMobileNumber)}/>}</p>
                <p>Property : {profileDetails?.property}</p>
                <p>Requirement : {profileDetails?.requirement}</p>
            </div>
        </div>
    </Modal>
  )
}

export default ProfileDetailsModal