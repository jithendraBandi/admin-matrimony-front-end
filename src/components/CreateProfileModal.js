import {
  Form,
  Modal,
  Row,
  Col,
  Select,
  notification,
  Button,
  DatePicker,
} from "antd";
import axios from "axios";
import FloatInput from "../utils/FloatInput";
import FloatSelect from "../utils/FloatSelect";
import { CREATE_PROFILE } from "../utils/constants";
import { useEffect } from "react";
import dayjs from "dayjs";
import FormButtons from "../utils/FormButtons";
import { MobileOutlined } from "@ant-design/icons";

const CreateProfileModal = ({
  profileModal,
  setProfileModal,
  editProfileRecord,
  setEditProfileRecord,
  getProfileData,
}) => {
  const [profileForm] = Form.useForm();
  useEffect(() => {
    if (editProfileRecord?.id) {
      const datePickerFormat = dayjs(editProfileRecord?.dob, "DD-MM-YYYY");
      profileForm.setFieldsValue({
        codeNo: editProfileRecord?.codeNo,
        alternateMobileNumber: editProfileRecord?.alternateMobileNumber,
        dob: datePickerFormat,
        height: editProfileRecord?.height,
        caste: editProfileRecord?.caste,
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
      });
    }
  }, [editProfileRecord, profileForm]);

  const handleCancel = () => {
    setProfileModal(false);
    setEditProfileRecord(null);
    profileForm.resetFields();
  };

  const createOrEditProfile = async (values) => {
    try {
      const formatted = dayjs(values?.dob).format("DD-MM-YYYY");
      const birthYear = dayjs(values?.dob).format("YYYY");
      let payload = {
        ...values,
        dob: formatted,
        birthYear,
      };
      if (values?.imageUrl) {
        const imageIdRegex = /\/d\/([^/]+)/;
        const finalUrl = values?.imageUrl.match(imageIdRegex)[1];
        payload = {
          ...payload,
          imageUrl: "https://lh3.google.com/u/0/d/" + finalUrl,
        };
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
        message: "Success",
        description: `Profile ${
          editProfileRecord?.id ? "updated" : "created"
        } successfully!`,
        placement: "bottomRight",
      });
    } catch (error) {
      notification.error({
        message: "Error",
        description: `Error occured while ${
          editProfileRecord?.id
            ? `updating code no:${editProfileRecord?.codeNo}`
            : "creating"
        } profile`,
        placement: "bottomRight",
      });
    }
  };
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
            <Form.Item name="codeNo">
              <FloatInput type="text" label="Code No." />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item
              name="gender"
              rules={[{ required: true, message: "Gender is Required" }]}
            >
              <FloatSelect type="text" label="Gender">
                <Select.Option key="male" value="male">
                  Male
                </Select.Option>
                <Select.Option key="female" value="female">
                  Female
                </Select.Option>
              </FloatSelect>
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item name="lastName">
              <FloatInput type="text" label="Surname" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item name="firstName">
              <FloatInput type="text" label="Name" required />
            </Form.Item>
          </Col>
          {/* <Col className="gutter-row" span={12}>
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
            </Col> */}
          <Col className="gutter-row" span={12}>
            <Form.Item name="dob">
              <DatePicker />
              {/* <FloatInput
                  type="text"
                  label="Date of Birth"
                /> */}
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item name="qualification">
              <FloatInput type="text" label="Qualification" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item name="caste">
              <FloatInput type="text" label="Caste" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item name="job">
              <FloatInput type="text" label="Job" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item name="jobAddress">
              <FloatInput type="text" label="Job Address" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item name="salary">
              <FloatInput
                type="float"
                label="Salary (in LPA)"
                onScroll={preventScroll}
              />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item name="nativeAddress">
              <FloatInput type="text" label="Native Address" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item name="height">
              <FloatInput type="text" label="Height" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item
              name="mobileNumber"
              rules={[{ len: 10, message: "10 digits only" }]}
            >
              <FloatInput type="number" label="Mobile Number" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item
              name="alternateMobileNumber"
              rules={[{ len: 10, message: "10 digits only" }]}
            >
              <FloatInput type="number" label={<MobileOutlined />} />
            </Form.Item>
          </Col>

          <Col className="gutter-row" span={12}>
            <Form.Item name="star">
              <FloatSelect type="text" label="Star">
                <option value="">Choose...</option>
                <option value="Don't Know">Don't Know</option>
                <option value="Mesham-Aswini">Mesham-Aswini</option>
                <option value="Mesham-Bharani">Mesham-Bharani</option>
                <option value="Mehsam-Kruthika-1">Mehsam-Kruthika-1</option>
                <option value="Vrushabam-Kruthika-2,3,4">
                  Vrushabam-Kruthika-2,3,4
                </option>
                <option value="Vrushabam-Rohini">Vrushabam-Rohini</option>
                <option value="Vrushabam-Mrugasira-1,2">
                  Vrushabam-Mrugasira-1,2
                </option>
                <option value="Midhunam-Mrugasira-3,4">
                  Midhunam-Mrugasira-3,4
                </option>
                <option value="Midhunam-Arudra">Midhunam-Arudra</option>
                <option value="Midhuanam-Punarvasu-1,2,3">
                  Midhuanam-Punarvasu-1,2,3
                </option>
                <option value="Karkatakam-Punarvasu-4">
                  Karkatakam-Punarvasu-4
                </option>
                <option value="Karkatakam-Pushyami">Karkatakam-Pushyami</option>
                <option value="Karkatakam-Aslesa">Karkatakam-Aslesa</option>
                <option value="Simham-Maka">Simham-Maka</option>
                <option value="Simham-Pubba">Simham-Pubba</option>
                <option value="Simham-Uttara-1">Simham-Uttara-1</option>
                <option value="Kanya-Uttara-2,3,4">Kanya-Uttara-2,3,4</option>
                <option value="Kanya-Hasta">Kanya-Hasta</option>
                <option value="Kanya-Chitta-1,2">Kanya-Chitta-1,2</option>
                <option value="Tula-Chitta-3,4">Tula-Chitta-3,4</option>
                <option value="Tula-Swati">Tula-Swati</option>
                <option value="Tula-Visaka-1,2,3">Tula-Visaka-1,2,3</option>
                <option value="Vruchikam-Visaka-4">Vruchikam-Visaka-4</option>
                <option value="Vruchikam-Anuradha">Vruchikam-Anuradha</option>
                <option value="Vruchikam-Jyasta">Vruchikam-Jyasta</option>
                <option value="Dhanashu-Mula">Dhanashu-Mula</option>
                <option value="Dhanashu-Purvashada">Dhanashu-Purvashada</option>
                <option value="Dhanashu-Uttarashada-1">
                  Dhanashu-Uttarashada-1
                </option>
                <option value="Makaram-Uttarashada-2,3,4">
                  Makaram-Uttarashada-2,3,4
                </option>
                <option value="Makaram-Shravanam">Makaram-Shravanam</option>
                <option value="Makaram-Danista-1,2">Makaram-Danista-1,2</option>
                <option value="Kumbam-Dhanista-3,4">Kumbam-Dhanista-3,4</option>
                <option value="Kumbam-Shatabisham">Kumbam-Shatabisham</option>
                <option value="Kumbam-Purvabadhra-1,2,3">
                  Kumbam-Purvabadhra-1,2,3
                </option>
                <option value="Meenam-Purvabadhra-4">
                  Meenam-Purvabadhra-4
                </option>
                <option value="Meenam-Uttarabadhra">Meenam-Uttarabadhra</option>
                <option value="Meenam-Revathi">Meenam-Revathi</option>
              </FloatSelect>
              {/* <FloatInput
                  type="text"
                  label="Star"
                /> */}
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
            <Form.Item name="property">
              <FloatInput type="text-area" label="Property" />
            </Form.Item>
          </Col>
          <Col className="gutter-row" span={12}>
            <Form.Item name="requirement">
              <FloatInput type="text-area" label="Requirement" />
            </Form.Item>
          </Col>
        </Row>
        <FormButtons
          saveText="Submit"
          cancelText="Cancel"
          handleCancel={handleCancel}
        />
      </Form>
    </Modal>
  );
};

export default CreateProfileModal;
