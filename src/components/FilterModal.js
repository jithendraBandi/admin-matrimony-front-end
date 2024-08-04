import { Form, Modal, Radio } from "antd";
import FormButtons from "../utils/FormButtons";

const FilterModal = ({ 
    filterModal, 
    setFilterModal,
    handleFilterValues,
 }) => {
  const [filterForm] = Form.useForm();
  const handleCancel = () => {
    setFilterModal(false);
  };
  const handleFilter = (values) => {
    handleFilterValues(values);
    handleCancel();
  };
  const handleReset = () => {
    filterForm.resetFields();
    handleFilter({});
  }
  return (
    <Modal
      open={filterModal}
      title="Filter Profiles"
      onCancel={handleCancel}
      centered
      width={500}
      footer={null}
    >
      <Form name="filterForm" form={filterForm} onFinish={handleFilter}>
        <Form.Item name="gender">
            <Radio.Group>
                <Radio value="male">Male</Radio>
                <Radio value="female">Female</Radio>
            </Radio.Group>
        </Form.Item>
        <Form.Item label="Sorting" name="sorting">
            <Radio.Group>
                <Radio value="salaryDesc">Salary Descending</Radio>
                <Radio value="salaryAsc">Salary Ascending</Radio><br/>
                <Radio value="birthYearDesc">Birth Year Descending</Radio>
                <Radio value="birthYearAsc">Birth Year Ascending</Radio>
            </Radio.Group>
        </Form.Item>
        <FormButtons
          saveText="Submit"
          cancelText="Cancel"
          handleReset={handleReset}
          handleCancel={handleCancel}
        />
      </Form>
    </Modal>
  );
};

export default FilterModal;
