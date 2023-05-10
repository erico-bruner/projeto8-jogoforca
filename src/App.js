import Game from "./components/Game";
import Letters from "./components/Letters";

import palavras from "./palavras";

import "./styles/reset.css";
import "./styles/global.css";
import { useState } from "react";

export default function App() {
  let [palavra, setPalavra] = useState([]);
  let [palavraExibida, setPalavraExibida] = useState([]);
  let [jogoIniciado, setJogoIniciado] = useState(false);
  let [letrasPressionadas, setLetrasPressionadas] = useState([]);
  let [erros, setErros] = useState(0);
  let [acertos, setAcertos] = useState(0);
  let [status, setStatus] = useState("");

  function sorteiaPalavra() {
    palavras.sort(() => Math.random() - 0.5);
    let novaPalavra = palavras[0].split("");

    setPalavraExibida(
      novaPalavra.map(() => {
        return "_";
      })
    );

    console.log(novaPalavra);
    return novaPalavra;
  }

  function iniciarJogo() {
    setPalavra(sorteiaPalavra());
    setJogoIniciado(true);
  }

  function verificaLetra(letra) {
    setLetrasPressionadas([letra, ...letrasPressionadas]);
    verificaPalavra(letra);
  }

  function verificaPalavra(letra) {
    let novaPalavraExibida = [...palavraExibida];

    if (palavra.includes(letra)) {
      palavra.forEach((item, index) => {
        if (item === letra) {
          novaPalavraExibida[index] = letra;
          acertouPalavra();
        }
      });
    } else {
      errouPalavra();
    }

    setPalavraExibida(novaPalavraExibida);
  }

  function errouPalavra() {
    setErros(erros + 1);
    if (erros === 5) {
      fimDeJogo();
    }
  }

  function acertouPalavra() {
    if (acertos === palavra.length) {
      fimDeJogo();
    }

    setAcertos(acertos + 1);
  }

  function fimDeJogo() {
    setJogoIniciado(false);

    if (erros === 6) {
      setPalavraExibida(palavra);
      setStatus("perdeu");
    } else {
      setStatus("ganhou");
    }

    console.log("ENTROU NO FIM");
  }

  return (
    <>
      <Game
        iniciarJogo={iniciarJogo}
        palavra={palavra}
        jogoIniciado={jogoIniciado}
        palavraExibida={palavraExibida}
        erros={erros}
        status={status}
      />
      <Letters
        jogoIniciado={jogoIniciado}
        palavra={palavra}
        palavraExibida={palavraExibida}
        letrasPressionadas={letrasPressionadas}
        verificaLetra={verificaLetra}
      />
    </>
  );
}
