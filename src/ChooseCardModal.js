import { useEffect, useState } from "react";
import { Card } from "./Card";
import { checkAndRemoveOpposingCards } from "./CardGrid";
import { getCardValueFromCode } from "./Constants";

export const ChooseCardModal = ({aceColumn, gameState, setGameState, endTurn, setAcePlayed}) => {
    const [selection, setSelection] = useState('')

    const getChoices = () => {
        if (aceColumn !== false) {
            var output = [];
            for (let i = 0; i< 3; i++) {
                if (gameState.p2Cards[i][aceColumn].cardVal) {
                    output.push(
                        <Card key={`${i}`}
                              cardData={gameState.p2Cards[i][aceColumn]}
                              clickCondition={true}
                              potentialCard={gameState.p2Cards[i][aceColumn]}
                              setEditedCard={setSelection}
                              className={gameState.p2Cards[i][aceColumn].cardVal}/>
                );
            }
        }
        return output
        }
    }

    useEffect(() => {
        if (selection) {
            let newGameState = {...gameState}
            newGameState.p2Cards = checkAndRemoveOpposingCards(aceColumn, getCardValueFromCode(selection[0].cardVal).strVal, gameState)
            setGameState(newGameState)
            setAcePlayed(false)
            endTurn()
        }
    }, [selection])

    return (<>
        {aceColumn ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-6xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-indigo-blue outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex bg-gray-800 items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-3xl font-semibold">
                       Select A Card Value To Remove
                    </h3>
                  </div>
                  {/*body*/}
                  <div className="grid grid-cols-3 gap-12"> {aceColumn? getChoices() : <></>} </div>
                  {/*footer*/}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </>
    );
  }
