'use client';
import { useState, useEffect } from 'react';
import "../../app/globals.css";
import Sidebar from './Sidebar';
import AddItemForm from './AddItemForm';

const Admin = () => {
  // -----------------------
  // 所有条目列表
  // -----------------------
  const [items, setItems] = useState([]);

  // -----------------------
  // 当前编辑/新增条目数据
  // id 自动生成, 不允许用户修改
  // -----------------------
  const [itemData, setItemData] = useState({
    name: '',
    category: '',
    src: '',
    price: '',
    priceNum: '',
    serialNum: '',
    Typ: '',
    Hersteller: '',
    Bauform: '',
    Nennweite: '',
    Anschluss: '',
    Anschlussart: '',
    Bauart: '',
    KVWert: '',
    Schaltfunktion: '',
    Steuerung: '',
    Material: '',
    Dichtung: '',
    Spannung: '',
    Spannungstoleranz: '',
    Leistungsaufnahme: '',
    Einschaltdauer: '',
    Schutzart: '',
    Medium: '',
    TemperaturMedium: '',
    TemperaturUmgebung: '',
    MaximalerDruck: '',
    Einbaulage: ''
  });

  // -----------------------
  // 密码认证
  // -----------------------
  const [authPassword, setAuthPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // -----------------------
  // 当前操作 add/edit/delete
  // -----------------------
  const [action, setAction] = useState('add');
  const [editItemId, setEditItemId] = useState(null);

  const currentTable = 'products'; // 固定

  // -----------------------
  // 密码提交处理
  // -----------------------
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (authPassword === 'yojee8689') setIsAuthenticated(true);
    else alert('Incorrect password');
  };

  // -----------------------
  // 表单输入变化
  // -----------------------
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData(prev => ({ ...prev, [name]: value || '' }));
  };

  // -----------------------
  // 加载数据库条目
  // -----------------------
  useEffect(() => {
    fetch(`/api/${currentTable}`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(err => console.error(err));
  }, []);

  // -----------------------
  // CREATE - 添加条目
  // -----------------------
  const handleAddItem = async () => {
    const res = await fetch(`/api/${currentTable}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData),
    });
    const newItem = await res.json();
    setItems(prev => [...prev, newItem]);
    setItemData(Object.keys(itemData).reduce((a,k) => ({...a, [k]: ''}), {}));
    alert('Item added!');
  };

  // -----------------------
  // UPDATE - 编辑条目
  // -----------------------
  const handleEditItem = async (e) => {
    e.preventDefault();
    if (!editItemId) return;

    await fetch(`/api/${currentTable}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editItemId, ...itemData }),
    });

    setItems(prev => prev.map(i => i.id === editItemId ? { id: editItemId, ...itemData } : i));
    alert('Item updated!');
  };

  // -----------------------
  // DELETE - 删除条目
  // -----------------------
  const handleDeleteItem = async () => {
    if (!editItemId) return;

    await fetch(`/api/${currentTable}?id=${editItemId}`, { method: 'DELETE' });

    setItems(prev => prev.filter(i => i.id !== editItemId));
    setItemData(Object.keys(itemData).reduce((a,k)=>({ ...a, [k]: ''}), {}));
    alert('Item deleted!');
  };

  // -----------------------
  // 选择条目用于编辑或删除
  // -----------------------
  const handleSelectItem = (id) => {
    const item = items.find(i => i.id === id);
    if (!item) return;

    const cleanedItem = { ...item };
    delete cleanedItem.id; // id 不允许编辑
    setItemData(cleanedItem);
    setEditItemId(id);
  };

  return (
    <div className="flex flex-col items-center mt-20 mb-30">
      {!isAuthenticated ? (
        <form onSubmit={handlePasswordSubmit} className="h-[50vh] w-[30vw] p-6 bg-white shadow-md rounded-md">
          <label className="block text-sm font-medium text-gray-700">Enter Password</label>
          <input
            type="password"
            value={authPassword}
            onChange={(e) => setAuthPassword(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          />
          <button type="submit" className="w-full mt-4 bg-blue-500 text-white px-4 py-2 rounded-md">
            Submit
          </button>
        </form>
      ) : (
        <div className="h-screen w-full max-w-md">
          {/* 操作选择侧边栏 */}
          <Sidebar setAction={setAction} />

          {/* 添加条目 */}
          {action === 'add' && (
            <AddItemForm
              itemData={itemData}
              handleInputChange={handleInputChange}
              handleAddItem={handleAddItem}
            />
          )}

          {/* 编辑条目 */}
          {action === 'edit' && (
            <form className="space-y-4" onSubmit={handleEditItem}>
              <h2 className="text-lg font-semibold">Edit Item</h2>
              <select
                onChange={(e) => handleSelectItem(Number(e.target.value))}
                className="block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Item</option>
                {items.map((i) => (
                  <option key={i.id} value={i.id}>{i.name}</option>
                ))}
              </select>

              {Object.keys(itemData).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700">{key}</label>
                  <input
                    type="text"
                    name={key}
                    value={itemData[key] || ''} // 防止 null
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md"
                  />
                </div>
              ))}
              <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded-md">Update Item</button>
            </form>
          )}

          {/* 删除条目 */}
          {action === 'delete' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Delete Item</h2>
              <select
                onChange={(e) => handleSelectItem(Number(e.target.value))}
                className="block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Item</option>
                {items.map((i) => (
                  <option key={i.id} value={i.id}>{i.name}</option>
                ))}
              </select>
              <button
                onClick={handleDeleteItem}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                disabled={!editItemId}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Admin;
