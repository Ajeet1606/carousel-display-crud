import { Modal, Switch, Button, message, Spin } from "antd";
import Input from "../common/Input";
import { useState } from "react";
import { CreateBannerType } from "../home/data";
import { useCreateBannerMutation } from "../../redux/api/bannerSlice";
import { LoadingOutlined } from "@ant-design/icons";

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

  const [createBanner, { isLoading }] = useCreateBannerMutation();
  const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const handleTextChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
    name: string
  ) => {
    if (name == "timer") {
      setInputForm({
        ...inputForm,
        [name]: parseInt(e.target.value, 10),
      });
      return;
    }
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

  async function handleSubmit() {
    try {
      const response = await createBanner(inputForm);
      if ("error" in response) {
        const error = response.error as { data: { message: string } };
        void message.error(error?.data?.message);
        return;
      }
      void message.success(response?.data?.message);
      setShowCreateModal(false);
    } catch (error) {
      void message.error("Something went wrong");
    }
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
          {
            isLoading ? <Spin indicator={loadingIcon} /> : "Create Banner"
          }
        </Button>
      </div>
    </Modal>
  );
};

export default CreateBanner;
