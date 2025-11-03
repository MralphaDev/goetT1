'use client';
import { useState } from 'react';
import "../../app/globals.css";
import Sidebar from './Sidebar';
import AddItemForm from './AddItemForm';
import Dropdown from './Dropdown';

const Admin = () => {
  const [items, setItems] = useState([]);
  const [itemData, setItemData] = useState({
    name: '',
    category: '',
    src: '',
    price: '',
    serialNum: '',
  });
  const [authPassword, setAuthPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [action, setAction] = useState('add');
  const [editItemName, setEditItemName] = useState(null);
  const [scenario, setScenario] = useState('solenoid');
  const [currentTable, setCurrentTable] = useState('items');

  // mock table map
  const scenarioTableMap = {
    solenoid: 'items',
    'pressure-actuated': 'pressure-actuated',
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (authPassword === '') setIsAuthenticated(true);
    else alert('Incorrect password');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddItem = () => {
    setItems((prev) => [...prev, itemData]);
    setItemData({ name: '', category: '', src: '', price: '', serialNum: '' });
    alert('Item added!');
  };

  const handleEditItem = (e) => {
    e.preventDefault();
    if (!editItemName) return;
    setItems((prev) =>
      prev.map((item) =>
        item.name === editItemName ? { ...item, ...itemData } : item
      )
    );
    alert('Item updated!');
  };

  const handleDeleteItem = () => {
    setItems((prev) => prev.filter((item) => item.name !== editItemName));
    alert('Item deleted!');
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
          <Dropdown
            scenario={scenario}
            setScenario={setScenario}
            scenarioTableMap={scenarioTableMap}
            setCurrentTable={setCurrentTable}
          />
          <Sidebar setAction={setAction} />

          {action === 'add' && (
            <AddItemForm
              itemData={itemData}
              handleInputChange={handleInputChange}
              handleAddItem={handleAddItem}
            />
          )}

          {action === 'edit' && (
            <form className="space-y-4" onSubmit={handleEditItem}>
              <h2 className="text-lg font-semibold">Edit Item</h2>
              <select
                onChange={(e) => setEditItemName(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Item</option>
                {items.map((i) => (
                  <option key={i.name} value={i.name}>{i.name}</option>
                ))}
              </select>
              {Object.keys(itemData).map((key) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700">{key}</label>
                  <input
                    type="text"
                    name={key}
                    value={itemData[key]}
                    onChange={handleInputChange}
                    className="w-full border p-2 rounded-md"
                  />
                </div>
              ))}
              <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded-md">Update Item</button>
            </form>
          )}

          {action === 'delete' && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Delete Item</h2>
              <select
                onChange={(e) => setEditItemName(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Select Item</option>
                {items.map((i) => (
                  <option key={i.name} value={i.name}>{i.name}</option>
                ))}
              </select>
              <button
                onClick={handleDeleteItem}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                disabled={!editItemName}
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
