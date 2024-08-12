import { Button, Table, Popconfirm, Switch, message } from "antd";
import { DeleteOutlined, EditOutlined, LeftOutlined, LeftSquareOutlined } from "@ant-design/icons";
import { BannerTableType } from "../home/data";
import { useState } from "react";
import CreateBanner from "./CreateBanner";
import UpdateBanner from "./UpdateBanner";
import {
  useGetBannersQuery,
  useDeleteBannerMutation,
  useToggleVisibilityMutation,
} from "../../redux/api/bannerSlice";
import { NavLink } from "react-router-dom";

const DashboardHome = () => {
  const { data: banners } = useGetBannersQuery({ page: 1, limit: 10 });
  
  const [deleteBanner] = useDeleteBannerMutation();
  const [toggleVisibility, { error:toggleError, isError: isToggleError }] = useToggleVisibilityMutation();

  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [bannerToUpdate, setBannerToUpdate] = useState<BannerTableType>(
    {} as BannerTableType
  );

  const getTableData = () => {
    const tableData = banners?.data.map((card, index) => {
      return {
        ...card,
        id: `${index + 1}.`,
        key: `${card.id}`,
      };
    });

    return tableData;
  };

  async function confirmDelete(key: any) {
    console.log("Function not implemented.", key);
    try {
      const response = await deleteBanner(key);
      if ("error" in response) {
        const error = response.error as { data: { message: string } };
        void message.error(error?.data?.message);
        return;
      }
      void message.success(response?.data?.message);
    } catch (error) {
      void message.error("Something went wrong");
    }
  }

  async function handleSwitchChange(key: string) {
    try {
      const response = await toggleVisibility({ id: key });
      if(isToggleError){
        if("status" in toggleError){
          if(toggleError.status === "FETCH_ERROR"){
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
    } catch (error) {
      void message.error("Something went wrong");
    }
  }

  function handleBannerUpdate(key: any): void {
    console.log("Function not implemented.", key);
    setBannerToUpdate(key);
    setShowUpdateModal(true);
  }

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "id",
      key: "id",
      width: 80,
      fixed: "left" as const,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "About",
      dataIndex: "about",
      key: "about",
      width: 400,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 100,
      render: (image: string) => {
        return <img src={image} alt="" className="w-[70px] h-[70px] rounded" />;
      },
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      width: 100,
    },
    {
      title: "Timer",
      dataIndex: "timer",
      key: "timer",
      width: 100,
    },
    {
      title: "Visible",
      dataIndex: "visible",
      key: "visible",
      width: 100,
      render: (text: boolean, record: any) => (
        <Switch
          defaultChecked={text}
          onChange={() => handleSwitchChange(record.key)}
        />
      ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      width: 85,
      fixed: "right" as const,
      render: (_: string, banner: BannerTableType) => {
        return (
          <span>
            <span
              id="edit"
              style={{ marginRight: 10, cursor: "pointer" }}
              onClick={() => {
                handleBannerUpdate(banner);
              }}
            >
              <EditOutlined />
            </span>
            <Popconfirm
              title="Delete the banner?"
              description="Are you sure to delete this banner?"
              onConfirm={() => confirmDelete(banner.key)}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined />
            </Popconfirm>
          </span>
        );
      },
    },
  ];
  
  return (
    <>
      {showCreateModal && (
        <CreateBanner setShowCreateModal={setShowCreateModal} />
      )}
      {showUpdateModal && (
        <UpdateBanner
          setShowUpdateModal={setShowUpdateModal}
          bannerToUpdate={bannerToUpdate}
        />
      )}
      <div className="w-full h-[95vh] font-montserrat md:flex justify-between px-2">
        <NavLink to="/" className="w-fit block">
          <div>
            <h3 className="border shadow rounded-md mx-auto bg-[#f5f5f5]  shadow-red-400 px-3 py-2 mt-2 hover:text-red-400">
              <LeftOutlined />
            </h3>
          </div>
        </NavLink>
        <div className="w-4/5 border shadow-md rounded-md mx-auto bg-[#f5f5f5]  shadow-red-400 p-3 mt-2">
          <div className="w-full mx-auto flex justify-between gap-2">
            <h1 className="text-sm md:text-2xl text-red-400">Dashboard</h1>
            <div
              className="border shadow shadow-red-400 hover:text-red-400 rounded-md bg-[#f5f5f5] p-1 md:px-3 md:py-2 font-montserrat cursor-pointer flex items-center"
              onClick={() => setShowCreateModal(true)}
            >
              <h3 className="text-sm">Create Banner</h3>
            </div>
          </div>

          <div className="mt-4">
            <Table
              dataSource={getTableData()}
              columns={columns}
              scroll={{ x: "max-content", y: 'calc(100vh - 300px)' }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
