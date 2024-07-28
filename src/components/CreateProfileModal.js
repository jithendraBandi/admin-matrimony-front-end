import { Form, Modal, Row, Col, Select, notification, Button } from "antd"
import axios from 'axios';
import FloatInput from "../utils/FloatInput"
import FloatSelect from "../utils/FloatSelect";
import { CREATE_PROFILE } from "../utils/constants";
import { useEffect } from "react";

const CreateProfileModal = ({
    profileModal,
    setProfileModal,
    editProfileRecord,
    setEditProfileRecord,
    getProfileData
}) => {
    const [profileForm] = Form.useForm();
    useEffect(() => {
      console.log("first")
      if (editProfileRecord?.id) {
        profileForm.setFieldsValue({
          codeNo: editProfileRecord?.codeNo,
          dob: editProfileRecord?.dob,
          birthYear: editProfileRecord?.birthYear,
          firstName: editProfileRecord?.firstName,
          gender: editProfileRecord?.gender,
          job: editProfileRecord?.job,
          jobAddress: editProfileRecord?.jobAddress,
          lastName: editProfileRecord?.lastName,
          mobileNumber: editProfileRecord?.mobileNumber,
          nativeAddress: editProfileRecord?.nativeAddress,
          property: editProfileRecord?.property,
          qualification: editProfileRecord?.qualification,
          requirement: editProfileRecord?.requirement,
          salary: editProfileRecord?.salary,
          star: editProfileRecord?.star,
          imageUrl: editProfileRecord?.imageUrl,
        })
      }
    }, [editProfileRecord, profileForm]);

    const handleCancel = () => {
        setProfileModal(false);
        setEditProfileRecord(null);
        profileForm.resetFields();
    }

    const createOrEditProfile = async (values) => {
      try {
        let payload = {...values};
        if (values?.imageUrl) {
          const imageIdRegex = /\/d\/([^/]+)/;
          const finalUrl = values?.imageUrl.match(imageIdRegex)[1];
          payload = {...payload, imageUrl: "https://lh3.google.com/u/0/d/" + finalUrl};
        }
        if (editProfileRecord?.id) {
          payload = {
            ...payload, 
            id: editProfileRecord?.id,
          };
        }
        await axios.post(CREATE_PROFILE, payload);
        getProfileData();
        handleCancel();
        notification.success({
          message: 'Success',
          description: `Profile ${editProfileRecord?.id ? "updated" : "created"} successfully!`,
          placement: 'bottomRight'
      });
      }
      catch (error) {
        notification.error({
          message: 'Error',
          description: `Error occured while ${editProfileRecord?.id ? `updating code no:${editProfileRecord?.codeNo}` : "creating"} profile`,
          placement: 'bottomRight'
      });
      }
    }
    const preventScroll = (event) => event.preventDefault();

  return (
    <Modal
        open={profileModal}
        onCancel={handleCancel}
        title={editProfileRecord === null ? "Create Profile" : "Edit Profile"}
        centered
        width={700}
        footer={null}

    >
        <Form
            name="profileForm"
            form={profileForm}
            onFinish={createOrEditProfile}
        >
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={12}>
              <Form.Item
                name="codeNo"
              >
                <FloatInput
                  type="number"
                  label="Code No."
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                name="gender"
                rules={[
                  {required:true, message:"Gender is Required"}
                ]}
              >
                <FloatSelect
                  type="text"
                  label="Gender"
                >
                    <Select.Option key="male" value="male">Male</Select.Option>
                    <Select.Option key="female" value="female">Female</Select.Option>
                </FloatSelect>
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                name="firstName"
              >
                <FloatInput
                  type="text"
                  label="First Name"
                  required
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                name="lastName"
              >
                <FloatInput
                  type="text"
                  label="Last Name"
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                name="birthYear"
                rules={[
                  {max:4, message:"4 digits only"}
                ]}
              >
                <FloatInput
                  type="number"
                  label="Birth Year"
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                name="dob"
              >
                <FloatInput
                  type="text"
                  label="Date of Birth"
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                name="qualification"
              >
                <FloatInput
                  type="text"
                  label="Qualification"
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                name="job"
              >
                <FloatInput
                  type="text"
                  label="Job"
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                name="jobAddress"
              >
                <FloatInput
                  type="text"
                  label="Job Address"
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                name="salary"
              >
                <FloatInput
                  type="float"
                  label="Salary (in LPA)"
                  onScroll={preventScroll}
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                name="nativeAddress"
              >
                <FloatInput
                  type="text"
                  label="Native Address"
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                name="mobileNumber"
                rules={[
                  {len:10, message:"10 digits only"}
                ]}
              >
                <FloatInput
                  type="number"
                  label="Mobile Number"
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                name="star"
              >
                <FloatInput
                  type="text"
                  label="Star"
                />
              </Form.Item>
            </Col>
            {/* <Col className="gutter-row" span={12}>
              <Form.Item
                name="imageUrl"
                // initialValue="https://lh3.google.com/u/0/d/"
              >
                <FloatInput
                  type="text"
                  label="Image URL"
                />
              </Form.Item>
            </Col> */}
            <Col className="gutter-row" span={12}>
              <Form.Item
                name="property"
              >
                <FloatInput
                  type="text-area"
                  label="Property"
                />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={12}>
              <Form.Item
                name="requirement"
              >
                <FloatInput
                  type="text-area"
                  label="Requirement"
                />
              </Form.Item>
            </Col>
        </Row>
        <Row style={{display: "flex", justifyContent:"space-between", width:"25vw", marginLeft:"auto", marginRight:"auto"}}>
          <Button danger onClick={handleCancel}>Cancel</Button>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Row>
        </Form>
    </Modal>
  )
}

export default CreateProfileModal