import "../App.css";
import { Route, Routes, useParams, Link } from "react-router-dom";
import { useState } from "react";

function Fight({ pokedex }) {
  const { id } = useParams();
  const onePokemon = pokedex.find((pokemon) => pokemon.id === Number(id));

  const randomOpponent = pokedex[Math.floor(Math.random() * 809)];
  console.log(randomOpponent);
  console.log(onePokemon);

  const [opponent, setOpponent] = useState(pokedex[0]);

  const [winner, setWinner] = useState("");
  const [winnerID, setWinnerID] = useState();
  const [loser, setLoser] = useState("");
  const [loserID, setLoserID] = useState();

  const game = { winner, loser };

  const fight = () => {
    console.log("Winner: " + winner, "Loser: " + loser);

    setOpponent(randomOpponent);
    if (randomOpponent.base.Speed > onePokemon.base.Speed) {
      if (randomOpponent.base.Attack > onePokemon.base.HP) {
        setWinner(opponent.name.english);
        setWinnerID(opponent.id);
        setLoser(onePokemon.name.english);
        setLoserID(onePokemon.id);
        alert(`You lose against ${randomOpponent.name.english}!`);
      } else {
        setWinner(onePokemon.name.english);
        setWinnerID(onePokemon.id);
        setLoser(opponent.name.english);
        setLoserID(opponent.id);
        alert(`You win against ${randomOpponent.name.english}!`);
      }
    } else {
      if (randomOpponent.base.HP > onePokemon.base.Attack) {
        setWinner(opponent.name.english);
        setWinnerID(opponent.id);
        setLoser(onePokemon.name.english);
        setLoser(onePokemon.id);
        alert(`You lose against ${randomOpponent.name.english}!`);
      } else {
        setWinner(onePokemon.name.english);
        setWinnerID(onePokemon.id);
        setLoser(opponent.name.english);
        setLoserID(opponent.id);
        alert(`You win against ${randomOpponent.name.english}!`);
      }
    }

    fetch("https://pokemon-backend-2.onrender.com/game/save", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        winner: winner,
        winnerID: winnerID,
        loser: loser,
        loserID: loserID,
      }),
    });
  };

  return (
    <div className="Fight">
      <div id="fight">
        <div id="opp">
          <h2>A wild {randomOpponent?.name.english} appeared. </h2>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${randomOpponent?.id}.png`}
          />
        </div>

        <div id="mypokemon">
          <h2>Let's go, {onePokemon?.name.english}!</h2>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${onePokemon?.id}.png`}
          />
        </div>
      </div>
      <div id="fight-btn">
        <button onClick={() => setOpponent(randomOpponent)}>Run</button>

        <button onClick={() => fight()}>Fight</button>
      </div>
    </div>
  );
}

export default Fight;
