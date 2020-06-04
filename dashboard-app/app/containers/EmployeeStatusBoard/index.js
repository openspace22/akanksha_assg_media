import React,{ useEffect,useState } from "react";
import {Bar} from 'react-chartjs-2';
import request from "../../utils/request";
import Header from "../../components/Header";
import "./style.scss";
const loadEmpData = async () => {
  const data = await request("http://localhost:3004/employee");
  return data;
}
function histogram(data, size, min) {
  let max = -Infinity;
  for (const emp of data) {
      if (emp.salary > max) {
        max = emp.salary
      };
  }
  const bins = Math.ceil((max - min +1) / size);//lower is inclusive [1-3]-1 is inclusive

  const total = new Array(bins).fill(0);
  const setAbove = new Array(bins).fill(0);
  const setBelowOrEq = new Array(bins).fill(0);
  let index = 0;
  for (const emp of data) {
      let item = emp.salary;
      const binNo = Math.floor((item - min) / size);
      if(Number(emp.age) > 30){
        setAbove[binNo]++;
      }else{
        setBelowOrEq[binNo]++;
      }
      total[binNo]++;
  }

  return {
      setAbove,
      setBelowOrEq,
      total
  };
}

export default function EmployeeStatusBoard(){
  const [dataValues,setDataValues] = useState(null);
  const [dataLabels,setDataLabels] = useState(null);
  useEffect(()=>{
    async function fetchData(){
      const data = await loadEmpData();
      const startWith = 1000000;
      const barSize = 100000;
      const {total,setAbove,setBelowOrEq} = histogram(data, barSize, startWith);
      setDataLabels(Array(total.length+1).fill(0).map((item,index)=>{
        return (startWith + index * barSize);
      }));
      setDataValues({
        total,
        setAbove,
        setBelowOrEq
      });
      console.log(total);
    }
    fetchData();
  },[]);

  if(!dataValues || !dataLabels){
    return null;
  }
  console.log(dataValues);
  const data = {
    labels: dataLabels,
    datasets: [
        {
          label: 'Age <= 30',
          data: [...dataValues.setBelowOrEq],
          backgroundColor: 'rgba(255,152,0,.6)'
        },
        {
          label: 'Age > 30',
          data: [...dataValues.setAbove],
          backgroundColor: 'rgba(244,67,54,.6)'
        }
    ]
  };
  const options =  {
    tooltips:{
      enabled: true,
      mode: 'label',
      callbacks: {
          title: function(tooltipItems){
            const currentIndex = tooltipItems[0].index;
            return (`${dataLabels[currentIndex]}-${dataLabels[currentIndex+1]}`);
          }
      }
    },
    scales: {
      xAxes: [
        {
          stacked: true,
          display: false,
          barPercentage: 1,
          ticks: {
              max: dataLabels[dataLabels.length -2],
          }
        }
     , {
        display: true,
        ticks: {
            autoSkip: false,
            max: dataLabels[dataLabels.length -1],
        }
      },
    ],
      yAxes: [{
        stacked: true,
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
      return (
        <div className="page-body emp-dashboard">
            <Header title="Dashboard"></Header>
            <div className="canvas-holder">
              <Bar
                data={data}
                options={options}
                width={100}
                height={50}
              />
            </div>
        </div>
        
      );
}