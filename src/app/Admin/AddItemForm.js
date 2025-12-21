import { useState } from "react";
import "../../app/globals.css";

export default function AddItemForm({ itemData, handleInputChange, handleAddItem }) {
  const [currentPage, setCurrentPage] = useState(0);
  const [preview, setPreview] = useState(itemData.src || null);
  const entriesPerPage = 5;

  const keys = Object.keys(itemData);
  const paginatedKeys = [];
  for (let i = 0; i < keys.length; i += entriesPerPage) {
    paginatedKeys.push(keys.slice(i, i + entriesPerPage));
  }
  const currentKeys = paginatedKeys[currentPage] || [];

  const handleNextPage = () => {
    if (currentPage < paginatedKeys.length - 1) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  // 上传图片
const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // 本地预览（立即显示选择的图片）
  const localUrl = URL.createObjectURL(file);
  setPreview(localUrl);
  handleInputChange({ target: { name: "src", value: localUrl } });

  try {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.error("Upload failed:", res.status);
      alert("上传失败，请检查控制台");
      return;
    }

    const data = await res.json();

    if (data.url) {
      setPreview(data.url);  // 替换为最终线上地址
      handleInputChange({ target: { name: "src", value: data.url } });
      console.log("上传成功:", data.url);
    } else {
      console.error("Upload failed:", data.error);
      alert("上传失败: " + (data.error || "未知错误"));
    }
  } catch (err) {
    console.error("Upload error:", err);
    alert("网络错误，请重试");
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New item:", itemData);
    handleAddItem?.();
  };

  return (
    <form className="space-y-6 w-[700px]" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold">Add Item</h2>

      {currentKeys.map((key) => (
        <div key={key}>
          <label className="block text-sm font-medium text-gray-700">{key}</label>
          {key === "src" ? (
            <>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mt-2 block w-full"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-3 w-32 h-32 object-cover rounded-lg border"
                />
              )}
            </>
          ) : (
            <input
              type="text"
              name={key}
              value={itemData[key]}
              onChange={handleInputChange}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              placeholder={`Enter ${key}`}
            />
          )}
        </div>
      ))}

      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handlePreviousPage}
          disabled={currentPage === 0}
          className="px-6 py-3 bg-gray-500 text-white rounded-md disabled:bg-gray-300"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={handleNextPage}
          disabled={currentPage === paginatedKeys.length - 1}
          className="px-6 py-3 bg-blue-500 text-white rounded-md disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      {currentPage === paginatedKeys.length - 1 && (
        <button
          type="submit"
          className="relative px-6 py-3 text-lg font-medium text-white bg-black border-2 border-transparent rounded-lg overflow-hidden group"
        >
          <span className="absolute inset-0 w-full h-full bg-black bg-opacity-80 z-10"></span>
          <span className="relative z-20">Add Item</span>
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 via-teal-400 to-pink-500 opacity-50 animate-pulse bg-cover z-0"></div>
          <div className="absolute inset-0 w-full h-full border-2 border-blue-500 z-0 animate-border-glow"></div>
        </button>
      )}
    </form>
  );
}
