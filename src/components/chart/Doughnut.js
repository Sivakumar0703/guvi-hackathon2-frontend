import React, { useEffect, useState , useContext } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { ProductContext } from '../context/Context';
import axios from 'axios';

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,

} from 'chart.js';



ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,

);


const Doughnutchart = () => {

  const [user, setUser] = useState();
  const {url , products} = useContext(ProductContext);
  const totalProducts = products && products.length;
  const totalUser = user && user.length;



  // furniture product count
  function furnitureCount() {
    let count = 0;
    products && products.map(i => i.type === 'furniture' ? count++ : '')
    return count
  }

  // electric product count
  function ElectricCount() {
    let count = 0;
    products && products.map(i => i.type === 'electric' ? count++ : '')
    return count
  }

  // electronics product count
  function ElectronicsCount() {

    let count = 0;
    products && products.map(i => i.type === 'electronics' ? count++ : '')
    return count
  }

  // studio product count
  function StudioCount() {
    let count = 0;
    products && products.map(i => i.type === 'Studio' ? count++ : '')
    return count
  }

  const furniture_percentage = Math.round((furnitureCount() / totalProducts) * 100);
  const electric_percentage = Math.round((ElectricCount() / totalProducts) * 100);
  const electronic_percentage = Math.round((ElectronicsCount() / totalProducts) * 100);
  const studio_percentage = Math.round((StudioCount() / totalProducts) * 100);




  const chartData = {
    labels: ["FURNITURES", "ELECTRICS", "ELECTRONICS", "STUDIO"],
    data: [furniture_percentage, electric_percentage, electronic_percentage, studio_percentage]
  };


  const data = {
    labels: chartData.labels,
    datasets: [{
      label: 'product %',
      data: chartData.data,
      backgroundColor: ['orangered', 'blue', 'green', 'brown'],
      borderColor: ['black', 'black', 'black', 'black']
    }]
  }


  const options = {

    hoverBorderWidth: 5,
    plugins: {
      legend: {
        display: true
      }
    }

  }

  useEffect(() => {

    axios.get(`${url}/users`).then(res => setUser(res.data.user))

  }, [])




  return (
    <div>
      <h2 className='m-2'>PRODUCTS DETAIL</h2>

      <div className='chart-container  m-2'>

        <Doughnut data={data} options={options} > </Doughnut>

        <div className='chart-detail mt-3'>
          <h5>FURNITURE <span>&nbsp;&nbsp; &nbsp;</span>  : <span style={{ color: "orangered" }} > {furnitureCount()} </span> </h5>
          <h5>ELECTRICS <span>&nbsp; &nbsp;&nbsp;  &nbsp;</span>  : <span style={{ color: "blue" }} > {ElectricCount()} </span> </h5>
          <h5>ELECTRONICS  <span>&nbsp;</span>: <span style={{ color: "green" }} > {ElectronicsCount()} </span> </h5>
          <h5>STUDIO  <span>&nbsp;&nbsp; &nbsp;&nbsp;  &nbsp;&nbsp; &nbsp;&nbsp;</span>: <span style={{ color: "brown" }} > {StudioCount()} </span> </h5>
        </div>

      </div>

      <h5 style={{ margin: "5px" }}>Total Number of Users : <span style={{ color: "red" }}> {totalUser} </span> </h5>

    </div>

  )
}



export default Doughnutchart