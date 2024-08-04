import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Modal, Popover, Radio, Select, Table } from "antd";
import { DELETE_PROFILE, DELETE_PROFILE_ENDPOINT, GET_ALL_PROFILES, GET_PROFILE_IMAGE } from "../utils/constants";
import CreateProfileModal from "./CreateProfileModal";

import { Space } from "antd";
import { EditOutlined, PlusOutlined, DeleteOutlined, FilterFilled } from "@ant-design/icons";
import ProfileDetailsModal from "./ProfileDetailsModal";
import "./components.css";
import ProfilesDisplay from "./ProfilesDisplay";
import FilterModal from "./FilterModal";

const Profile = () => {
  const [profileData, setProfileData] = useState([]);
  const [profileModal, setProfileModal] = useState(false);
  const [editProfileRecord, setEditProfileRecord] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [profileDetails, setProfileDetails] = useState(null);
  const [profileDetailsModal, setProfileDetailsModal] = useState(false);
  const [searchParameter, setSearchParameter] = useState("lastName");
  const [viewType, setViewType] = useState("profileView");
  const [filterModal, setFilterModal] = useState(false);
  const [filterValues, setFilterValues] = useState({});
  useEffect(() => {
    getProfileData();
  }, []);
  const getProfileData = async () => {
    try {
      const response = await axios.get(GET_ALL_PROFILES);
      setProfileData(response?.data?.data);
    } catch (error) {}
  };

  const getImagePreview = (codeNo) => {
    return (
      <img
        src={GET_PROFILE_IMAGE + codeNo}
        height={100}
        width={100}
        alt="preview"
      />
    );
  };
  const profileColumns = [
    {
      title: "Code No.",
      dataIndex: "codeNo",
      key: "codeNo",
      fixed: "left",
      sorter: (a, b) => a?.codeNo - b?.codeNo,
      render: (codeNo) => (
        <Popover content={() => getImagePreview(codeNo)}>
          <p style={{ cursor: "pointer" }}>{codeNo}</p>
        </Popover>
      ),
    },
    {
      title: "Surname",
      dataIndex: "lastName",
      key: "lastName",
      fixed: "left",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      render: (lastName, record) => (
        <p
          style={{ color: "#1677FF", cursor: "pointer" }}
          onClick={() => {
            setProfileDetailsModal(true);
            setProfileDetails(record);
          }}
        >
          {lastName}
        </p>
      ),
    },
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      fixed: "left",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      filters: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
      ],
      onFilter: (value, record) => record?.gender === value,
      render: (gender) => (
        <p style={{ textTransform: "capitalize" }}>{gender}</p>
      ),
    },
    {
      title: "Birth Year",
      dataIndex: "birthYear",
      key: "birthYear",
      sorter: (a, b) => a?.birthYear - b?.birthYear,
      filters: [
        { text: "1950-1960", value: [1950, 1960] },
        { text: "1960-1970", value: [1960, 1970] },
        { text: "1970-1980", value: [1970, 1980] },
        { text: "1980-1990", value: [1980, 1990] },
        { text: "1990-2000", value: [1990, 2000] },
        { text: "2000-2010", value: [2000, 2010] },
        { text: "2010-2020", value: [2010, 2020] },
        { text: "2020-2030", value: [2020, 2030] },
      ],
      onFilter: (value, record) =>
        parseInt(record?.birthYear) > value[0] &&
        parseInt(record?.birthYear) <= value[1],
    },
    {
      title: "Date of Birth",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Qualification",
      dataIndex: "qualification",
      key: "qualification",
    },
    {
      title: "Job",
      dataIndex: "job",
      key: "job",
    },
    {
      title: "Job Address",
      dataIndex: "jobAddress",
      key: "jobAddress",
    },
    {
      title: "Salary (in LPA)",
      dataIndex: "salary",
      key: "salary",
      sorter: (a, b) => a?.salary - b?.salary,
      filters: [
        { text: "<2 LPA", value: [0, 2] },
        { text: "2-4 LPA", value: [2, 4] },
        { text: "4-8 LPA", value: [4, 8] },
        { text: "8-12 LPA", value: [8, 12] },
        { text: "12-15 LPA", value: [12, 15] },
        { text: "15-20 LPA", value: [15, 20] },
        { text: "20-30 LPA", value: [20, 30] },
        { text: ">30 LPA", value: [30, 1000] },
      ],
      onFilter: (value, record) =>
        parseInt(record?.salary) > value[0] &&
        parseInt(record?.salary) <= value[1],
    },
    {
      title: "Native Address",
      dataIndex: "nativeAddress",
      key: "nativeAddress",
    },
    {
      title: "Mobile Number",
      dataIndex: "mobileNumber",
      key: "mobileNumber",
    },
    {
      title: "Star",
      dataIndex: "star",
      key: "star",
    },
    {
      title: "Property",
      dataIndex: "property",
      key: "property",
      width: 300,
    },
    {
      title: "Requirement",
      dataIndex: "requirement",
      key: "requirement",
      width: 300,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "blue" }}
            onClick={() => editProfileModal(record)}
          />
          <DeleteOutlined
            style={{ color: "red" }}
            onClick={() => deleteProfile(record)}
          />
        </Space>
      ),
    },
  ];
  const editProfileModal = (record) => {
    setProfileModal(true);
    setEditProfileRecord(record);
  };
  const deleteProfile = (record) => {
    Modal.confirm({
      title: `Are you sure you want to delete ${record?.lastName} ${record?.firstName} with code no: ${record?.codeNo}`,
      content: "This action cannot be undone.",
      okText: "Yes",
      cancelText: "No",
      onOk() {
        axios.delete(DELETE_PROFILE + record?.id + DELETE_PROFILE_ENDPOINT)
            .then(response => {
                getProfileData();
            })
            .catch(error => {});
      },
    });
  };
  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  };
  const filteredData = () => {
    let filteredData;

    // search filter
    filteredData = profileData.filter((profile) =>
      profile[searchParameter]
        ?.toLowerCase()
        .includes(searchInput?.toLowerCase())
    );

    // custom filter
    if (Object.values(filterValues)?.some(value => value !== undefined)) {
      if (filterValues?.gender) {
        filteredData = filteredData?.filter(profile => {
          return profile?.gender === filterValues?.gender
        })
      }
      if (filterValues?.sorting) {
        if (filterValues?.sorting === "salaryAsc") {
          filteredData = filteredData?.sort((a,b) => a?.salary - (b?.salary));
        }
        else if (filterValues?.sorting === "salaryDesc") {
          filteredData = filteredData?.sort((a,b) => b?.salary - (a?.salary));
        }
        else if (filterValues?.sorting === "birthYearDesc") {
          filteredData = filteredData?.sort((a,b) => b?.birthYear - (a?.birthYear));
        }
        else if (filterValues?.sorting === "birthYearAsc") {
          filteredData = filteredData?.sort((a,b) => a?.birthYear - (b?.birthYear));
        }
      }
    }
    return filteredData;
  };
  useEffect(() => {
    filteredData();
  }, [filterValues]);

  const handleViewType = (event) => {
    setViewType(event.target.value)
  }
  const handleFilter = () => {
    setFilterModal(true);
  }
  const handleFilterValues = values => setFilterValues(values);
  const filterStyling = () => {
    if (Object.values(filterValues)?.some(value => value !== undefined)) {
      return {
        color: "green",
      };
    }
    return {
      color: "red",
    };
  }
  return (
    <>
      <div className="header">
      <h3 style={{color:"green"}}>Vivaha Vedika</h3>
      <div>
        <Input
          allowClear
          style={{ margin: "10px", width: "300px", border: "1px solid blue" }}
          placeholder="Search..."
          onChange={handleSearch}
          type="search"
          value={searchInput}
        />
        <Select
          value={searchParameter}
          onChange={(value) => setSearchParameter(value)}
          style={{ width: 200, marginRight: 30 }}
        >
          <Select.Option value="lastName">Surname</Select.Option>
          <Select.Option value="firstName">Name</Select.Option>
          <Select.Option value="codeNo">Code No.</Select.Option>
          <Select.Option value="mobileNumber">Mobile Number</Select.Option>
          <Select.Option value="birthYear">Birth Year</Select.Option>
          <Select.Option value="qualification">Qualification</Select.Option>
          <Select.Option value="dob">DOB</Select.Option>
          <Select.Option value="job">Job</Select.Option>
          <Select.Option value="jobAddress">Job Address</Select.Option>
          <Select.Option value="nativeAddress">Native Address</Select.Option>
          <Select.Option value="star">Star</Select.Option>
        </Select>
        </div>
          <FilterFilled style={filterStyling()} onClick={handleFilter} />
        <Radio.Group onChange={handleViewType} value={viewType}>
        <Radio.Button value="profileView">Profile View</Radio.Button>
        <Radio.Button value="tableView">Table View</Radio.Button>
      </Radio.Group>
        <Button type="primary" onClick={() => setProfileModal(true)}>
          <PlusOutlined />
        </Button>
      </div>
      {viewType === "tableView" && <Table
        dataSource={filteredData()}
        columns={profileColumns}
        scroll={{ x: 2000 }}
        pagination={false}
        sticky
      /> }
      {viewType === "profileView" && <ProfilesDisplay deleteProfile={deleteProfile} editProfileModal={editProfileModal} profiles={filteredData()} />}
      <CreateProfileModal
        profileModal={profileModal}
        setProfileModal={setProfileModal}
        editProfileRecord={editProfileRecord}
        setEditProfileRecord={setEditProfileRecord}
        getProfileData={getProfileData}
      />
      <ProfileDetailsModal
        profileDetailsModal={profileDetailsModal}
        profileDetails={profileDetails}
        setProfileDetails={setProfileDetails}
        setProfileDetailsModal={setProfileDetailsModal}
      />
      <FilterModal 
      filterModal={filterModal} 
      setFilterModal={setFilterModal} 
      handleFilterValues={handleFilterValues}
      />
    </>
  );
};

export default Profile;
