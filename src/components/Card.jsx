import LazyLoad from "react-lazyload";
import pokeball from "../assets/Pokeball.png";
import { useEffect, useState } from "react";
import down from "../assets/icons8-arrow-down-48.png";
import up from "../assets/icons8-arrow-up-48.png";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const Card = ({img, name, types, abilities, height, weight, stats}) => {

  const [showInfo, setShowInfo] = useState(false);
  const[bgColor, setBgColor] = useState('#FFFFFF');

  useEffect(() => {
    switch(true){
      case types.includes('grass'):
        setBgColor('#5FBD58');
        break;
      case types.includes('fire'):
        setBgColor('#DC872F');
        break;
      case types.includes('water'):
        setBgColor('#539DDF');
        break;
      case types.includes('electric'):
        setBgColor('#F2D94E');
        break;
      case types.includes('fighting'):
        setBgColor('#D3425F');
        break;
      case types.includes('bug'):
        setBgColor('#92BC2C');
        break;
      case types.includes('flying'):
        setBgColor('#A1BBEC');
        break;
      case types.includes('poison'):
        setBgColor('#B763CF');
        break;
      case types.includes('ice'):
        setBgColor('#75D0C1');
        break;
      case types.includes('rock'):
        setBgColor('#A38C21');
        break;
      case types.includes('ground'):
        setBgColor('#DA7C4D');
        break;
      case types.includes('ghost'):
        setBgColor('#5F6DBC');
        break;
      case types.includes('steel'):
        setBgColor('#5695A3');
        break;
      case types.includes('psychic'):
        setBgColor('#ff2CA8');
        break;
      case types.includes('dark'):
        setBgColor('#595761');
        break;
      case types.includes('dragon'):
        setBgColor('#0C69C8');
        break;
      case types.includes('fairy'):
        setBgColor('#EE90E6');
        break;
      case types.includes('normal'):
        setBgColor('#A0A29F');
        break;
      default:
        setBgColor('#FFFFFF');
    }
    setShowInfo(false)
  }, [types, name]);

  let pokemonStats = [];
  for(let i = 0; i <= 5; i++){
    pokemonStats[i] = stats[i].base_stat;
  }

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Pokemon Stats",
      },
    }
  }

  let chartData = {
    labels: ["hp", "atk", "def", "sp-atk", "sp-def", "speed"],
    datasets: [
      {
        label: "stats",
        data: pokemonStats,
        backgroundColor: "red",
        borderColor: "black",
        borderWidth: 1,
      }
    ]
  }

  return (
    <div className="flex justify-center items-start">
        <div className={`flex flex-col justify-center items-center w-2/3 rounded-3xl m-2 border-2 border-white shadow-white  ${showInfo? 'translation-all shadow-lg': 'shadow-md'}`} style={{backgroundColor: bgColor}}>

            <LazyLoad offset={500} placeholder={<img alt="pokeball" className="w-36 -mt-24" src={pokeball}/>}>
              <img src={img} alt="pokemon" className={`w-48 -mt-24 lg:w-56 lg:-mt-32  2xl:w-72 2xl:-mt-36 ${showInfo? 'translation-all scale-110': null}`}/>
            </LazyLoad>

            {
              showInfo && <div className="bg-white w-5/6 md:w-11/12 font-Raleway h-full mx-5 p-3 flex flex-col gap-1 rounded-lg text-lg lg:text-xl">
                  <motion.p
                  initial = {{opacity: 0}}
                  animate = {{opacity: 1}}
                  transition={{delay: 0.2}}>
                    height : {height/10}m
                  </motion.p>
                  
                  <motion.p
                  initial = {{opacity: 0}}
                  animate = {{opacity: 1}}
                  transition={{delay: 0.4}}>
                    weight : {weight}kgs
                  </motion.p>

                  <motion.p
                  initial = {{opacity: 0}}
                  animate = {{opacity: 1}}
                  transition={{delay: 0.6}}>
                    Abilities : {abilities}
                  </motion.p>

                  <div className="h-64 lg:h-80">
                    <Bar options={chartOptions}  data={chartData} />
                  </div>

            </div>
            }

            <img alt="arrow" className="w-5 mt-2 bg-white rounded-full cursor-pointer" src = {showInfo? up: down} onClick={() => setShowInfo(!showInfo)}/>

            <p className="mt-2 text-3xl font-thin font-Pixelify">{name}</p>

            <p className="mb-6 font-Raleway">{types}</p>
            
        </div>
    </div>
  )
}

export default Card