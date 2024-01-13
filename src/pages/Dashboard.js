import React, { useCallback, useContext, useEffect, useState } from "react";
import Chart from "react-apexcharts";
import AuthContext from "../AuthContext";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Stock Sold',
        data: [],
        borderColor: 'rgba(255,206,86,0.2)',
        backgroundColor: [
          'rgba(232,99,132,1)',
          'rgba(232,211,6,1)',
          'rgba(54,162,235,1)',
          'rgba(255,159,64,1)',
          'rgba(153,102,255,1)',
          'rgba(34,197,24,1)',
        ],
        pointBackgroundColor: 'rgba(255,206,86,0.2)',
        borderWidth: 1,
      },
    ],
  });

  const [saleAmount, setSaleAmount] = useState("");
  const [purchaseAmount, setPurchaseAmount] = useState("");
  const [stores, setStores] = useState([]);
  const [products, setProducts] = useState([]);

  const [chart, setChart] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    },
    series: [
      {
        name: "series",
        data: [10, 20, 40, 50, 60, 20, 10, 35, 45, 70, 25, 70],
      },
    ],
  });



  // Update Chart Data
  const updateChartData = (salesData) => {
    setChart({
      ...chart,
      series: [
        {
          name: "Monthly Sales Amount",
          data: [...salesData],
        },
      ],
    });
  };

  const authContext = useContext(AuthContext);

  useEffect(() => {
    fetchTotalSaleAmount();
    fetchTotalPurchaseAmount();
    fetchStoresData();
    fetchProductsData();
    fetchMonthlySalesData();
  }, []);

  const [sales, setSalesData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/sales/get/${authContext.user}`);
        const data = await response.json();

        setSalesData(data);

        // Aggregate data by product name
        const aggregatedData = data.reduce((result, element) => {
          const productName = element.ProductID?.name;

          if (!result[productName]) {
            result[productName] = 0;
          }

          result[productName] += element.StockSold;

          return result;
        }, {});
        // Sort aggregated data by sales values
        const sortedData = Object.entries(aggregatedData)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 6);

        // Extract labels and finalData from sorted data
        const labelArray = sortedData.map(([productName]) => productName);
        const finalData = sortedData.map(([, stockSold]) => stockSold);


        setChartData((prevData) => ({
          ...prevData,
          labels: labelArray,
          datasets: [
            {
              ...prevData.datasets[0],
              data: finalData,
            },
          ],
        }));

        console.log("This is sold data", data);
        console.log("The final Data is:", labelArray);
        console.log("The final Data is:", finalData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function
    fetchData();
  }, [authContext.user]); // Include authContext.user in the dependency array to react to changes



  // Fetching total sales amount
  const fetchTotalSaleAmount = () => {
    fetch(
      `http://localhost:4000/api/sales/get/${authContext.user}/totalsaleamount`
    )
      .then((response) => response.json())
      .then((datas) => setSaleAmount(datas.totalSaleAmount));
  };

  // Fetching total purchase amount
  const fetchTotalPurchaseAmount = () => {
    fetch(
      `http://localhost:4000/api/purchase/get/${authContext.user}/totalpurchaseamount`
    )
      .then((response) => response.json())
      .then((datas) => setPurchaseAmount(datas.totalPurchaseAmount));
  };

  // Fetching all stores data
  const fetchStoresData = () => {
    fetch(`http://localhost:4000/api/store/get/${authContext.user}`)
      .then((response) => response.json())
      .then((datas) => setStores(datas));
  };

  // Fetching Data of All Products
  const fetchProductsData = () => {
    fetch(`http://localhost:4000/api/product/get/${authContext.user}`)
      .then((response) => response.json())
      .then((datas) => setProducts(datas))
      .catch((err) => console.log(err));
  };

  // Fetching Monthly Sales
  const fetchMonthlySalesData = () => {
    fetch(`http://localhost:4000/api/sales/getmonthly/${authContext.user}`)
      .then((response) => response.json())
      .then((datas) => {
        console.log("this is loda this is lassan " + datas);
        updateChartData(datas.salesAmount);
      })
      .catch((err) => console.log(err));
  };



  const percentageProfit = ((saleAmount - purchaseAmount) / purchaseAmount * 100).toFixed(2);

  return (
    <>
      <div className="grid grid-cols-1 col-span-12 lg:col-span-10 gap-6 md:grid-cols-3 lg:grid-cols-4  p-4 ">
        <article className="flex flex-col gap-4 rounded-lg border  border-gray-100 bg-white p-6  ">
          <div className={`inline-flex gap-2 self-end rounded p-1 
           ${percentageProfit > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>


            <span className="text-xs font-medium">{`${percentageProfit}%`}</span>
          </div>

          <div>
            <strong className="block text-2xl font-medium text-gray-500">
              Sales
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
                ₹{saleAmount}
              </span>

              <span className="text-xs text-gray-500"> from ₹{purchaseAmount} </span>
            </p>
          </div>
        </article>

        <article className="flex flex-col  gap-4 rounded-lg border border-gray-100 bg-white p-6 ">
          <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">


            <span className="text-xs font-medium">
            </span>
          </div>
          <div>
            <strong className="block text-2xl font-medium text-gray-500">
              Purchase
            </strong>
            <p>
              <span className="text-2xl font-medium text-gray-900">
                ₹{purchaseAmount}
              </span>
            </p>
          </div>
        </article>
        <article className="flex flex-col   gap-4 rounded-lg border border-gray-100 bg-white p-6 ">
          <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
          </div>

          <div>
            <strong className="block text-2xl font-medium text-gray-500">
              Total Products
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
                {" "}
                {products.length}{" "}
              </span>

              {/* <span className="text-xs text-gray-500"> from $404.32 </span> */}
            </p>
          </div>
        </article>
        <article className="flex flex-col   gap-4 rounded-lg border border-gray-100 bg-white p-6 ">
          <div className="inline-flex gap-2 self-end rounded bg-green-100 p-1 text-green-600">
          </div>

          <div>
            <strong className="block text-2xl font-medium text-gray-500">
              Total Stores
            </strong>

            <p>
              <span className="text-2xl font-medium text-gray-900">
                {" "}
                {stores.length}{" "}
              </span>

              {/* <span className="text-xs text-gray-500"> from 0 </span> */}
            </p>
          </div>
        </article>
        <div className="flex flex-col lg:flex-row justify-center bg-white rounded-lg py-8 col-span-full">
          <div className="mb-4 lg:mb-0 mx-auto">
            <Chart
              options={chart.options}
              series={chart.series}
              type="bar"
              width="500"
            />
          </div>
          <div className="mx-auto">
            <Doughnut data={chartData} />
          </div>
        </div>

      </div>
    </>
  );
}

export default Dashboard;
