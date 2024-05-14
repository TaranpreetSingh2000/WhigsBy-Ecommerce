import React from "react";

const CategoriesPage = () => {
  const categories = [
    { id: 1, name: "Men", image: "https://source.unsplash.com/featured/?men" },
    {
      id: 2,
      name: "Women",
      image: "https://source.unsplash.com/featured/?women",
    },
    {
      id: 3,
      name: "Kids",
      image: "https://source.unsplash.com/featured/?kids",
    },
    {
      id: 4,
      name: "Accessories",
      image: "https://source.unsplash.com/featured/?accessories",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Categories</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative overflow-hidden group rounded-lg shadow-md"
          >
            <img
              src={category.image}
              alt={category.name}
              className="object-cover w-full h-64 transition duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 invisible group-hover:visible">
              <p className="text-white text-lg font-semibold">
                {category.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
