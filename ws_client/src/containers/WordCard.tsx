/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import styled from '@emotion/styled';
import { FunctionComponent } from 'react';
import deleteIcon from '../assets/delete.png'
import modifyIcon from '../assets/modify.png'
import translatorIcon from '../assets/translator.png'
import soundIcon from '../assets/sound.png'
import axios from 'axios'
import { AxiosError } from 'axios'
import { Link } from 'react-router-dom';


const HeaderContainer = styled.div`
  border-bottom: 1px solid white;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`

const HeaderItems = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-between;
`

const Icon = styled.img`
  width: 2.5rem;
  margin: 1rem 0;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }
`

const WordCardDiv = styled.div`
  display: flex;
`

const DefinitionH3 = styled.h3`
  margin-left: 2rem;
`

type WordCartProps = {
  id: number,
  word: string,
  definition: string,
  example: string,
  user: object,
  modulo: boolean,
}


const WordCard: FunctionComponent<WordCartProps>= ({ id, word, definition, example, user, modulo }) => {

  const readTheWord = () => {
    const to_speak = new SpeechSynthesisUtterance(word)
    to_speak.lang = 'en-US'
    window.speechSynthesis.speak(to_speak)
  }

  const deleteWord = () => {
    const authRequest = axios.create({
      baseURL: 'http://localhost:8000',
      headers: {'Authorization': `Token ${localStorage.getItem('token')}`}
    });
    authRequest.delete(`/words/${id}`)
        .then(() => {
            window.location.reload()
        }, (error: AxiosError) => {
          console.log(error)
        })
  }
  const wordParams = { 
    id: id,
    word: word,
    definition: definition,
    example: example,
    user: user
  };
  const cardColor: string = modulo ? 'rgb(30, 30, 30)' : 'rgb(70, 70, 70)'

    return (
          <div
            css={css`
              background-color: ${cardColor};
              width: 70%;
              height: 15rem;
              border-radius: 1rem;
              margin: 2rem auto;
              padding: 1.5rem;
              color: white;
            `}
          >
             <HeaderContainer>
               <h2>{ word }</h2>
                <HeaderItems>
                    <Icon src={ soundIcon } alt="sound_icon" onClick={ readTheWord }/>
                    <a href={`https://translate.google.com/?hl=pl&tab=TT#view=home&op=translate&sl=en&tl=pl&text=${ word }`} target="_blank">
                        <Icon src={ translatorIcon } alt="translator_icon"/>
                    </a>
                    <Link to={ {pathname: '/modify', state: wordParams} }>
                      <Icon src={ modifyIcon } alt="modify_icon"/>
                    </Link>
                    <Icon src={ deleteIcon } alt="delete_icon" onClick={ deleteWord }/>
                </HeaderItems>

             </HeaderContainer>
             <WordCardDiv>
                <h3>Definition: </h3>
                <DefinitionH3>{ definition }</DefinitionH3>
             </WordCardDiv>
             <WordCardDiv>
                <h3>Example: </h3>
                <DefinitionH3>{ example }</DefinitionH3>
             </WordCardDiv>
             
         </div>         
    )
}

export default WordCard;