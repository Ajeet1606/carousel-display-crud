import { Modal, Switch, Button } from "antd";
import Input from "../common/Input";
import { useState } from "react";
import { CreateBannerType } from "../home/data";

interface props {
  setShowCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateBanner: React.FC<props> = ({ setShowCreateModal }) => {
    const [inputForm, setInputForm] = useState<CreateBannerType>({
        name: "",
        about: "",
        timer: 0,
        image: "",
        link: "",
        visible: true
    })
  const handleTextChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    name: string
  ) => {
    setInputForm({
      ...inputForm,
      [name]: e.target.value,
    });
  };

  function handleSwitchChange(checked: boolean): void {
    setInputForm({
      ...inputForm,
      visible: checked,
    });
  }

  function handleSubmit(): void {
    console.log(inputForm);
  }

  return (
    <Modal
      title="Create Banner"
      open
      onOk={() => {}}
      onCancel={() => setShowCreateModal(false)}
      footer={null}
    >
      <div className="flex flex-col gap-3 font-montserrat">
        <Input
          label="Name"
          type="text"
          name="name"
          required="true"
          placeholder="Enter Banner Name"
          onInputChange={handleTextChange}
        />
        <Input
          label="About"
          type="textarea"
          name="about"
          required="true"
          placeholder="Enter Banner About"
          onInputChange={handleTextChange}
        />
        <Input
          label="Timer"
          type="number"
          name="timer"
          required="true"
          placeholder="Enter Banner Timer"
          onInputChange={handleTextChange}
        />
        <Input
          label="Image"
          type="text"
          name="image"
          required="true"
          placeholder="Enter Banner Image URL"
          onInputChange={handleTextChange}
        />
        <Input
          label="Link"
          type="text"
          name="link"
          required="true"
          placeholder="Enter Banner Link"
          onInputChange={handleTextChange}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="switch">Visibility</label>
          <Switch
            className="w-3"
            onChange={(checked) => handleSwitchChange(checked)}
          />
        </div>

        <Button className="font-montserrat cursor-pointer h-9" type="primary" onClick={handleSubmit}>
          Create Banner
        </Button>
      </div>
    </Modal>
  );
};

export default CreateBanner;
