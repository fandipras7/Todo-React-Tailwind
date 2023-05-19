import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/moleculs/Header";
import addIcon from "../../assets/images/tabler_plus.svg";
import backIcon from "../../assets/images/todo-back-button.svg";
import checkIcon from "../../assets/images/tabler_check.svg"
import closeIcon from "../../assets/images/modal-add-close-button.svg"
import deleteIcon from "../../assets/images/delete.svg"
import emptyState from "../../assets/images/todo-empty-state.svg";
import pencilIcon from "../../assets/images/todo-title-edit-button.svg";
import sortIcon from "../../assets/images/todo-sort-button.svg";
import downIcon from "../../assets/images/tabler_chevron-down.svg"
import lastIcon from "../../assets/images/terbaru.svg"
import oldestIcon from "../../assets/images/terlama.svg"
import azIcon from "../../assets/images/a-z.svg"
import zaIcon from "../../assets/images/z-a.svg"
import unfinishIcon from "../../assets/images/belum-selesai.svg"
import Button from "../../components/atoms/Button";
import Modal from "../../components/moleculs/Modal/Index";
import Card from "../../components/moleculs/Card/Index";
import { formatPriority } from "../../helpers/StringUtil";
import DeleteModal from "../../components/organism/DeleteModal";

interface DetailTodo {
  id?: number;
  title: string;
  activity_group_id?: string;
  is_active?: number;
  priority: string;
}

interface Todo {
  id: number;
  title: string;
  created_at: string;
  todo_items: DetailTodo[];
}


const DetailActivity = () => {
  const {id} = useParams();
  const [listTodo, setListTodo] = useState<DetailTodo[]>([])
  const [showModal, setShowModal] = useState<boolean>(false)
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
  const [priorityIsOpen, setPriorityIsOpen] = useState(false)
  const [sortIsOpen, setSortIsOpen] = useState(false)
  const [sortBy, setSortBy] = useState<string>("Terbaru")
  const [isEdit, setIsEdit] = useState(false)
  const [triggerOn, setTriggerOn] = useState<boolean>(false)
  const [title, setTitle] = useState<string>("")
  const [onEditTodo, setOnEditTodo] = useState<boolean>(false)
  const url = "https://todo.api.devcode.gethired.id";
  const defaultValue: DetailTodo = {
    title: "",
    activity_group_id: id,
    priority: "Very High"
  }
  const [form, setForm] = useState<DetailTodo>(defaultValue)
  const navigate = useNavigate()

  const priorityList = [
    {color: "bg-red-500", name: "Very High", dataName: "modal-add-priority-very-high"},
    {color: "bg-yellow-400", name: "High", dataName: "modal-add-priority-high"},
    {color: "bg-teal-500", name: "Medium", dataName: "modal-add-priority-medium"},
    {color: "bg-blue-500", name: "Low", dataName: "modal-add-priority-low"},
    {color: "bg-purple-800", name: "Very Low", dataName: "modal-add-priority-very-low"}
  ]

  const sortList = [
    {img: lastIcon, name: "Terbaru", dataName: "sort-latest"},
    {img: oldestIcon, name: "Terlama", dataName: "sort-oldest"},
    {img: azIcon, name: "A-Z", dataName: "sort-az"},
    {img: zaIcon, name: "Z-A", dataName: "sort-za"},
    {img: unfinishIcon, name: "Belum Selesai", dataName:"sort-unfinished"},
  ]

  const toggleModal = (item?: DetailTodo) => {
    setOnEditTodo(false)
    setShowModal(!showModal)
    if(item) setForm(item)
    
  }

  const toggleDeleteModal = (item?: DetailTodo) => {
    setShowDeleteModal(!showDeleteModal)
    if(item) return setForm(item)
    setForm(defaultValue)
  }

  const toggleEditModal = (item?: DetailTodo) => {
    setOnEditTodo(true)
    setShowModal(!showModal)
    console.log(item, 'cek');
    
    if(item) setForm(item)
  }

  const toggleDropdown = () => setPriorityIsOpen(!priorityIsOpen)

  const findIndexColor = (name: string): number => priorityList.findIndex((item)=> item.name === name)

  const goBack = () => navigate(-1)

  const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement
    setTitle(target.value)
  }

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
        ...form,
        [e.target.name]: e.target.value
    })
    
  }

  const onChexbox = async (e: ChangeEvent<HTMLInputElement>, todoId: any, priority: string) => {
    const payload = {
        is_active: e.target.checked ? 0 : 1,
        priority
    }

   await fetch(`${url}/todo-items/${todoId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", }, 
        body: JSON.stringify(payload),
    })

    setTriggerOn(!triggerOn)
    
  }

  const addListTodo = async () => {
    try {
        const payload: DetailTodo = {
            ...form,
            priority: formatPriority(form.priority, false)
        }
        
        await fetch(`${url}/todo-items`, {
            method: "POST",
            headers: { "Content-Type": "application/json", }, 
            body: JSON.stringify(payload),
        })
        setTriggerOn(!triggerOn)
        toggleModal(defaultValue)
    } catch (error) {
        console.log(error);
        
    }
  }

  const updateTodo = async () => {
    try {
        const payload: DetailTodo = {
            title: form.title,
            is_active: form.is_active,
            priority: form.priority
        }

        console.log(payload, 'cek payload');
        
        
        await fetch(`${url}/todo-items/${form.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", }, 
            body: JSON.stringify(payload),
        })
        setTriggerOn(!triggerOn)
        toggleModal(defaultValue)
    } catch (error) {
        console.log(error);
        
    }
  }

  const deleteItem = async (id: any) => {
    try {
        await fetch(`${url}/todo-items/${id}`, {method: "DELETE"})
        setTriggerOn(!triggerOn)
        toggleDeleteModal()
    } catch (error) {
        console.log(error);
        
    }
  }

  const onInputBlur = async () => {
    try {
        setIsEdit(false)
        await editTitle()
    } catch (error) {
        console.log(error);
        
    }
  }

  const selectPriority = (opt: string) => {
    setForm({
        ...form,
        priority: opt
    })
    
    setPriorityIsOpen(!priorityIsOpen)
  }

  const selectSortBy = (name: string)=> {
    console.log(listTodo, 'before');
    
    setSortBy(name)
    setSortIsOpen(false)
    let newList: DetailTodo[];
    switch (name) {
        case "Terbaru":
            newList = listTodo.sort((a, b) => (b.id || 0) - (a.id || 0))
            break;
        case "Terlama":
            newList = listTodo.sort((a, b) => (a.id || 0) - (b.id || 0))
            break;
        case "A-Z":
            newList = listTodo.sort((a, b) => (a.title?.localeCompare(b.title)) || 0);
            break;
        case "Z-A":
            newList = listTodo.sort((a, b) => (b.title?.localeCompare(a.title)) || 0);
            break;
        default:
            newList = listTodo.sort((a, b) => (b?.is_active === 1 ? 1 : 0) - (a?.is_active === 1 ? 1 : 0));;
            break;
    }
    setListTodo(newList)
    console.log(listTodo, 'after');
    
  }

  const editTitle = async () => {
    fetch(`${url}/activity-groups/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", }, 
        body: JSON.stringify({title}), 
    })
  }
  useEffect(() => {
    const getDetail = async () => {
      try {
        const response: any = await fetch(`${url}/activity-groups/${id}`);
        const responseData: Todo = await response.json();
        setTitle(responseData.title)
        setListTodo(responseData.todo_items)
        setSortBy("Terbaru")
        console.log(responseData.todo_items, 'cek');
      } catch (error) {
        console.log(error);
      }
    };

    getDetail();
  }, [triggerOn, id]);
  console.log(form, 'ini form');
  
  return (
    <div className="w-full h-screen">
      <Header />
      <div className="lg:px-220 px-7 h-full w-full pt-43 bg-gray-100">
        <div className="flex justify-between">
          <div className="flex">
            <div className="flex gap-6">
                <img onClick={goBack} className="cursor-pointer" data-cy="todo-back-button" src={backIcon} alt="backIcon" />
                {isEdit ? 
                    <input 
                        data-cy="todo-title" 
                        type="text" 
                        className="text-36 min-w-full leading-54 font-bold border-b border-black outline-none bg-gray-100" 
                        value={title}
                        onBlur={onInputBlur}
                        onChange={(e)=> onTitleChange(e)}
                    /> :
                    <span data-cy="todo-title" className="text-36 leading-54 font-bold">{title}</span>
                }
                
            </div>
            <img onClick={()=> setIsEdit(true)} className="cursor-pointer ml-6" data-cy="todo-title-edit-button" src={pencilIcon} alt="pencil" />
          </div>
          <div className="flex gap-18">
            <div className="cursor-pointer relative">
                <img src={sortIcon} alt="sort-icon" onClick={()=> setSortIsOpen(!sortIsOpen)} /> 
                {sortIsOpen &&
                    <ul className="w-235 absolute bg-white border border-solid border-gray-300 rounded-md shadow-md pt-3 mt-1">
                        {sortList.map((item, index)=> (
                            <li dta-cy={item.dataName} key={index} className="flex items-center justify-between w-full h-52 border-b border-b-gray-300 px-6" onClick={()=> selectSortBy(item.name)}>
                                <div className="flex items-center gap-5">
                                    <img src={item.img} alt={item.name} />
                                    <span className="text-16 left-6">{item.name}</span>
                                </div>
                                <div> {sortBy === item.name ? <img src={checkIcon} alt="downIcon" />: <div className="w-18 h-18"/> } </div>
                            </li>
                        ))}
                    </ul>
                }
            </div>
            <Button
              componentName="activity-add-button"
              className="w-159 h-54 rounded-45 bg-color-primary flex items-center justify-center gap-3"
              onClick={()=> toggleModal(defaultValue)}
            >
              <img src={addIcon} alt="add-icon" />
              <span className="text-lg leading-7 text-white font-bold">
                Tambah
              </span>
            </Button>
          </div>
        </div>
        {listTodo.length > 0 ?
            <div className="mt-24 flex flex-col gap-3">
                {listTodo?.map((item, index) => 
                    <Card 
                        className="shadow-md w-full rounded-lg bg-white h-20 flex px-7 items-center justify-between"
                        componentName={`todo-item-${index}`}
                        id={item.id}
                        key={item.id}
                    >
                        <div className="flex items-center">
                            <input onChange={(e)=> onChexbox(e, item.id, item.priority)} data-cy="todo-item-checkbox" type="checkbox" checked={item.is_active ? false : true} className="w-5 h-5"/>
                            <span className={`ml-5 inline-block w-14 h-14 rounded-full ${priorityList[findIndexColor(formatPriority(item.priority, true))].color}`} />
                            <p data-cy="todo-item-title" className={`text-18 leading-27 ml-4 font-bold ${item.is_active ? '' : 'line-through'}`}>{item.title}</p>
                            <img data-cy="todo-item-edit-button" className="ml-4" onClick={()=> toggleEditModal(item)} src={pencilIcon} alt="" />
                        </div>
                        <div className="cursor-pointer">
                            <img onClick={()=> toggleDeleteModal(item)} data-cy="todo-item-delete-button" src={deleteIcon} alt="deleteIcon" />
                        </div>
                    </Card>
                )}
            </div>
            :
            <div data-cy="todo-empty-state" className="mt-24 w-full flex justify-center" onClick={()=> toggleModal(defaultValue)} >
                <img src={emptyState} alt="todo-empty-state" />
            </div>
        }
      </div>

      <Modal
        show={showModal}
        wrapperClass="absolute lg:w-830 lg:min-h-403 bg-white shadow-md rounded-lg"
        children={{
            header: <div className="flex justify-between mt-6 px-7">
                        <p data-cy="modal-add-title" className="text-17 leading-7 font-bold">Tambah List Item</p>
                        <div className="cursor-pointer" data-cy="modal-add-close-button" onClick={()=> toggleModal()}>
                            <img src={closeIcon} alt="close-icon" />
                        </div>
                    </div>,
            content: <div className="mt-9 px-7 flex flex-col">
                        <label data-cy="modal-add-name-title" htmlFor="nama-list" className="text-12 leading-18 font-bold">NAMA LIST ITEM</label>
                        <div data-cy="modal-add-name-input" className="w-full">
                            <input
                                value={form.title}
                                name="title"
                                onChange={(e)=> onInputChange(e)} 
                                type="text" 
                                className="w-full border border-solid border-gray-300 pl-18 h-52 rounded-md mt-2" 
                                placeholder="Tambahkan nama list item" />
                        </div>
                        <label data-cy="modal-add-priority-title" htmlFor="priority" className="text-12 leading-18 font-bold mt-26">PRIORITY</label>
                        <div data-cy="modal-add-priority-dropdown" className="mt-2 relative">
                            <Button onClick={toggleDropdown} className="w-205 h-52 border border-solid border-gray-300 rounded-md">
                                {priorityIsOpen ? (
                                    <div className="flex justify-between px-4 bg-gray-200 h-full items-center">
                                        <p className="text-16 leading-6">Pilih priority</p>
                                        <div className="transition-transform">
                                            <img className="transform rotate-180" src={downIcon} alt="downIcon" />
                                        </div>
                                    </div>
                                ) : <div className="flex justify-between px-4 items-center">
                                        <div data-cy="modal-add-priority-item" className="flex gap-5 items-center">
                                            <span className={`inline-block w-14 h-14 rounded-full ${priorityList[findIndexColor(formatPriority(form.priority, true))].color}`} />
                                            <span className="text-16 leading-6 text-start min-w-71">{formatPriority(form.priority, true)}</span>
                                        </div>
                                        <div data-cy="modal-add-priority-dropdown" className="transition-transform">
                                            <img className="transform" src={downIcon} alt="downIcon" />
                                        </div>
                                    </div>
                                }
                            </Button>
                            {priorityIsOpen &&
                            <ul className="w-205 border border-solid border-gray-300 rounded-md bg-white absolute">
                                {priorityList.map((item, index)=> (
                                    <li data-cy={item.dataName} key={index} onClick={()=> selectPriority(item.name)} className="w-205 h-52 border border-solid border-gray-300 flex justify-between px-4 items-center">
                                        <span className={`inline-block w-14 h-14 rounded-full ${item.color}`} />
                                        <p className="text-16 leading-6 text-start min-w-71">{item.name}</p>
                                        <div>
                                            {form.priority === item.name ? 
                                                <img src={checkIcon} alt="downIcon" />:
                                                <div className="w-18 h-18"/>
                                            }
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            }
                        </div>
                    </div>,
            footer: <div className="h-full mt-6 mb-6 flex justify-end px-7">
                        <Button
                          onClick={()=>{ if(onEditTodo) return updateTodo(); addListTodo() }}
                          componentName="modal-add-save-button"
                          className={`w-150 h-54 rounded-45 bg-color-primary text-white ${form.title ? '' : 'bg-blue-100'}`}
                          disable={!form.title}
                        >
                            Simpan
                        </Button>
                    </div>
        }}
        onClick={toggleModal}
      />

      <DeleteModal
        itemName={form.title}
        messagge="Apakah anda yakin menghapus List item"
        toggleModal={toggleDeleteModal}
        deleteItem={()=> deleteItem(form.id)}
        show={showDeleteModal}/>
    </div>
  );
};

export default DetailActivity;
