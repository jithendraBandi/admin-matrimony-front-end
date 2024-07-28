import { useState, useEffect } from 'react';
import axios from 'axios';
import {Button, Input, Popover, Select, Table} from 'antd';
import { GET_ALL_PROFILES, GET_PROFILE_IMAGE } from '../utils/constants';
import CreateProfileModal from './CreateProfileModal';

import { Space } from 'antd';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import ProfileDetailsModal from './ProfileDetailsModal';


const Profile = () => {
    const [profileData, setProfileData] = useState([]);
    const [profileModal, setProfileModal] = useState(false);
    const [editProfileRecord, setEditProfileRecord] = useState(null);
    const [searchInput, setSearchInput] = useState("");
    const [profileDetails, setProfileDetails] = useState(null);
    const [profileDetailsModal, setProfileDetailsModal] = useState(false);
    const [searchParameter, setSearchParameter] = useState("lastName");
    useEffect(() => {
        getProfileData();
    }, []);
    const getProfileData = async () => {
        try {
            const response = await axios.get(GET_ALL_PROFILES);
            setProfileData(response?.data?.data);
            }
            catch (error) {}
        };

        const getImagePreview = (codeNo) => {
            console.log('GET_PROFILE_IMAGE+codeNo', GET_PROFILE_IMAGE+codeNo)
            return (
            
            <img src={GET_PROFILE_IMAGE+codeNo} height={100} width={100} alt="preview" />
        )};
    const profileColumns = [
        {
            title: 'Code No.',
            dataIndex: 'codeNo',
            key: 'codeNo',
            fixed: "left",
            sorter: (a, b) => a?.codeNo - b?.codeNo,
            render: (codeNo) => (
                <Popover content={() => getImagePreview(codeNo)}>
                    <p style={{cursor:"pointer"}}>{codeNo}</p>
                </Popover>
            )
        },
        {
            title: 'Surname',
            dataIndex: 'lastName',
            key: 'lastName',
            fixed: "left",
            sorter: (a, b) => a.lastName.localeCompare(b.lastName),
            render: (lastName, record) => <p style={{color:"#1677FF", cursor:"pointer"}} onClick={() => {
                setProfileDetailsModal(true);
                setProfileDetails(record);
            }}>{lastName}</p>,
        },
        {
            title: 'Name',
            dataIndex: 'firstName',
            key: 'firstName',
            fixed: "left",
            sorter: (a, b) => a.firstName.localeCompare(b.firstName),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            sorter: (a, b) => a.lastName.localeCompare(b.lastName),
            filters: [
                { text: 'Male', value: 'male' },
                { text: 'Female', value: 'female' },
              ],
              onFilter: (value, record) => record?.gender === value,
              render: (gender) => <p style={{textTransform:"capitalize"}}>{gender}</p>
        },
        {
            title: 'Birth Year',
            dataIndex: 'birthYear',
            key: 'birthYear',
            sorter: (a, b) => a?.birthYear - b?.birthYear,
            filters: [
                { text: '1950-1960', value: [1950,1960] },
                { text: '1960-1970', value: [1960,1970] },
                { text: '1970-1980', value: [1970,1980] },
                { text: '1980-1990', value: [1980,1990] },
                { text: '1990-2000', value: [1990,2000] },
                { text: '2000-2010', value: [2000,2010] },
                { text: '2010-2020', value: [2010,2020] },
                { text: '2020-2030', value: [2020,2030] },
              ],
              onFilter: (value, record) => parseInt(record?.birthYear) >value[0] && parseInt(record?.birthYear) <= value[1],
        },
        {
            title: 'Date of Birth',
            dataIndex: 'dob',
            key: 'dob',
        },
        {
            title: 'Qualification',
            dataIndex: 'qualification',
            key: 'qualification',
        },
        {
            title: 'Job',
            dataIndex: 'job',
            key: 'job',
        },
        {
            title: 'Job Address',
            dataIndex: 'jobAddress',
            key: 'jobAddress',
        },
        {
            title: 'Salary (in LPA)',
            dataIndex: 'salary',
            key: 'salary',
            sorter: (a, b) => a?.salary - b?.salary,
            filters: [
                { text: '<2 LPA', value: [0,2] },
                { text: '2-4 LPA', value: [2,4] },
                { text: '4-8 LPA', value: [4,8]},
                { text: '8-12 LPA', value: [8,12]},
                { text: '12-15 LPA', value: [12,15]},
                { text: '15-20 LPA', value: [15,20]},
                { text: '20-30 LPA', value: [20,30]},
                { text: '>30 LPA', value: [30,1000]},
              ],
              onFilter: (value, record) => parseInt(record?.salary) >value[0] && parseInt(record?.salary) <= value[1],
        },
        {
            title: 'Native Address',
            dataIndex: 'nativeAddress',
            key: 'nativeAddress',
        },
        {
            title: 'Mobile Number',
            dataIndex: 'mobileNumber',
            key: 'mobileNumber',
        },
        {
            title: 'Star',
            dataIndex: 'star',
            key: 'star',
        },
        {
            title: 'Property',
            dataIndex: 'property',
            key: 'property',
        },
        {
            title: 'Requirement',
            dataIndex: 'requirement',
            key: 'requirement',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditOutlined style={{color:"blue"}} onClick={() => editProfileModal(record)}/>
                </Space>
            ),
        },
    ];
    const editProfileModal = (record) => {
        setProfileModal(true);
        setEditProfileRecord(record);
    }
    const handleSearch = (event) => {
        setSearchInput(event.target.value);
        // setFilteredData(filteredData);
    }
    const filteredData = () => {
        return profileData.filter(profile => profile[searchParameter]?.toLowerCase().includes(searchInput?.toLowerCase()));
    }
    return (
            <><div>
                <Input allowClear style={{margin:"10px", width:"300px", border:"1px solid blue"}} placeholder='Search...' onChange={handleSearch} type="search" value={searchInput} />
                <Select value={searchParameter} onChange={value => setSearchParameter(value)} style={{width:200, marginRight:30}}>
                    <Select.Option value="lastName">Surname</Select.Option>
                    <Select.Option value="firstName">Name</Select.Option>
                    <Select.Option value="mobileNumber">Mobile Number</Select.Option>
                    <Select.Option value="birthYear">Birth Year</Select.Option>
                    <Select.Option value="qualification">Qualification</Select.Option>
                    <Select.Option value="dob">DOB</Select.Option>
                    <Select.Option value="job">Job</Select.Option>
                    <Select.Option value="jobAddress">Job Address</Select.Option>
                    <Select.Option value="nativeAddress">Native Address</Select.Option>
                    <Select.Option value="star">Star</Select.Option>
                </Select>
                <Button type='primary' onClick={() => setProfileModal(true)}><PlusOutlined /></Button>
            </div>
        <Table
            dataSource={filteredData()}
            columns={profileColumns}
            style={{margin: "10px"}}
            scroll={{ x: 2000 }}
            pagination={false}
            sticky
            />
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
    </>
    )
}

export default Profile;