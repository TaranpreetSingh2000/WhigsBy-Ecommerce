import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { getCustomerLoginId } from "../../../_utils/GlobalApi";

const Customers = () => {
  const [data, setData] = useState(new Set([]));
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCustomerLoginId()
      .then((res) => {
        const uniqyearrset = new Set();
        res.data.data.map((item) => {
          uniqyearrset.add(item.attributes.email, item.id);
        });
        setData(uniqyearrset);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex mx-auto justify-center my-auto">
        <ClipLoader color="#36d7b7" size={120} />
      </div>
    );
  }
  if (error) {
    return (
      <div className="container flex justify-center text-xl text-gray-600">
        <div className="flex flex-col items-center font-serif opacity-[0.9]">
          <p className="text-center">Oh, something went wrong!!</p>
          <p>
            We couldn't fetch the data due to some technical error. It happens,
            just try again after a couple of minutes.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full p-5">
      <div className="bg-white p-6 flex justify-between items-center mb-8">
        <div>
          <p className="mb-2 text-md font-medium text-gray-600">
            Total Customers purchased the products
          </p>
          <p className="text-lg font-semibold text-gray-700">{data.size}</p>
        </div>
      </div>
      <div className="w-full overflow-hidden rounded-lg shadow-md bg-white mb-8">
        <table className="w-full whitespace-nowrap">
          <thead>
            <tr className="text-left font-medium">
              <th className="px-6 pt-6 pb-4">Email</th>
            </tr>
          </thead>
          <tbody>
            {Array.from(data).map((user, index) => (
              <tr key={index}>
                <td className="px-6 py-4">{user}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
