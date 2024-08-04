import { Modal } from "antd"
import { useState } from "react";
import {EyeOutlined,EyeInvisibleOutlined} from '@ant-design/icons';
import { GET_PROFILE_IMAGE } from "../utils/constants";
import DetailedProfile from "./DetailedProfile";

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
    // centered
    width={900}
    footer={null}
    >
        <DetailedProfile profileDetails={profileDetails} />
    </Modal>
  )
}

export default ProfileDetailsModal