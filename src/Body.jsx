import { useEffect, useState } from "react";
import pokemon_logo from "./assets/Pokemon-Logo.png";
import Card from "./components/Card";
import { motion } from "framer-motion";
import up_arrow from "./assets/icons8-up-arrow-48.png";
import pokeballGIF from "./assets/pokeballGIF.gif";

const Body = () => {

    const [pokeShow, setPokeShow] = useState([]);
    const [pokeArr, setPokeArr] = useState([]);
    const [limit, setLimit] = useState(151);
    const [offset, setOffset] = useState(0);
    const [currGen, setCurrGen] = useState(1);
    const [currType, setCurrType] = useState("all");
    const [search, setSearch] = useState('');
    const [showArrow, setShowArrow] = useState(false);

    const fetchPokemon = async(limit, offset) => {
        const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        let res = await fetch(url);
        let data = await res.json();
        data.results.map(async(result) => {
            let pokemonRes =  await fetch(result.url);
            let pokemonData = await pokemonRes.json();
            let pokeImg = getImage(parseInt(pokemonData.id));
            
            const pokemon = {
                id: pokemonData.id,
                name: pokemonData.name,
                image: pokeImg,
                type: pokemonData.types.map((type) => type.type.name).join(', '),
                abilities: pokemonData.abilities.map((ability) => ability.ability.name).join(', '),
                height: pokemonData.height,
                weight: pokemonData.weight,
                stats: pokemonData.stats,
            };

            setPokeArr(pokeArr => [...pokeArr, pokemon]);
            setPokeShow(pokeArr => [...pokeArr, pokemon]);
            }
        );
    }

    const getImage = (id) => {
        const URL = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other';
        if (id >= 650 ) {
            return `${URL}/official-artwork/${id}.png`;
        }
        return `${URL}/dream-world/${id}.svg`;
    }

    const pokeSearch = () => {
        document.getElementById("typeSelect").value = 'all';
        let pokeCopy = pokeArr.slice();
        pokeCopy = pokeCopy.filter(pokemon => pokemon.name.includes(search.toLocaleLowerCase()));
        setPokeShow(pokeCopy);
    }
    
    const setType = (selectedType) => {
        setCurrType(selectedType);
        document.getElementById("searchbar").value = '';
        if(selectedType === 'all'){
            setPokeShow(pokeArr);
        }
        else{
            let pokeCopy = pokeArr.slice();
            pokeCopy = pokeCopy.filter(pokemon => pokemon.type.includes(selectedType));
            setPokeShow(pokeCopy);
        }
    }

    const compare = (a, b) =>  {
        if ( a.id < b.id ){
          return -1;
        }
        if ( a.id > b.id ){
          return 1;
        }
        return 0;
      }

    pokeShow.sort(compare)

    const pokeReset = (gen) => {
        if (gen != currGen){
        setPokeShow([]);
        setPokeArr([]);
        document.getElementById("typeSelect").value = 'all';
        document.getElementById("searchbar").value = '';
        setCurrGen(gen);
        }
        for(let i = 1; i<=8; i++){
            if( i == gen){
                document.getElementById(`button${i}`).style.backgroundColor = "#C2410C";
            }
            else{
                document.getElementById(`button${i}`).style.backgroundColor = "#FB923C";
            }
        }
    }

    const scrollFunc = () => {
        let y = window.scrollY;
        if(y>=1000){
            setShowArrow(true)
        }
        else{
            setShowArrow(false)
        }
    }

    window.addEventListener("scroll", scrollFunc);

    useEffect(() => {
           fetchPokemon(limit, offset);
    }, [limit]);

    useEffect(() => pokeSearch(), [search]);

  return (
    <div className="bg-red-700 relative">

        <div className="flex justify-center items-center p-2 pt-8">

            <motion.img
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{
                delay: 0.5,
              duration: 1,
            }}
            src={pokemon_logo} className="w-64" />
        </div>

        <div className="flex justify-around mt-6">

            <div className="flex flex-col">
                <motion.p
                initial = {{x : '-100vh'}}
                animate = {{x : 0}}
                transition = {{duration: 3, delay: 1, type :"spring"}}
                className="text-center text-white font-semibold font-Pixelify text-xl lg:text-2xl">SELECT GENERATION</motion.p>
                <div className="flex justify-center items-center border-2 border-white font-Pixelify text-white font-semibold text-lg rounded-md">
                    <button id = "button1" className="w-7 border-r-2 border-white bg-orange-700" onClick={() => {setLimit(151), setOffset(0), pokeReset(1)}}>1</button>
                    <button id = "button2" className="w-7 border-r-2 border-white bg-orange-400" onClick={() => {setLimit(100), setOffset(151), pokeReset(2)}}>2</button>
                    <button id = "button3" className="w-7 border-r-2 border-white bg-orange-400" onClick={() => {setLimit(135), setOffset(251), pokeReset(3)}}>3</button>
                    <button id = "button4" className="w-7 border-r-2 border-white bg-orange-400" onClick={() => {setLimit(108), setOffset(386), pokeReset(4)}}>4</button>
                    <button id = "button5" className="w-7 border-r-2 border-white bg-orange-400" onClick={() => {setLimit(155), setOffset(494), pokeReset(5)}}>5</button>
                    <button id = "button6" className="w-7 border-r-2 border-white bg-orange-400" onClick={() => {setLimit(72), setOffset(649), pokeReset(6)}}>6</button>
                    <button id = "button7" className="w-7 border-r-2 border-white bg-orange-400" onClick={() => {setLimit(88), setOffset(721), pokeReset(7)}}>7</button>
                    <button id = "button8" className="w-7 bg-orange-400" onClick={() => {setLimit(89), setOffset(809), pokeReset(8)}}>8</button>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center">
                <motion.p
                initial = {{x : '100vh'}}
                animate = {{x : 0}}
                transition = {{duration: 3, delay: 1,type :"spring"}}
                className="text-white font-semibold text-xl lg:text-2xl font-Pixelify">TYPE</motion.p>
                <div>
                    <select id="typeSelect" onChange={(e) => setType(e.target.value)} className="bg-orange-400 font-Pixelify text-white text-center font-semibold text-lg py-[2px] border-white border-2 rounded-md lg:px-2 cursor-pointer">
                        <option value="all">All types</option>
                        <option value="fire">Fire</option>
                        <option value="water">Water</option>
                        <option value="grass">Grass</option>
                        <option value="electric">Electric</option>
                        <option value="normal">Normal</option>
                        <option value="fighting">Fighting</option>
                        <option value="flying">Flying</option>
                        <option value="poison">Poison</option>
                        <option value="bug">Bug</option>
                        <option value="ice">Ice</option>
                        <option value="rock">Rock</option>
                        <option value="ground">Ground</option>
                        <option value="steel">Steel</option>
                        <option value="psychic">Psychic</option>
                        <option value="dark">Dark</option>
                        <option value="dragon">Dragon</option>
                        <option value="fairy">Fairy</option>
                        <option value="ghost">Ghost</option>
                    </select>
                </div>
            </div>

        </div>

        <div className="w-full flex justify-center items-center">
            <div className="flex justify-center items-center px-8  mt-5 w-full sm:w-5/6 xl:w-2/3">
                <input id="searchbar" placeholder="Search for a Pokemon: " onChange={(e) => setSearch(e.target.value)} type="text" className="h-8 lg:h-10 flex-grow font-Pixelify placeholder-white placeholder:text-center rounded-full border-2 border-white bg-orange-400 text-lg px-8 py-2 text-white text-center"></input>
            </div> 
        </div>

        <motion.div
        initial = {{opacity: 0}}
        animate = {{opacity: 1}}
        transition={{delay: 1.5, duration: 2}}
        className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-y-14 lg:gap-y-20 my-16 2xl:my-24">
            {
                (pokeShow.length != limit && search == "" && currType == "all")
                ?<div className="flex gap-2 w-full justify-center items-center absolute">
                <p className="text-white text-3xl sm:text-4xl font-Pixelify text-center">Loading</p>
                <img src={pokeballGIF} alt="loader" className="w-7 sm:w-9"/>
                </div>
                :pokeShow.map((pokemon, index) => (
                    <Card key = {index} img = {pokemon.image} name = {pokemon.name} types = {pokemon.type} abilities = {pokemon.abilities}
                     height = {pokemon.height} weight = {pokemon.weight} stats = {pokemon.stats} desc = {pokemon.des}/>
                )
            )
                }
        </motion.div>

        <div id="pageUp" className={`fixed z-50 bg-black border-2 border-white rounded-full  bottom-1 right-1 lg:bottom-3 lg:right-3 xl:bottom-5 xl:right-5 ${showArrow?'block':'hidden'}`}>
            <img className="cursor-pointer" alt="arrow" onClick={() => {window.scrollTo({top: 0, behavior: 'smooth'});}} src={up_arrow} />
        </div>
        
    </div>
  )
}

export default Body