import { Modal, Switch, Button, message, Spin } from "antd";
import Input from "../common/Input";
import { useState } from "react";
import { BannerTableType, CreateBannerType } from "../home/data";
import { useUpdateBannerMutation } from "../../redux/api/bannerSlice";
import { LoadingOutlined } from "@ant-design/icons";

interface props {
  setShowUpdateModal: React.Dispatch<React.SetStateAction<boolean>>;
  bannerToUpdate: BannerTableType
}

const UpdateBanner: React.FC<props> = ({
  setShowUpdateModal,
  bannerToUpdate,
}) => {
  const [inputForm, setInputForm] = useState<CreateBannerType>({
    name: bannerToUpdate.name,
    about: bannerToUpdate.about,
    image: bannerToUpdate.image,
    timer: bannerToUpdate.timer,
    visible: bannerToUpdate.visible,
    link: bannerToUpdate.link,
  });

  const [updateBanner, { isLoading, isError, error }] = useUpdateBannerMutation();
  const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;


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

  async function handleSubmit() {
    if(!inputForm.name || !inputForm.about || !inputForm.image || !inputForm.link || !inputForm.timer) {
      void message.error("All fields are required");
      return;
    }
    try {
      const response = await updateBanner({id: bannerToUpdate.key, data: inputForm});
       
      if(isError) {
        if("status" in error){
          if(error.status === "FETCH_ERROR"){
            void message.error("Too many requests. Please try again later");
            setShowUpdateModal(false);
            return;
          }
        }
      }
      
      if ("error" in response) {
        const error = response.error as { data: { message: string } };
        void message.error(error?.data?.message);
        return;
      }
      void message.success(response?.data?.message);
      setShowUpdateModal(false);
    } catch (error) {
      void message.error("Something went wrong");
    }
  }

  return (
    <Modal
      title="Update Banner"
      open
      onOk={() => {}}
      onCancel={() => setShowUpdateModal(false)}
      footer={null}
    >
      <div className="flex flex-col gap-3 font-montserrat">
        <Input
          label="Name"
          type="text"
          name="name"
          required="true"
          defaultValue={inputForm.name}
          placeholder="Enter Banner Name"
          onInputChange={handleTextChange}
        />
        <Input
          label="About"
          type="textarea"
          name="about"
          required="true"
          defaultValue={inputForm.about}
          placeholder="Enter Banner About"
          rows={4}
          onInputChange={handleTextChange}
        />
        <Input
          label="Timer"
          type="number"
          name="timer"
          required="true"
          defaultValue={inputForm.timer}
          placeholder="Enter Banner Timer"
          onInputChange={handleTextChange}
        />
        <Input
          label="Image"
          type="text"
          name="image"
          required="true"
          defaultValue={inputForm.image}
          placeholder="Enter Banner Image URL"
          onInputChange={handleTextChange}
        />
        <Input
          label="Link"
          type="text"
          name="link"
          required="true"
          defaultValue={inputForm.link}
          placeholder="Enter Banner Link"
          onInputChange={handleTextChange}
        />

        <div className="flex flex-col gap-1">
          <label htmlFor="switch">Visibility</label>
          <Switch
            className="w-3"
            defaultChecked={inputForm.visible}
            onChange={(checked) => handleSwitchChange(checked)}
          />
        </div>

        <div
          className="font-montserrat cursor-pointer h-9 flex items-center justify-center border shadow rounded shadow-red-400 hover:text-red-400"
          onClick={handleSubmit}
        >
          {isLoading ? (
            <Spin indicator={loadingIcon}/>
          ) : (
            <h3 className="text-center">Update Banner</h3>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default UpdateBanner;
