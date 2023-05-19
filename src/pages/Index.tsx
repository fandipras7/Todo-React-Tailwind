import { useEffect, useState } from "react";
import Button from "../components/atoms/Button";
import Header from "../components/moleculs/Header";
import addIcon from "../assets/images/tabler_plus.svg";
import emptyState from "../assets/images/activity-empty-state.svg";
import Card from "../components/moleculs/Card/Index";
import deleteIcon from "../assets/images/delete.svg";
import { formatToLocalDate } from "../helpers/DateFormatter";
import { useNavigate } from "react-router-dom";
import DeleteModal from "../components/organism/DeleteModal";
import Alert from "../components/organism/Alert";

interface Data {
  id: string;
  title: string;
  created_at?: string;
}

interface ResponseData {
  total: number;
  limit: number;
  skip: number;
  data: Data[];
}

const Home = () => {
  const defaultActivity: Data = {
    title: "",
    id: "",
    created_at: "",
  }
  const navigate = useNavigate()
  const [listTodo, setListTodo] = useState<Data[]>([]);
  const [onUpdate, setonUpdate] = useState<boolean>(false);
  const [currentActivity, setCurrentActivity] = useState<Data>(defaultActivity)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [alert, setAlert] = useState<boolean>(false)
  const url = "https://todo.api.devcode.gethired.id";


  const toggleDeleteModal = (item?: Data)=> {
    setShowModal(!showModal)
    if(item) return setCurrentActivity(item)
    setCurrentActivity(defaultActivity)
  }

  const toggleAlert = () => setAlert(!alert)

  const addNewActivity = async () => {
    try {
      const newActivity = { title: "New Acitivity", email: "fandi@gmail.com" };
      await fetch(`${url}/activity-groups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newActivity),
      });
      setonUpdate(!onUpdate);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteActivity = async (id: string) => {
    try {
      await fetch(`${url}/activity-groups/${id}`, { method: "DELETE" });
      setonUpdate(!onUpdate);
      toggleDeleteModal()
      toggleAlert()
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getTodoList = async () => {
      try {
        const response = await fetch(
          `${url}/activity-groups?email=fandi@gmail.com`
        );
        const responseData: ResponseData = await response.json();
        setListTodo(responseData.data);
        console.log('cek jalan');
        
      } catch (error) {
        return [];
      }
    };
    getTodoList();
  }, [onUpdate]);

  console.log(listTodo);
  

  return (
    <div className="h-full">
      <Header />
      <div className="px-220 h-full w-full bg-gray-100 pt-43">
        <div className="flex justify-between">
          <h1 className="text-4xl leading-54 font-bold" data-cy="activity-title" >
            Activity
          </h1>
          <Button
            componentName="activity-add-button"
            className="w-159 h-54 rounded-45 bg-color-primary flex items-center justify-center gap-3"
            onClick={addNewActivity}
          >
            <img src={addIcon} alt="add-icon" />
            <span className="text-lg leading-7 text-white font-bold">
              Tambah
            </span>
          </Button>
        </div>
        <div data-cy="activity-empty-state" className={listTodo.length < 1 ? "mt-65" : "hidden"} >
          <img src={emptyState} alt="empty-state" />
        </div>
        <div className={ listTodo.length > 0 ? "grid gap-4 grid-cols-4 mt-14 h-604" : "hidden" } >
          {listTodo.map((item, index) => (
            <Card
              key={index}
              componentName={`activity-item-${index}`}
              className="shadow-md h-234 rounded-lg bg-white px-7 py-6 flex flex-col justify-between"
              id={index}
              onClick={()=> navigate(`/detail/${item.id}`)}
            >
              <p className="text-lg leading-7 font-bold" data-cy="activity-item-title" >
                {item.title}
              </p>
              <div className="flex justify-between">
                <span className="text-14 leading-21 text-secondary" data-cy="activity-item-date" >
                  {formatToLocalDate(item.created_at || '')}
                </span>
                <div className="cursor-pointer">
                  <img data-cy="activity-item-delete-button" onClick={(event) => { event.stopPropagation(); toggleDeleteModal(item); }} src={deleteIcon} alt="deleteIcon" />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <DeleteModal 
        show={showModal}
        messagge="Apakah anda yakin menghapus List Item"
        itemName={currentActivity.title}
        toggleModal={toggleDeleteModal}
        deleteItem={()=> deleteActivity(currentActivity.id)}
      />

      <Alert
        show={alert}
        toggle={toggleAlert}
      />
    </div>
  );
};

export default Home;
