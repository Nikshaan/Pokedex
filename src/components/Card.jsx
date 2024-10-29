import LazyLoad from "react-lazyload";
import pokeball from "../assets/Pokeball.png";
import { useEffect, useState } from "react";
import down from "../assets/icons8-arrow-down-48.png";
import up from "../assets/icons8-arrow-up-48.png";
import { motion } from "framer-motion";

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

  return (
    <div className="flex justify-center items-start">
        <div className={`cursor-pointer flex flex-col justify-center items-center w-2/3 rounded-3xl m-2 border-2 border-white shadow-white  ${showInfo? 'translation-all shadow-lg': 'shadow-md'}`} style={{backgroundColor: bgColor}}>

            <LazyLoad offset={500} placeholder={<img className="w-36 -mt-24" src={pokeball}/>}>
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

                  <motion.p
                  initial = {{opacity: 0}}
                  animate = {{opacity: 1}}
                  transition={{delay: 0.8}}>
                    {`${stats[0].stat.name} : ${stats[0].base_stat}`}
                  </motion.p>

                  <motion.p
                  initial = {{opacity: 0}}
                  animate = {{opacity: 1}}
                  transition={{delay: 1}}>
                    {`${stats[1].stat.name} : ${stats[1].base_stat}`}
                  </motion.p>

                  <motion.p
                  initial = {{opacity: 0}}
                  animate = {{opacity: 1}}
                  transition={{delay: 1.2}}>
                    {`${stats[2].stat.name} : ${stats[2].base_stat}`}
                  </motion.p>

                  <motion.p
                  initial = {{opacity: 0}}
                  animate = {{opacity: 1}}
                  transition={{delay: 1.4}}>
                    {`${stats[3].stat.name} : ${stats[3].base_stat}`}
                  </motion.p>

                  <motion.p
                  initial = {{opacity: 0}}
                  animate = {{opacity: 1}}
                  transition={{delay: 1.6}}>
                    {`${stats[4].stat.name} : ${stats[4].base_stat}`}
                  </motion.p>

                  <motion.p
                  initial = {{opacity: 0}}
                  animate = {{opacity: 1}}
                  transition={{delay: 1.8}}>
                    {`${stats[5].stat.name} : ${stats[5].base_stat}`}
                  </motion.p>
            </div>
            }

            <img className="w-5 mt-2 bg-white rounded-full" src = {showInfo? up: down} onClick={() => setShowInfo(!showInfo)}/>

            <p className="mt-2 text-3xl font-thin font-Pixelify">{name}</p>

            <p className="mb-6 font-Raleway">{types}</p>
            
        </div>
    </div>
  )
}

export default Card