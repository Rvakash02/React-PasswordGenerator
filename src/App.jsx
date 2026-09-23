import { useState, useCallback, useEffect, useRef } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllowed) str += "1234567890"
    if(charAllowed) str += "@#$"
    for (let idx = 1; idx <= length; idx++) {
      
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numAllowed, charAllowed, setPassword])

  const copyPassToClipboard = useCallback(()=>{
    passwordRef.current?.select();
    //passwordRef.current?.setSelectionRange(0,3) // now it will select only 3 character
    passwordRef.current?.setSelectionRange(0,21) // now it will select only 21 character
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(()=>{
      passwordGenerator()
   }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div >
        <h1 className="">Password Generator</h1>
      </div>
    <div className="w-full max-w-md mx-auto shadod-md rounded-lg px-4 my-8 text-black bg-gray-300  ">
      <div className='flex bg-white shadow rounded-lg overflow-hidden mb-4 mt-4'>
        <input type="text" 
            value={password}
            placeholder='password'
            className='outline-none w-full py-1 px-3'
            readOnly
            ref={passwordRef}
        />
        
        <button 
          onClick={copyPassToClipboard}
          className="bg-blue-500 p-2 m-2 rounded-lg text-white font-small hover:bg-blue-600 focus:outline-2 focus:outline-offset-2 focus:outline-blue-500 active:bg-blue-700 ...">
            copy
          </button>
      </div>

      <div className='flex text-sm gap-x-2 pb-2'>
        <div className='flex items-center gap-x-1'>
            <input 
            type="range" 
            min={6}
            max={20}
            value={length}
            className='cursor-pointer'
            onChange={ e => setLength(e.target.value)}
            />
            <label htmlFor="">Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          
            <input type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={()=>{
                setNumAllowed(prev => !prev);
              }}
          />
          <label htmlFor="">Numbers</label>
          
          
          
          <input type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={()=>{
                setCharAllowed(prev => !prev);
              }}
              />
          <label htmlFor="">Characters</label>
          
          
        </div>
      </div>
    </div>
    </>
  )
}

export default App
