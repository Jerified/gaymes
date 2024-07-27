'use client'

import { wordList } from '@/paragraph'
import React, { useCallback, useState } from 'react'
import SpringModal from '../Modal'


const TypingSpeed = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length)

    const maxTime = 60;
    const [paragraph, setParagraph] = useState(wordList[randomIndex])
    const [word, setWord] = useState('')
    const [charIndex, setCharIndex] = useState('')
    const [time, setTime] = useState(maxTime)
    const [mistake, setMistake] = useState(0)
    const [wpm, setWpm] = useState(0)
    const [cpm, setCpm] = useState(0)
    const [acc, setAcc] = useState(0)
    const [isOpen, setIsOpen] = useState(false);



    const callbackRef = useCallback((inputEl: any) => {
        if (inputEl) {
            document.addEventListener("keydown", () => inputEl.focus())
        }
    }, [])

    const handleInput = (e: any) => {
        const { value } = e.target
        setWord(value)
        setCharIndex(value.length)
        const { mistakes, cpm, wpm } = testCalculator(paragraph, value)
        setMistake(mistakes)
        setCpm(cpm)
        setWpm(wpm)
        console.log({ mistakes, cpm, wpm });
    }
    console.log(Number(charIndex))
    console.log(word)


    const testCalculator = (originalValue: string, typedValue: string) => {
        console.log({ originalValue: originalValue.split(''), typedValue: typedValue.split('') });
        const mistakes = typedValue.split('').reduce((acc, typedChar, index) => {
            return typedChar !== originalValue[index] ? acc + 1 : acc
        }, 0)

        const cpm = typedValue.length - mistakes
        const wpm = cpm / 5

        return { mistakes, cpm, wpm }
        console.log(mistakes)
    }

    return (
        <div>
            <div className="">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="font-semibold tracking-wider">TIMER</h1>
                    {
                        time > 0 ?
                            <>
                                <p className="text-gray-400/70 font-bold text-5xl pt-3">{time}</p>
                            </> : "  "
                    }

                </div>
                <input className='text-black outline-none border-none opacity-0' type='text' value={word} onChange={handleInput} autoFocus ref={callbackRef} />
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-gradient-to-r from-green-800 to-green-950 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity flex justify-center items-center mx-auto"
                >
                    Open Modal
                </button>
                <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} mistake={mistake} cpm={cpm} wpm={wpm} />


                <div className="pt-12">
                    {paragraph.split('').map((char: any, index: number) => {
                        return (
                            <span key={index} className={`px-[1px] text-white rounded-sm my-1 ml-[2px] font-medium
                    ${index === Number(charIndex) ? 'text-blue-600 border-b-2 border-solid border-blue-600 animate-pulse' : ''} ${word[index] === char ? 'text-green-700 bg-[#edf7e7' : (index < Number(charIndex) && 'text-red-600 bg-[#ffdcd9')}
                    `}>
                                {char}
                            </span>
                        )
                    })}
                </div>

                <p className="text-center pt-6 text-sm font-semibold select-none cursor-pointer"><span className="text-2xl text-yellow-400">&#x27F3;</span>  Start Over</p>
            </div>
        </div>
    )
}

export default TypingSpeed